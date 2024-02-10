require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./SocketServer.js');

const app = express();

// app.use(express.json());

//express does not know how to access data from request so initially there was a library called bodyparser but there is other way 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const http = require('http').createServer(app);
const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//     console.log("socket done");
//     SocketServer(socket);
// })


app.use('/api', require('./routes/authRouter.js'));
app.use('/api', require('./routes/userRouter.js'));
app.use('/api', require('./routes/PostRouter.js'));
app.use('/api', require('./routes/commentRouter.js'));
app.use('/api', require('./routes/messageRouter.js'));


const URI = process.env.MONGODB_URL;

//connection with mongoDB

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    throw err;
});

//server started

const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port', port);
});
