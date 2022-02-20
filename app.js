require('dotenv').config({path: './config.env'});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')


//my Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const stripeRoutes = require('./routes/stripepayment');
const { application } = require('express');

//DB Connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then(()=>{console.log("DB CONNECTED")}).catch(err => console.log( err ));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


const port = process.env.PORT || 8080;

app.use('/api',authRoute);
app.use('/api',userRoute);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',stripeRoutes);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) =>{
        res.send("Api Running")
    });
    
}

app.listen(port,()=>console.log(`App is running at ${port}`));
