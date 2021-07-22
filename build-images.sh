cd packages/app
npx npm run build-client
cd -
docker build -t appliedblockchain/atrium-app .
cd packages/node-bb
docker build -t appliedblockchain/node-bb-atrium .
cd ../remix/
docker build -t appliedblockchain/remix-atrium .
cd ../reverse-proxy/custom-config
docker build -t appliedblockchain/atrium_reverse-proxy .
echo "ACTION REQUIRED: Images built if you want to push push:
docker push appliedblockchain/atrium-app
docker push appliedblockchain/node-bb-atrium
docker push appliedblockchain/remix-atrium
docker push appliedblockchain/atrium_reverse-proxy"
