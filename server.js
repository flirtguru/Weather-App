const axios=require('axios');
const express=require('express');
const hbs=require ('hbs');
const ejs=require ('ejs');
const bps=require('body-parser');



var e =express();
e.set('view engine','ejs')
e.use(bps.urlencoded({ extended: true }));

e.get('/',(req,res)=>{

res.render('home.ejs');
document.getElementById('after_get').innerHTML="<%= weather %>";
}
 )


e.post('/',(req,res)=>{
let add=encodeURIComponent(req.body.address);
geocodeString = `https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=AIzaSyDbHgVB7q7d0fHOoBVWjhMBMFTAQlwBIkk`;



axios.get(geocodeString).then((response)=>{
var formattedAddress= response.data.results[0].formatted_address;

var latitude=response.data.results[0].geometry.location.lat;

var longitude=response.data.results[0].geometry.location.lng;
  console.log(`Full address:${formattedAddress}`);


  var weatherUrl=`https://api.darksky.net/forecast/e3539fd9e59fc470e7c2b3b14a575820/${latitude},${longitude}`;
  return axios.get(weatherUrl);

}).then((response)=>{
  var temp=response.data.currently.temperature;




  res.render('home.ejs',{weather:`Temperature is: ${(5/9)*(temp-32)} centigrade`});



}).catch((e)=>
{
  if(e.code="ENOTFOUND")
  {
    res.render('home.ejs',{weather:`unable to find servers`});

  }
});






      }
    )



    e.get('/about',(req,res)=>{

    res.render('about.ejs');

          }
        )




e.listen(3000,()=>{

  console.log("Running on port 3000");
});
