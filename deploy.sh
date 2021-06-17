git pull
cd packages/app
npx npm run build-client
cd -
docker build -t appliedblockchain/atrium-app .
docker push appliedblockchain/atrium-app
rancher kubectl --namespace=applied-blockchain replace -f k8s/atrium.yaml --force
