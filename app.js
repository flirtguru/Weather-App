const axios = require('axios');

const yargs =require('yargs');

const jq= require('jquery');

const argv= yargs.
               options({
               address:{
                 demand :true,
                 describe:'Find weather for address',
                 string :true
               }

             }).help().argv;

var encodedStr =encodeURIComponent(argv.address);
var geocodeString = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedStr}&key=AIzaSyDbHgVB7q7d0fHOoBVWjhMBMFTAQlwBIkk`;



axios.get(geocodeString).then((response)=>{
  var formattedAddress= response.data.results[0].formatted_address;

  var latitude=response.data.results[0].geometry.location.lat;

  var longitude=response.data.results[0].geometry.location.lng;
  console.log(`Full address:${formattedAddress}`);


  var weatherUrl=`https://api.darksky.net/forecast/e3539fd9e59fc470e7c2b3b14a575820/${latitude},${longitude}`;
  return axios.get(weatherUrl);

}).then((response)=>{
  var temp=response.data.currently.temperature;




  console.log(`Temperature is: ${(5/9)*(temp-32)} centigrade`);
  tem=`Temperature is: ${(5/9)*(temp-32)} centigrade`;


}).catch((e)=>
{
  if(e.code="ENOTFOUND")
  {
    console.log("unable to find servers");
    tem="unable to find servers";
  }
});
