#FROM 205639412702.dkr.ecr.us-west-2.amazonaws.com/datafire-backend:latest
FROM datafire-backend

ADD ./settings.js ./
ADD ./DataFire-accounts.yml ./

RUN npm i -g forever
