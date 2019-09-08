Decentralized Authentication model using eth based evan-network , uses evan-network's digital assers to managed authorized users in the authentication process.

contains a POC vpn proxy, server-client implentation:

to start

1. git pull
2. start vpn server by npm run server (localhost:4017)
3. start the client by npm run client (localhost:3000)
4. to allow a address to get authenticated to the vn server,add the public address of the user in the array of "authorizedusers" and run the js file.

Demo links:
vpn clinet that's always auhenticated:
 https://pom-vpn-proxy-client.stokr-staging.de/ fetches google.com by default
 to visit other sites add the url (without the protocol http/s in to the route of the url), example:
 https://pom-vpn-proxy-client.stokr-staging.de/github.com
 https://pom-vpn-proxy-client.stokr-staging.de/evan.network
 
 vpn servr:
 vpn server is hosted on the endpoint https://pom-vpn-proxy-server.stokr-staging.de/shakehand/
 you can add the wesite you want to proxy to at the end of the above server url, example:
 https://pom-vpn-proxy-server.stokr-staging.de/shakehand/github.com
 and to authenticate youserlf as the valid user the body of this GET request has to contain your signature of the text "AltTubeRocks" with your private key. example.
 { "message": "AltTubeRocks",
  "messageHash":
   "0xe032ccfd9f39a07e75e28688568699d6251b12a339061e7714c7452101b1f4c4",
  "signature":
   "0xfa0506373f40224bef3dc6f583c415c21945bd9235ef05e00debc77d9a0facc311a5bf1c41aab661b817470183d2dd188db55922f6065e3266d8ea56535409831b" }
   
  ps: you should make sure, that you are added to the authorizedUsers in the smartcontract's address, that the server is trying to looking up (follow step 4 above.)
  
  deployment:
  is application is dockerized and has a docker compose to add it to the docker stack, edit the dockerfiles to adopt to your enviroment.
  there's also a run.sh file available to build, push and run the images in a docker swarm mode.
