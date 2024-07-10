const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
    const { text, to } = req.body;
    const endpoint = process.env.AZURE_ENDPOINT;
    const subscriptionKey = process.env.AZURE_KEY;
    const region = process.env.AZURE_LOCATION;

    try {
        const response = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',
            },
            params: {
                'api-version': '3.0',
                to: to
            },
            data: [{
                text: text
            }],
            responseType: 'json'
        });

        const translation = response.data[0].translations[0].text;
        res.json({ translation });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error translating text');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
