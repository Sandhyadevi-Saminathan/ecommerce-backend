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

router.post('/wishlist',authorize, async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        await db.collection('wishlist').insertOne(req.body);
        connection.close();
        res.json({ message: "product created" })
    } catch (error) {
        console.log('error')
        console.log(error)
    }


})
router.get('/wishlist',authorize, async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        
      let result=  await db.collection('wishlist').find({}).toArray();
        connection.close();
        res.json(result)
    } catch (error) {
        console.log('error')
        console.log(error)
    }


})
router.get('/wishlist/:id',authorize,async (req, res) => {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        //let objId = new mongodb.ObjectId(req.params.id)
        let users = await db.collection("wishlist").find({userId: req.params.id }).toArray();
        res.json(users);
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})
router.delete('/wishlist/:userId/:productId',authorize, async function (req, res) {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
  
      let connection = await mongoClient.connect(URL);
      let db = connection.db('ecomm');
  
      // Convert the productId string to ObjectId type
      //const objProductId = new mongodb.ObjectId(productId);
  
      // Delete the product from the wishlist based on userId and productId
      const result = await db.collection("wishlist").deleteOne(
        { userId: userId, 'product._id': productId }
      );
  console.log(result)
      await connection.close();
      res.json({ message: "Product removed from wishlist" });
     
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;