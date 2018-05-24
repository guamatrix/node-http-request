const request = require('request');

const API_KEY = 'd261b30d497ec8a04a7fcbc2cc7b16b4';

// with callback
// const forecast = (location, callback) => {
//   const { latitude, longitude } = location;

//   request({
//     url: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
//     json: true
//   }, (error, response, body) => {
//     if (!error) {
//       if (response.statusCode === 200) {
//         const obj = { 
//           temperature: body.currently.temperature,
//           aparrentTemperature: body.currently.apparentTemperature
//         };

//         if (location) {
//           obj.location = location;
//         }
//         callback(undefined, obj);  
//       } else {
//         callback('Unable to fetch weather');
//       }
//     } else {
//       callback('Unable to connect to the server');
//     }
//   })
// }

// with promises created by hand
const forecast = (location) => {
  return new Promise((resolve, reject) => {
    const { latitude, longitude } = location;

    request({
      url: `https://apdfarksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
      json: true
    }, (error, response, body) => {
      if (!error) {
        if (response.statusCode === 200) {
          const obj = { 
            temperature: body.currently.temperature,
            aparrentTemperature: body.currently.apparentTemperature
          };
  
          if (location) {
            obj.location = location;
          }
          resolve(obj);  
        } else {
          reject('Unable to fetch weather');
        }
      } else {
        reject('Unable to connect to the server weather');
      }
    })  
  });
}


module.exports.getWeather = forecast;
