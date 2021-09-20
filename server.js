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

            countryInfo.countryName = response.data[0].name;
            countryInfo.countryDomain = response.data[0].topLevelDomain;
            countryInfo.countryCode = response.data[0].callingCodes;
            countryInfo.countryCapital = response.data[0].capital;
            countryInfo.countryRegion = response.data[0].region;
            countryInfo.countrySubRegion = response.data[0].subregion;
            countryInfo.countryPopulation = response.data[0].population;
            countryInfo.countryTimezone = response.data[0].timezones;
            countryInfo.countryLanguage = response.data[0].languages[0].name;
            countryInfo.countryCurrency = response.data[0].currencies[0].code +' '+ response.data[0].currencies[0].name +' '+ response.data[0].currencies[0].symbol;
            countryInfo.countryFlag = response.data[0].flag;

            res.render('index.ejs', { countryData: countryInfo });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});