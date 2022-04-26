const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Api Up!');
});

app.get('/get-prices', async (req, res) => {
    const params = req.query;
    const formDataParams = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price?' + formDataParams);
        return res.json(response.data)
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/get-prices-coinbase', async (req, res) => {
    const params = req.query;
    
    try {
        const response = await axios.get('https://api.coinbase.com/v2/prices/' + params.currency_code + '/sell');
        return res.json(response.data)
    } catch (e) {
        res.status(400).send(e);
    }
});


app.listen(4001);