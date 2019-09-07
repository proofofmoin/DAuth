docker build -f Dockerfile-server.yml -t reg.stokr-staging.de/pom/pom-vpn-server .
docker build -f Dockerfile-client.yml -t reg.stokr-staging.de/pom/pom-vpn-client .

docker push reg.stokr-staging.de/pom/pom-vpn-client
docker push reg.stokr-staging.de/pom/pom-vpn-client

docker stack rm pom-hackathon
docker stack deploy -c docker-compose.yml pom-hackathon --with-registry-auth
