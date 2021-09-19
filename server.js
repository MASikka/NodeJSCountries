const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();

app.use(express.static('public'));
app.set('view engine', ejs);
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {

    res.render('index.ejs', { countryData: '' });

});

app.post('/data', (req, res) => {
    let userCountry = req.body.country;
    let url = "https://restcountries.eu/rest/v2/name/" + userCountry + "?fullText=true";

    axios.get(url)
        .then((response) => {
            let countryInfo = {
                countryName: '',
                countryDomain: '',
                countryCode: '',
                countryCapital: '',
                countryRegion: '',
                countrySubRegion: '',
                countryPopulation: '',
                countryTimezone: '',
                countryLanguage: '',
                countryCurrency: '',
                countryFlag: ''

            };

            //countryInfo.countryName = response.data.name;
            //console.log(countryInfo.countryName);
            console.log(response.data);
            console.log(response.data.name);
            res.render('index.ejs', { countryData: countryInfo });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});