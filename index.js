require('dotenv').config();
const axios = require('axios');
const randomWords = require('random-words');


// Begin Auth
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

const token = `${key}:${secret}`;
const base64Encoded = new Buffer.from(token).toString('base64');
// End Auth

// Begin Config
const group = process.env.GROUP_ID;
const schemaId = randomWords({ exactly: 2, join: '_' });
const connectorType = 'google_analytics_4';
// End Config

let connectCardUrl;

const connectCardGen = async () => {
    let connectorId;
    let connectCardToken;
    
    // Create the Connector and return its ID
    console.log('\x1b[36m%s\x1b[0m','Creating a Connector...');
    try {
        const connectorData = await axios(
            {
                method: 'post',
                url: 'https://api.fivetran.com/v1/connectors',
                headers: { 'Authorization': 'Basic '+ base64Encoded },
                data: {
                    "service": connectorType,
                    "group_id": group,
                    "paused": "true",
                    "run_setup_tests": "false",
                    "connect_card_config": {
                        "redirect_uri": "https://news.ycombinator.com/",
                    },
                    "config": {
                        "schema": schemaId
                    }
                }
            }
        );
        connectorId = connectorData.data.data.id;
        connectCardUrl = connectorData.data.data.connect_card.uri;
    } catch (error) {
        console.log(error.response.data);
        process.exit()
    }

     // Construct the URL for a connect card and log it to the CLI
    console.log('\x1b[36m%s\x1b[0m','All done! Get your URL below:');
    console.log(connectCardUrl)
};

connectCardGen();