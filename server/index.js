import dotenv from 'dotenv';
dotenv.config();

const port = 4000;
import express from 'express';
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";

// today 12 march
import { fileURLToPath } from 'url';

// resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname);

app.use(express.json());
app.use(cors());

// Use the client app
app.use(express.static(path.join(__dirname, 'client/build')))

// Render client for any path
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'client/build', 'index.html')));

// Database Connection with MongoDb after write below link mongodb is connected with our express server
mongoose.connect(process.env.DB_URI, { dbName: "E-Commerce1" })
    .then(() => {
        console.log("Connected to DB Successfully")
    })


// 2. API Creation 

app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// 3. Image Storage Engine using multer

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}.${path.extname(file.originalname)}`)
    }
})  // now the disk storage is configured

// 4. now using milter we will create one upload function and in that one we will pass this configuration

const upload = multer({ storage: storage })

// after that we will create one endpoint using that we can upload the image
// creating upload endpoint for images

app.use('/images', express.static('upload/images'))   // ./images is static endpoint

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// 5 create endpoint using that we can add the product in our mongodb atlas database. we upload any object in mongodb database before that we have to create one schema using mongose library

// 5. Schema for creating Products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        require: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },

})  // now we will use this schema to add the product in our database

// 6. create  a endpoint with the name of add product

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({}); // using that we will get all the products in one array and we can access that using this product

    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    // now to save the product in database use await whenever we save any product in database that will take some time that's why we using await
    await product.save();
    console.log("Saved");

    // now to generate the response for the frontend we use response.json method
    res.json({
        success: true,
        name: req.body.name,
    })
})

// 7. Creating API for deleting Products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// 8. Creating API for getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched")
    res.send(products)
})

// 9. Schema creating for user model

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    data: {
        type: Date,
        default: Date.now,
    }

})

// 10 Creating Endpoint for registering the user

app.post('/signup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ succes: false, errors: "existing user found with same email id address" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ succes: true, token })
})

// 11. Creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" })
    }
})

// 12. Creating endpoint for newcollection data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched")
    res.send(newcollection);
})

// 13. creatin endpoint for popular in women category

app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

// 15. creating middlware to fetch data

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        console.log("User data set:", req.user);
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
}


// 14. creating endpoint for adding products in cartdata

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true });
})



// 15. creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed")
})

// 16 creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData);
})

// 1. our express app will be started on this below port now above create a api 

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port" + port)
    }
    else {
        console.log("Error : " + error)
    }
})