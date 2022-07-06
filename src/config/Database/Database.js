const mongoose = require("mongoose");

mongoose.connect(
    // "mongodb+srv://himanshu:12345@cluster0.dfvv7lg.mongodb.net/?retryWrites=true&w=majority",
    "mongodb+srv://himanshu:12345@cluster0.dfvv7lg.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

let dbConnection = mongoose.connection;
dbConnection.on('connected', function () {
    console.log('database is connected successfully');
});
dbConnection.on('disconnected', function () {
    console.log('database is disconnected successfully');
})
dbConnection.on('error', console.error.bind(console, 'connection error:'));
module.exports = dbConnection;