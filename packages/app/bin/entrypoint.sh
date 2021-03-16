#!/usr/bin/env sh

function disco() {
  redis-cli -h discovery --raw $*
}

function run() {
  cd /usr/src/app
  node server.js
}

TIME=2
CTR_ADDR_PATH=/contracts/build/contractAddresses.json

while [ "$(disco ping)" != "PONG" ]
do
  echo "discovery redis not up, waiting..." && sleep 1;
done

set -ex

PARITY_INSTANCES=$ETHEREUM_NODE

sleep 5

for PARITY in $PARITY_INSTANCES; do
  ENODE_REQ=$(curl --data '{"method":"parity_enode","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST "$PARITY:8545")
  ENODE=$(echo "$ENODE_REQ" | grep -o "enode.*30303" | sed -e "s/\@.*/\@$PARITY:30303\"/" | sed -e "s/\"//g")
  disco set "enodes:$PARITY" "$ENODE"
done

sleep $TIME

# All nodes will attempt to acquire a lock. The last node to acquire
# the lock is elected as leader
disco set "cluster-leader" "$HOSTNAME"

if [ -z "$CONTRACT_ADDRESSES" ]; then
  sleep 1 # TODO: tune or remove

  LEADER=$(disco get cluster-leader)
  export CONTRACT_ADDRESSES=$(disco get contract-addresses)

  echo "CONTRACT_ADDRESSES_EXIST: $CONTRACT_ADDRESSES"

  # Only re-deploy if no contract address exists, otherwise the address will already be available in consul
  if [ -z "$CONTRACT_ADDRESSES" ]; then

    if [ "$HOSTNAME" = $LEADER ]; then
      echo "PROVIDER: $PROVIDER"
      mkdir -p /contracts/build/contracts
      npx truffle migrate --network docker_development
      CONTRACT_ADDRESSES=$(cat $CTR_ADDR_PATH)

      sleep $TIME
      disco set "contract-addresses" "$CONTRACT_ADDRESSES"
    else
      while [ -z "$ADDR_EXISTS" ]; do
          ADDR_EXISTS=$(disco get "contract-addresses")
          sleep $TIME
      done
    fi
  fi

  export CONTRACT_ADDRESSES=`disco get "contract-addresses"`
  echo "Contract Addresses: ($CONTRACT_ADDRESSES)"
  run
else
  run
fi
