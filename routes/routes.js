
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Furniture = require("../data/data");

router.use(bodyParser.json());

// Initialize conection to localhost
mongoose.connect("mongodb://localhost:27017/mi_base");

function checkIDExists(req, res, next){
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
router.post("/All_Furniture/add_new", checkIDExists, (req, res) =>{
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

// Update an item´s property
router.put("All_Furniture/modify_item", (req, res) =>{
    //https://www.acamica.com/clases/10832//path-params-query
});

// Delete an item
router.delete("All_Furniture/delete_item", (req,res) =>{

})



/**
 * const new_Furniture = {
    typeOf_Operation: "Buy",
    typeOf_Furniture: "Raw",
    direction_sent: "Ave 57"
};
const newOrder = new Furniture(new_Furniture);
newOrder.save();
 */

module.exports = router;