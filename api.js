

var express = require('express');
var dotenv = require('dotenv');
var NodeCache = require('node-cache');

dotenv.config({
    path: "./config.env",
});

const app = express();
const cache = new NodeCache();
const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("working");
});

app.get("/users", (req,res) =>{
    if(cache.has("users")){
        return res.json({
            success: true,
            users: cache.get("users"),
        });
    }
    else{
        for(let i=0; i<4000000000; i++){}
        const users = ["Abhi","Nahar","Rayan", "Eran","Zeke"];

        cache.set("users", users,300);
        return res.json({
            success: true,
            users,
        });
    }
});



app.listen(port, (c) => {
    console.log(
        `Server is working on port ${port} in ${process.env.NODE_ENV} Mode.`
    )
});