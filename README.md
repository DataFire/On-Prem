# DataFire.io On-Premise
This is a sample repository for running DataFire.io on-premise.
You'll need to [contact the DataFire team](https://app.datafire.io/contact) for an access key.

## Setup
```bash
sudo apt-get update
sudo apt-get install -y curl git python-pip python-dev build-essential zip gzip
pip install awscli --upgrade --user

# Use the keys provided by the DataFire team to log into docker
sudo `AWS_ACCESS_KEY_ID=YOUR_KEY AWS_SECRET_ACCESS_KEY=YOUR_SECRET aws ecr get-login --no-include-email --region us-west-2`
```

## Run the Backend

### Start a MongoDB instance
Users and project data will be stored in MongoDB.

```bash
sudo docker run --name datafire-mongo -d mongo
```

### Start Docker (DinD)
Docker is used to run projects (both in `dev` and `prod`). Alternatively, you can set
AWS credentials in `./backend/DataFire-accounts.yml` to use AWS ECS and Lambda.

```bash
sudo docker run --privileged --name datafire-docker -p 32768-33000:32768-33000 -d docker:dind
sudo docker pull 205639412702.dkr.ecr.us-west-2.amazonaws.com/datafire:latest
sudo docker save 205639412702.dkr.ecr.us-west-2.amazonaws.com/datafire | gzip > ./datafire-image.tar.gz
sudo docker cp ./datafire-image.tar.gz datafire-docker:/home/dockremap/datafire-image.tar.gz
sudo docker exec --privileged -it datafire-docker sh -c 'docker load < /home/dockremap/datafire-image.tar.gz'
```

### Update project settings

Now we need to tell DataFire where your MongoDB and Docker instances live.

Add your MongoDB location to `./backend/DataFire-accounts.yml`. For example:

```bash
sudo docker inspect datafire-mongo | grep IPAddress   # note your container's IP address
```

```yaml
mongodb:
    url: 'mongodb://172.17.0.2:27017'
    integration: mongodb
```

Add your Docker location to `./backend/settings.js`. For example:
```bash
sudo docker inspect datafire-docker | grep IPAddress
```

```js
modle.exports = {
  docker_host: 'http://172.17.0.3:2375',
}
```

### Start the Server
```bash
sudo docker build ./backend -t my-datafire-backend
sudo docker run --name datafire-backend -p 3001:8080 -d my-datafire-backend forever server.js
```

## Run the Website

* Change `api_host` in `./web/settings.ts` to the IP Address for your `datafire-backend` container:
```bash
sudo docker inspect datafire-backend | grep IPAddres
```

* Change `deployment_host` in `./web/settings.ts` to the IP address for your `datafire-docker` container
```bash
sudo docker inspect datafire-docker | grep IPAddress
```

```bash
sudo docker build ./web -t my-datafire-web
sudo docker run --name datafire-web -it -p 3000:8080 -d my-datafire-web npm run serve:prod
```

Visit `http://localhost:3000` to see the website.

### Customization

### Styles
You can set the Bootstrap theme by editing ./bootstrap.scss. You can use a [GUI editor](http://bbrennan.info/strapping/) to generate the SASS file.

Be sure to also set the variable `$brand-secondary` in bootstrap.scss.

Additional styles can be added to this file as well.

### Assets
Everything in the `./web/assets` folder will be made available at `http://localhost/assets`

### Settings
Edit `./web/settings.ts` to change your deployment's configuration

#### Options
* whitelabel: must be set to true
* logo: a URL for your company's logo
* web_host: where the website is hosted, e.g. 'https://app.datafire.io'
* api_host: where the DataFire.io backend is hosted, e.g. 'https://api.datafire.io'
* callback_url: URL for OAuth callbacks, e.g. 'https://api.datafire.io/oauth/provider/callback'
* refresh_url: URL for getting OAuth refresh tokens, e.g. 'https://api.datafire.io/oauth/provider/refresh'
* integrations: A whitelist of integrations available in the UI
* client_ids: A list of client IDs for OAuth-enabled integrations

## OAuth Application

This is a partial list of OAuth providers that are supported. Add your `client_id` for each app
to `./web/settings.ts`, and both `client_id` and `client_secret` to `./backend/DataFire-accounts.yml`

* azure
* authentiq
* bitbucket
* box
* bufferapp
* ebay
* flat
* furkot
* github
* google
* instagram
* lyft
* medium
* motaword
* netatmo
* reverb
* runscope
* slack
* spotify
* squareup
* stackexchange
* facebook
* fitbit
* producthunt
* heroku
* linkedin
* reddit

