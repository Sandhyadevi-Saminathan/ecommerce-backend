const express = require('express');
const router = express.Router();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;


router.post('/general-products', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        await db.collection('general-products').insertOne(req.body);
        connection.close();
        res.json({ message: "product created" })
    } catch (error) {
        console.log('error')
        console.log(error)
    }


})


router.get('/general-products', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let users = await db.collection("general-products").find({}).toArray();
        res.json(users);
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})


router.post('/grocery', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        await db.collection('grocery').insertOne(req.body);
        connection.close();
        res.json({ message: "product created" })
    } catch (error) {
        console.log('error')
        console.log(error)
    }


})
router.get('/grocery', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let users = await db.collection("grocery").find({}).toArray();
        res.json(users);
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})

router.post('/mobiles', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        await db.collection('mobiles').insertOne(req.body);
        connection.close();
        res.json({ message: "product created" })
    } catch (error) {
        console.log('error')
        console.log(error)
    }


})
router.get('/mobiles', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let users = await db.collection("mobiles").find({}).toArray();
        res.json(users);
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})


router.post('/fashion', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        await db.collection('fashion').insertOne(req.body);
        connection.close();
        res.json({ message: "product created" })
    } catch (error) {
        console.log('error')
        console.log(error)
    }


})
router.get('/fashion', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let users = await db.collection("fashion").find({}).toArray();
        res.json(users);
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})
  
router.post('/electronics', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        await db.collection('electronics').insertOne(req.body);
        connection.close();
        res.json({ message: "product created" })
    } catch (error) {
        console.log('error')
        console.log(error)
    }


})

router.get('/electronics', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let users = await db.collection("electronics").find({}).toArray();
        res.json(users);
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})

router.post('/furniture', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        await db.collection('furniture').insertOne(req.body);
        connection.close();
        res.json({ message: "product created" })
    } catch (error) {
        console.log('error')
        console.log(error)
    }


})


router.get('/furniture', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let users = await db.collection("furniture").find({}).toArray();
        res.json(users);
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;