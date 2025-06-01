const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()
const carRoutes=require('../../backend/routes/carRoutes')

const app=express();

app.use(cors())
app.use(express.json());

app.use('/api', carRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}/api/cars`);
    });
}).catch((error) => {
    console.error('MongoDB connection failed:', error.message);
});