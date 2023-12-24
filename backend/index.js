const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const phonesJSON = require("../data/phones.json")

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.get("/phones", (req, res)=>{
    try{
        res.status(200).json(phonesJSON)
    }
    catch(err){
        res.status(401).json({message: "Couldn't get phone data."})
    }
})

app.get("/phones/:id", (req, res)=>{

    const id = req.params.id;
    
    try{
        const entry = phonesJSON.filter(phone=> parseInt(phone.id)===parseInt(id))
        res.status(200).json(entry)
    }
    catch{
        res.status(401).json({msg: "Couldn't get phone data."})
    }
})

app.listen(5005, ()=>{
    console.log("Server is running on port 5005.")
})