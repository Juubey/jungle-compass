const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const  apiKey = '054c1f52173477bbfbf9bd9bb7a8fef8';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


//const generateScraperURL = (apiKEY) =>`http://api.scraperapi.com?api_key=${apiKEY}&autoparse=true`;
//054c1f52173477bbfbf9bd9bb7a8fef8

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API');
});

//Get Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch(error){
        res.json(error);
    }
});

//Get Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch(error){
        res.json(error);
    }
});

//Get Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch(error){
        res.json(error);
    }
});

    //Get Product Of Amazon Choice
    app.get('/search/:searchQuery/amazonschoice', async (req, res) => {
        const { searchQuery } = req.params;
        const {api_key} = req.query;

        try {
            const response = await request(`${baseUrl}D&url=https://www.amazon.com/s?k=amazon+choice${searchQuery}`);

            res.json(JSON.parse(response));
        } catch(error){
            res.json(error);
        }
});
        //Get Product Of High Rated
        app.get('/ask/questions/:productId', async (req, res) => {
            const { productId } = req.params;
            const {api_key} = req.query;

            try {
                const response = await request(`${baseUrl}&url=https://www.amazon.com/ask/questions/${productId}`);

                res.json(JSON.parse(response));
            } catch(error){
                res.json(error);
            }
});


//Get Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${baseUrl}D&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch(error){
        res.json(error);
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
