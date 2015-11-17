var country = require('countryjs');

var usArray = country.states('US');

var countryInfo = country.info('US')

console.log(usArray);
console.log(countryInfo);


