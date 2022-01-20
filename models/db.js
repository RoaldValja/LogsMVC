const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/logsUserDB', {useUnifiedTopology: true});
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true});

require('./user');