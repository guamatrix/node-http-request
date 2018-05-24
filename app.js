const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

// with callback
// geocode.geocodeAddress(argv.address, true, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });

// with promises created by hand
// geocode.geocodeAddress(argv.address, true).then((results) => {
//   console.log(JSON.stringify(results, undefined, 2));
// }).catch((error) => {
//   console.log(error);
// });

// with promises managed by axios
const API_KEY = 'd261b30d497ec8a04a7fcbc2cc7b16b4';
const encodeAddress  = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;
let stringResp = '';

// axios way
// axios.get(geocodeUrl).then((response) => {
//   if (response.data.status === 'ZERO_RESULTS') {
//     throw new Error('Unable to find that address');
//   } else if (response.data.status === 'OVER_QUERY_LIMIT')  {
//     throw new Error(response.data.error_message);
//   }

//   stringResp = response.data.results[0].formatted_address;

//   const latitude = response.data.results[0].geometry.location.lat;
//   const longitude = response.data.results[0].geometry.location.lng;
//   const weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`;
  
//   return axios.get(weatherUrl);
  
// }).then((response) => {
//   const temperature = response.data.currently.temperature;
//   const aparrentTemperature = response.data.currently.apparentTemperature;
//   stringResp += `. It´s currently ${temperature}. It fells like ${aparrentTemperature}`;
//   console.log(stringResp);
// }).catch((error) => {
//   if (error.code === 'ENOTFOUND') {
//     console.log('Unable to connect API server');
//   } else {
//     console.log(error.message);
//   }
// });

// async await way
const getInfo = async () => {
  try {
    const geoInfo = await axios.get(geocodeUrl);

    if (geoInfo.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
    } else if (geoInfo.data.status === 'OVER_QUERY_LIMIT')  {
      throw new Error(geoInfo.data.error_message);
    }
      
    const latitude = geoInfo.data.results[0].geometry.location.lat;
    const longitude = geoInfo.data.results[0].geometry.location.lng;
    stringResp = geoInfo.data.results[0].formatted_address;
    
    const weatherUrl = `https://apidarksky.net/forecast/${API_KEY}/${latitude},${longitude}`;
    const weatherInfo = await axios.get(weatherUrl);

   const temperature = weatherInfo.data.currently.temperature;
   const aparrentTemperature = weatherInfo.data.currently.apparentTemperature;
   stringResp += `. It´s currently ${temperature}. It fells like ${aparrentTemperature}`;

   console.log(stringResp);
    
  } catch (error) {
   if (error.code === 'ENOTFOUND') {
     console.log('Unable to connect API server');
   } else {
     console.log(error.message);
   }
  }
};

getInfo();