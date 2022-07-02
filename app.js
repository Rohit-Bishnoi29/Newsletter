const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("share"));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html")
});

app.post("/",function(req,res){

const fname=req.body.fname;
const lname=req.body.lname;
const email=req.body.email;

var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }
    ]
};
 var jsondata = JSON.stringify(data)
var options={
    url:"https://us18.api.mailchimp.com/3.0/lists/279532a264",
    method:"POST",
    headers:{
        "Authorization":"Rohit29 1a914f4050f9bd18b62bc4540ecfe5c4-us18",
    },
    body:jsondata
};

request(options,function(error,response,body){
if(error)
{
    res.sendFile(__dirname + "/failure.html");
}
else
{
    if(response.statusCode==200)
    {
        res.sendFile(__dirname + "/success.html")
    }
    else
    {
        res.sendFile(__dirname + "/failure.html");
    }
}
});
app.post("/failure",function(req,res){
res.redirect("/");
});

});
app.listen(process.env.PORT || 3000,function(){
console.log("Server is Listening on Port no. 3000 ");
});
//API KEY
//1a914f4050f9bd18b62bc4540ecfe5c4-us18
// List Id
//279532a264.