const express = require('express');
const mongoose = require("mongoose");
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config()


require('dotenv').config();
const app = express();
const port =  process.env.PORT || 5000

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
// app.use("/api/users", require("./routes/userRoutes"))
app.use('/api/users', require("./routes/userRoutes"))
app.use(errorHandler)



mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('connected to mongodb')
    app.listen(port, () => {
        console.log(`Server running on Port ${port}`)
    })
})
.catch((err) =>{
    console.log(err)
})