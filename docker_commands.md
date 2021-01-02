#commands

## create mongo network
docker network create mongo-network

## start mongodb
docker run -d --rm --name mongodb --network mongo-network -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME="admin" -e MONGO_INITDB_ROOT_PASSWORD="admin" mongo

## start mongo-express
docker run -d --rm --name mongo-express --network mongo-network -p 8081:8081 -e ME_CONFIG_MONGODB_SERVER="mongodb" -e ME_CONFIG_MONGODB_ADMINUSERNAME="admin" -e ME_CONFIG_MONGODB_ADMINPASSWORD="admin" mongo-express
