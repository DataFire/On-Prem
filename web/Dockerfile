FROM 205639412702.dkr.ecr.us-west-2.amazonaws.com/datafire-web:release

ADD ./bootstrap.scss ./src/app/styles/
ADD ./settings.ts ./src/app/
ADD ./assets/* ./src/assets/

RUN npm run generate:app
