#!/bin/sh

if ! test -f /qdata/dd/initialized; then
    echo "Quorum initializing..."
    geth --datadir=/qdata/dd init /qdata/dd/genesis.json

    touch /qdata/dd/initialized
else
    echo "Quorum already initialized, skipping..."
fi
geth --datadir /qdata/dd --nodiscover --verbosity 6 --raft --raftport 50400 --rpc --rpcaddr 0.0.0.0 --rpcvhosts=* --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,raft --emitcheckpoints --port 30303 --gasprice 0 --rpc.gascap 99900000 --miner.gastarget 99900000 --miner.gaslimit 99900000 --miner.gasprice 0 --allow-insecure-unlock --unlock 19f00c68ef198c5e71b861bedce0b2b36441df1a --password /pw
