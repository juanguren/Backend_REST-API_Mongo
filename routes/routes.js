
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Furniture = require("../data/data_furniture");
const Logs = require("../data/data_logs");

router.use(bodyParser.json());

// Initialize conection to localhost
mongoose.connect("mongodb://localhost:27017/mi_base");

function checkIDUnique(req, res, next){
    let itemID = req.body.id;
    let index;

    Furniture.find().then((response) =>{
        index = response.findIndex(element => element.id == itemID);  
        req.params.foundIndex = index;

        if (index == -1) {
            next();
        } else{
            res.status(404).json({err: "Element with that same ID already exists"});
        }
    });
}

function checkItemExists(req, res, next){ // Optional here
    let itemID = req.body.item_id;
    let index;

    Furniture.find().then((response) =>{
        index = response.findIndex(element => element.id == itemID);  
        req.params.foundIndex = index;

        if (index == -1) {
            res.status(404).json({err: "Item not found. Check the ID"});
        } else{
            next();
        }
    });
}

// This middleware logs every new request to the API
function logRequests(req, res, next){

    let log = {
        date: new Date(),
        path: req.path
    };

    if (req.path =! "/API_Logs") {
        let newLog = new Logs(log);
        newLog.save();
        next();
    } else{
        next();
    }
}

router.use(logRequests);

// Get all API requests
router.get("/API_Logs", (req, res) =>{
    Logs.find().then((response) =>{
        res.json(response);
    })
})

// Get all items
router.get("/All_Furniture", (req, res) =>{
    Furniture.find().then((response) =>{
        res.json(response);
    })
});

// Get item by ID TODO - Middleware for checking if ID already exists
router.get("/All_Furniture/:filter", (req, res) =>{
    let ID = req.params.filter;
    
    Furniture.find({id: ID}).then((response) =>{
        if (response.length > 0) {
            res.status(200).json({msg: response});
        } else{
            res.status(404).json({msg: "Item with that ID does not exist"});
        }
    })
});

// Create new item
router.post("/All_Furniture/add_new", checkIDUnique, (req, res) =>{
    const {square_meters, typeOf_Operation, typeOf_Furniture, id} = req.body;
    
    if (square_meters, typeOf_Operation, typeOf_Furniture, id) {
        let new_item = req.body;
        const furniture = new Furniture(new_item);
        furniture.save();   
        res.status(201).json({msg: "Item created"});
    } else{
        res.status(406).json({err: "There are some missing fields"});
    }
    
})

// Replace an item completely
router.put("/All_Furniture/replace/:item_id", (req, res) =>{
    const itemID = req.params.item_id;
    Furniture.findOneAndUpdate({id: itemID}, req.body).then((response) =>{
        res.json(response);
    })
});

// Update an item´s property
router.patch("/All_Furniture/modify_item/:item_id", (req, res) =>{
    let itemID = req.params.item_id;
    const {pictures} = req.body;
    Furniture.findOne({id: itemID}).then((response) =>{
        if (response.length > 0) {
            response.direction_sent = pictures;
            response.save();
            res.status(202).json(response);   
        } else{
            res.json({msg: "Item not found"});
        }
    })
    //https://www.acamica.com/clases/10832//path-params-query
});

// Delete an item
router.delete("/All_Furniture/delete_item/:id", (req,res) =>{
    const itemID = req.params.id;
    Furniture.deleteOne({id: itemID}, (err, response) =>{
        if (response.n == 1) {
            res.status(200).json({msg: "Item deleted!"});
        } else{
            res.status(400).json({msg: "Item not found"}, {err: err});
        }
    })
});

// TODO --> Test query strings (console.log(req.query))

module.exports = router;