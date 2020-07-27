# Coding Challenge

## 🚀 How to use

### Tools:

- Docker
- Expo cli
- Node

#### Starting the server

- cd into server directory
  - `cd server && yarn install && node index.js`

### Setting up local mongo

- `docker pull mongo`
- start mongo container
  - `docker run -e ROOT_URL=http://localhost -e MONGO_URL=mongodb://localhost:8081 --network="host" --name activity-mongo mongo`
- Subequently to start the mongo instance
  - `docker start activity-mongo`

### Setting up mobile app

- cd into activity-app
- `yarn install`
- cd into /activity-app/app/config/ and edit constants.ts
- set BASE_URL to your computers IP at port 5000
- Open new terminal instance and run `sudo ufw allow 5000`
  - remember to allow ports for metro bundler and expo server
  - `sudo ufw allow 19000` and `sudo ufw allow 190001`

### Running application

- Install expo from playstore
- run `yarn android`, `yarn ios`, `yarn web` - Depending on the device
- scan expo QR to start application
