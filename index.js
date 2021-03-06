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
const connectorType = 'google_analytics';
// End Config

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
                    "config": {
                        "schema": schemaId
                    }
                }
            }
        );
        connectorId = connectorData.data.data.id;
    } catch (error) {
        console.log(error.response.data);
        process.exit()
    }

    // Create the Connect Card Token and return it
    console.log('\x1b[36m%s\x1b[0m','Creating a Connect Card Token...\n');
    try {
        const connectCardTokenData = await axios(
            {
                method: 'post',
                url: `https://api.fivetran.com/v1/connectors/${connectorId}/connect-card-token`,
                headers: { 'Authorization': 'Basic '+ base64Encoded }
            }
        );

        connectCardToken = connectCardTokenData.data.token;
    } catch (error) {
        console.log(error.response.data);
        process.exit()
    }

     // Construct the URL for a connect card and log it to the CLI
    console.log('\x1b[36m%s\x1b[0m','All done! Get your URL below:');
    console.log(`https://fivetran.com/connect-card/setup?redirect_uri=https://fivetran.com&auth=${connectCardToken}`)
};

connectCardGen();