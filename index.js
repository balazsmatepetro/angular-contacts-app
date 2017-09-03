const EXPRESS = require('express');
const APP = EXPRESS();

APP.use('/data', EXPRESS.static(__dirname + '/data'));
APP.use('/dist', EXPRESS.static(__dirname + '/dist'));
APP.use('/node_modules', EXPRESS.static(__dirname + '/node_modules'));

APP.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

APP.listen(3000);
