const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://vinicius:30302524@cluster0-dpzfz.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);