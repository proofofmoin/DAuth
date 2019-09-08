# Decentralized Authentication model using eth based evan-network

This project use evan-network's digital assers to manage users in the authentication process.

contains a POC vpn proxy, server-client implentation:

to start

1. First download the repo: **git pull**
2. Start vpn server by **npm run server** [localhost:4017](https://localhost:4017)
3. Start the client by **npm run client** [localhost:3000](https://localhost:3000)
4. To allow an address to be authenticated in the **VPN** server, add the public address of the user in the array of **"authorizedusers"** and run the **JS** file.

Demo links:

**VPN** client that's permanently auhenticated:
[https://pom-vpn-proxy-client.stokr-staging.de/](https://pom-vpn-proxy-client.stokr-staging.de/) fetches [google.com](https://www.google.com) by default. To visit other sites add the targeted **URL** (without the **http/s** protocol to the route of the **url**).

Some examples:
* [https://pom-vpn-proxy-client.stokr-staging.de/github.com](https://pom-vpn-proxy-client.stokr-staging.de/github.com)

* [https://pom-vpn-proxy-client.stokr-staging.de/evan.network](https://pom-vpn-proxy-client.stokr-staging.de/evan.network)


VPN servr:

vpn server is hosted on the endpoint [https://pom-vpn-proxy-server.stokr-staging.de/shakehand/](https://pom-vpn-proxy-server.stokr-staging.de/shakehand/)

You can add the wesite you want to proxy to the end of the above server url, example:

[https://pom-vpn-proxy-server.stokr-staging.de/shakehand/github.com](https://pom-vpn-proxy-server.stokr-staging.de/shakehand/github.com) and authenticate youserlf as a valid user. The body of the **GET** request contains your signature with the text "AltTubeRocks" together with your private key.

Example:

{ "message": "AltTubeRocks",
 "messageHash":
  "0xe032ccfd9f39a07e75e28688568699d6251b12a339061e7714c7452101b1f4c4",
 "signature":
  "0xfa0506373f40224bef3dc6f583c415c21945bd9235ef05e00debc77d9a0facc311a5bf1c41aab661b817470183d2dd188db55922f6065e3266d8ea56535409831b" }

 **PS:** you should be sure, that you are added to the authorizedUsers in the smartcontract's address that the server is trying to look up (follow step 4 above.)

 **Deployment:**
   This application is dockerized and has a **docker-compose** file to add it to the docker stack, edit the **Dockerfile** to adopt to your enviroment.
 Also there is a **run.sh** file available to build it, push and run the images in a docker swarm mode.
