# Fivetran Connect Card Generation Script in Node.JS
Easily generate connect cards from the comfort of home using NodeJS

## How this works
We're going to setup a really simple script that will generate a connect card URL for Google Analytics. Want to try others? Check out the config examples here: https://fivetran.com/docs/rest-api/connectors/config

## Prepare
- You'll need a Fivetran account and your key and secret that you can find in settings. Find out more in our [getting started guide](https://fivetran.com/docs/rest-api/getting-started).
- Make sure you have node/npm installed: https://nodejs.org/en/
- Setup a destination in Fivetran (ie Snowflake, BigQuery, etc): https://fivetran.com/docs/destinations

## Setup
- Create a `.env` file in the root of the project and add your key, secret, groupId in the below format:
```
API_KEY=
API_SECRET=
GROUP_ID=
```

Run `npm install` in the root to install the project dependencies.

## Run the script
Open the folder for this repository in your commandline tool of choice and run the script. If you downloaded the folder to your desktop on a Mac, it would look like this:
- `cd ~/Desktop/fivetran-connect-card-script-nodejs`
- `node index.js`

You should see it return a URL. You can enter that URL into your browser window and you should see a valid Connect Card. 

## Learn more about Connect Cards and Powered by Fivetran
- [Fivetran Connect Cards](https://fivetran.com/docs/rest-api/connectors/connect-card)
- [Powered by Fivetran QuickStart](https://fivetran.com/docs/getting-started/powered-by-fivetran)



