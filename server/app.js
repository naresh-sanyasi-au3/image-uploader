const express = require("express");
const app = express();
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000

// app.use(cors());


mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

const Schema = mongoose.Schema;
const imageSchema = new Schema({
    filename: {
        type: Array,
        require: true,
    },
},
    {
        timestamps: true,
    });

const Image = mongoose.model("Image", imageSchema);



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const uploadImage = multer({ storage: storage });


app.get('/uploads', (req, res)=>{
    Image.find()
    .then(image => res.json(image))
    .catch(err => res.status(400).json('error: ' + err));
});

app.post('/uploads', uploadImage.array('image', 25), function (req, res, next) {
    console.log(req.files)
    const filename = req.files;

    const newImage = new Image({filename});

    newImage.save()
        .then(() => res.json('image uploaded'))
        .catch(err => res.status(400).json('error: ' + err));
        console.log("image uploaded: " + newImage)
});

app.use(express.static('client/build'));
const path = require('path');
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
});



app.listen(port, () => {
    console.log(`app is running on ${port}`);
});