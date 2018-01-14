var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = "mongodb://localhost:27017/netschool";

mongoose.connection.on('connecting', function() {
    console.log('connecting to MongoDB...');
});

mongoose.connection.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
mongoose.connection.on('connected', function() {
    console.log('MongoDB connected!');
});
mongoose.connection.once('open', function() {
    console.log('MongoDB connection opened!');
});
mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});


mongoose.connect(uri, {
        useMongoClient: true,
        connectTimeoutMS: 3000
    }, function (err) {
        if (err) return handleError(err);
    }
);


exports.mongoose = mongoose;