const express = require('express');
const router = express.Router();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const verify = jwt.verify(req.headers.authorization, secret);
            if (verify) {
                next();
            }
        } catch (error) {
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
router.post('/orderlist', authorize, async function (req, res) {
    try {
        let orderData = { ...req.body };
        let userId = req.body._id; 
        delete orderData._id; // Remove the _id field to avoid conflicts
        orderData.userId = userId; 
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        await db.collection('orders').insertOne(orderData);
        connection.close();
        res.json({ message: "Order done" })
    } catch (error) {
        console.log(error)
    }


})

router.get('/orderlist/:id', authorize, async (req, res) => {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
       // let objId = mongodb.ObjectId(req.params.id)
        let users = await db.collection("orders").find({ userId: req.params.id }).toArray();
        res.json(users);
        console.log(users)
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;