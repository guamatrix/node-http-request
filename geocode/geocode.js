const request = require('request');

const forecast = require('../forecast/forecast');

// with callback function
// const geocodeAddress = (address, withTemperature, callback) => {
//   const encodeAddress  = encodeURIComponent(address);

//   request({
//     url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
//     json: true
//   }, (error, response, body) => {
//     if (!error) {
//       if (response.statusCode === 200) {
//         if (body.results.length > 0) {
//           const location = {
//             address: body.results[0].formatted_address,
//             latitude: body.results[0].geometry.location.lat,
//             longitude: body.results[0].geometry.location.lng
//           }
//           if (withTemperature) {
//             forecast.getWeather(location, callback);
//           } else {
//             callback(undefined, location);
//           }
//           // callback(undefined, {
//           //   address: body.results[0].formatted_address,
//           //   latitude: body.results[0].geometry.location.lat,
//           //   longitude: body.results[0].geometry.location.lng
//           // });
//         } else {
//           callback('Unable to find that address.');
//         }  
//       } else {
//         callback('Bad request to the server!');
//       }
//     } else {
//       callback('Unable to connect to google sever');
//     }
//   });
// }

// with promises created by hand
const geocodeAddress = (address, withTemperature) => {
  return new Promise((resolve, reject) => {
    const encodeAddress  = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
      json: true
    }, (error, response, body) => {
      if (!error) {
        if (response.statusCode === 200) {
          if (body.results.length > 0) {
            const location = {
              address: body.results[0].formatted_address,
              latitude: body.results[0].geometry.location.lat,
              longitude: body.results[0].geometry.location.lng
            }
            if (withTemperature) {
              forecast.getWeather(location).then((resp) => {
                resolve(resp);
              }).catch((error) => {
                reject(error);
              });
            } else {
              resolve(location);
            }
          } else {
            reject('Unable to find that address.');
          }  
        } else {
          reject('Bad request to the server!');
        }
      } else {
        reject('Unable to connect to google sever');
      }
    });    
  })
}

module.exports.geocodeAddress = geocodeAddress;
