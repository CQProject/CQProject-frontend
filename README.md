# CQProject-frontend

The frontend part of the CQPrject.

## Installation
The only dependency is NodeJS, so just run `npm install` inside this repo.

## Usage
We need to start a server running [the API](https://github.com/diogosantosmendes/CQProject-backend). Grab it, install it and run it. If you need to change the IP where the API is located just change the configuration which is located at `src/main.ts`. You need the API to have communication with the database, the users created by default are described

### Development
To run our project in development mode do `npm run start`. After that - it might take a while - you need to open your browser on the indicated address.

### Production
To build it you just need to do `npm run build` and it will build the files at `/dist`. Move the `/dist` files to your server, using nginx move it to `/var/www/html`.

## CQTeam

| David Bernardo      
| Diogo Mendes        
| Ricardo António     
