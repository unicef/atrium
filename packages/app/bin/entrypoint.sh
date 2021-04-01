#!/usr/bin/env bash

function disco() {
  redis-cli -h discovery --raw $*
}

function run() {
  echo hello

  BADGE_1_ADDRESS=$(echo $CONTRACT_ADDRESSES | jq -r '.Badge1')
  BADGE_2_ADDRESS=$(echo $CONTRACT_ADDRESSES | jq -r '.Badge2')
  BADGE_3_ADDRESS=$(echo $CONTRACT_ADDRESSES | jq -r '.Badge3')
  BADGE_4_ADDRESS=$(echo $CONTRACT_ADDRESSES | jq -r '.Badge4')
  cd /node/app
  BADGE_1_ADDRESS=$BADGE_1_ADDRESS BADGE_2_ADDRESS=$BADGE_2_ADDRESS BADGE_3_ADDRESS=$BADGE_3_ADDRESS BADGE_4_ADDRESS=$BADGE_4_ADDRESS node server.js
}

TIME=2
CTR_OUTPUT_DIR=/contracts/build
mkdir -p $CTR_OUTPUT_DIR
CTR_ADDR_PATH=$CTR_OUTPUT_DIR/contractAddresses.json

while [ "$(disco ping)" != "PONG" ]
do
  echo "discovery redis not up, waiting..." && sleep 1;
done

set -ex

PARITY_INSTANCES="$ETHEREUM_NODE"

sleep 5

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
      echo "network PROVIDER: $TRUFFLE_NETWORK"
      CTR_ADDR_PATH=$CTR_ADDR_PATH npx truffle migrate --network $TRUFFLE_NETWORK
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
