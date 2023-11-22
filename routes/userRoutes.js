const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
const secret = process.env.SECRET;
const password = process.env.password;
const rn = require('random-number');
const nodemailer = require('nodemailer');


const options = {
    min: 1000,
    max: 9999,
    integer: true
}

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
//for registration
router.post('/register', async (req, res) => {

    try {

        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        const collection = db.collection("register")
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const operations = await collection.insertOne({ ...req.body, isDeleted: false })
        await connection.close();
        res.json({ message: "customer created" })
    } catch (error) {
        // console.log('customer error')
        console.log(error)
    }

})

//for login
router.post('/login', async (req, res) => {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        const collection = db.collection("register");
        const user = await collection.findOne({ email: req.body.email });

        if (user) {
            let passwordResult = await bcrypt.compare(req.body.password, user.password);
            if (passwordResult) {
                const token = jwt.sign({ userid: user._id }, secret, { expiresIn: '1h' })
                console.log(token)
                console.log(user)
                res.json({ message: "Login Success", token, user })

            }
            else {
                res.json({ message: "Email id or password do not match" })

            }
        } else {
            res.json({ message: "Email id or password do not match" })

        }
    } catch (error) {
        console.log(error)
    }
})

//for profile
router.get('/user/:id', authorize, async (req, res) => {


    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let objId = new mongodb.ObjectId(req.params.id)
        let users = await db.collection("register").findOne({ _id: objId });
        res.json(users);
        await connection.close()
    } catch (error) {
        console.log('User Not Found')
        console.log(req.params.id)
        console.log(error)
    }
})
//forgot password
router.post('/mail', async function (req, res) {

    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let user = await db.collection("register").findOne({ email: req.body.email });
        res.json(user)
        if (user) {
            let randomnum = rn(options)
            await db.collection('register').updateOne({ email: req.body.email }, { $set: { rnum: randomnum } });
            var sender = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                secure: false,
                auth: {
                    user: 'sandhyadevi0229@gmail.com',
                    pass: password
                }
            });

            var composemail = {
                from: "sandhyadevi0229@gmail.com",
                to: `${req.body.email}`,
                subject: 'send mail using node js',
                text: `${randomnum}`,


            };

            sender.sendMail(composemail, function (error, info) {
                if (error) {
                    console.log(error);
                    res.json({
                        message: "Error"
                    })
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({
                        message: "Email sent"
                    })
                }
            });
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }
    }
    catch (err) {
        console.log(err)
    }


})

//verification
router.post('/verification/:id', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('ecomm');
        let objId = new mongodb.ObjectId(req.params.id)
        let user = await db.collection('register').findOne({ _id: objId });
        if (user.rnum == req.body.vercode) {
            res.status(200).json(user)
        }
        else {
            res.status(400).json({ message: "Invalid Verification Code" })
        }
    }
    catch (error) {
        console.log(error)
    }
})


//Update Password
router.post('/ChangePassword/:id', async function (req, res) {
    try {

        const connection = await mongoClient.connect(URL);
        const db = connection.db('ecomm');
        let objId = new mongodb.ObjectId(req.params.id)
        const salt = await bcrypt.genSalt(10);
       
        const hash = await bcrypt.hash(req.body.password1, salt);
      
        req.body.password1 = hash;
        let user = await db.collection('register').findOneAndUpdate({ _id: objId }, { $set: { "password": req.body.password1 } })
        console.log(user)
     let users=  await db.collection('register').findOneAndUpdate({ _id: objId }, { $unset: { "rnum": 1 } });
    await   db.collection('register').findOneAndUpdate({ _id: objId }, { $unset: { "password1": 1 } });
 await   db.collection('register').findOneAndUpdate({ _id: objId }, { $unset: { "password2": 1 } });
     
        await connection.close();
        res.json({ message: "Password updated successfully" })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;