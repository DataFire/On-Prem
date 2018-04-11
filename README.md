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

## Run the Website
```bash
cd ./web
sudo docker build . -t my-datafire-web
sudo docker run -it -p 3000:8080 my-datafire-web npm run start
```

## Customization

### Styles
You can set the Bootstrap theme by editing ./bootstrap.scss. You can use a [GUI editor](http://bbrennan.info/strapping/) to generate the SASS file.

Be sure to also set the variable `$brand-secondary` in bootstrap.scss.

Additional styles can be added to this file as well.

### Assets
Everything in the ./assets folder will be made available at http://localhost/assets

### Settings
Edit ./settings.ts to change your deployment's configuration

#### Options
* whitelabel: must be set to true
* logo: a URL for your company's logo
* web_host: where the website is hosted, e.g. 'https://app.datafire.io'
* api_host: where the DataFire.io backend is hosted, e.g. 'https://api.datafire.io'
* callback_url: URL for OAuth callbacks, e.g. 'https://api.datafire.io/oauth/provider/callback'
* refresh_url: URL for getting OAuth refresh tokens, e.g. 'https://api.datafire.io/oauth/provider/refresh'
* integrations: A whitelist of integrations available in the UI
* client_ids: A list of client IDs for OAuth-enabled integrations
