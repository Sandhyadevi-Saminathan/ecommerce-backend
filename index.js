const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const dotenv = require("dotenv").config();
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
const password = process.env.password;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const rn = require('random-number');
const mongoose = require('mongoose');
const multer = require('multer');
const client = new mongoClient(URL); 



app.use(express.json());

app.use(cors({
        origin: "*"
    }))

// Connect to MongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product model
const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageURL: String,
  })
);

// Route to add a product

app.post('/general-products', async function (req, res) {
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
app.get('/general-products', async function (req, res) {
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

app.post('/grocery', async function (req, res) {
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
app.get('/grocery', async function (req, res) {
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

app.post('/mobiles', async function (req, res) {
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
app.get('/mobiles', async function (req, res) {
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


app.post('/fashion', async function (req, res) {
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
app.get('/fashion', async function (req, res) {
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
  
app.post('/electronics', async function (req, res) {
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
app.get('/electronics', async function (req, res) {
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

app.post('/furniture', async function (req, res) {
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
app.get('/furniture', async function (req, res) {
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

app.listen(8000, () => {
  console.log('Server running on port 3000');
});





// 



// const options = {
//     min: 1000,
//     max: 9999,
//     integer: true
// }
// const secret = process.env.SECRET;
// app.use(express.json());


// // Multer setup for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const imageSchema = new mongoose.Schema({
//     name: String,
//     contentType: String,
//     data: Buffer,
//   });
//   const Image = mongoose.model('Image', imageSchema);

//   app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).send('No file uploaded');
//       }
  
//       const image = new Image({
//         name: req.file.originalname,
//         contentType: req.file.mimetype,
//         data: req.file.buffer,
//       });
  
//       await image.save();
//       res.send('Image uploaded successfully');
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).send('Error uploading image');
//     }
//   });
  







// const authorize = (req, res, next) => {
//     if (req.headers.authorization) {
//         try {
//             const verify = jwt.verify(req.headers.authorization, secret);
//             if (verify) {
//                 next();
//             }
//         } catch (error) {
//             res.status(401).json({ message: "Unauthorized" });
//         }
//     } else {
//         res.status(401).json({ message: "Unauthorized" });
//     }
// }







// //for registration
// app.post('/register', async (req, res) => {

//     try {

//         let connection = await mongoClient.connect(URL);
//         let db = connection.db('ecomm');
//         const collection = db.collection("register")
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(req.body.password, salt);
//         req.body.password = hash;
//         const operations = await collection.insertOne({ ...req.body, isDeleted: false })
//         await connection.close();
//         res.json({ message: "customer created" })
//     } catch (error) {
//         // console.log('customer error')
//         console.log(error)
//     }

// })




// //for login
// app.post('/login', async (req, res) => {
//     try {
//         let connection = await mongoClient.connect(URL);
//         let db = connection.db('ecomm');
//         const collection = db.collection("register");
//         const user = await collection.findOne({ email: req.body.email });

//         if (user) {
//             let passwordResult = await bcrypt.compare(req.body.password, user.password);
//             if (passwordResult) {
//                 const token = jwt.sign({ userid: user._id }, secret, { expiresIn: '1h' })
//                 console.log(token)
//                 console.log(user)
//                 res.json({ message: "Login Success", token, user })

//             }
//             else {
//                 res.status.apply(401).json({ message: "Email id or password do not match" })
//             }
//         } else {
//             res.status(401).json({ message: "Email id or password donot match" });
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })





// //app.listen(8000)
// app.listen(process.env.PORT || 8000);