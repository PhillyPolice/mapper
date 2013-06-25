var express = require('express'),
	path = require('path');

var app = express();

// app.get('/', function (req, res) {
// res.redirect(301, '//s3.amazonaws.com/phillycm/index.html');
// });

// app.get(/^\/(images|scripts|styles|)\/.*/, function (req, res) {
// res.redirect(301, '//s3.amazonaws.com/phillycm' + req.path);
// });

app.use('/scripts', express.static(path.join(__dirname, 'app/scripts')));
app.use('/styles', express.static(path.join(__dirname, 'app/styles')));

app.get('/', function (req, res) {
	res.sendfile('app/index.html');
});

app.listen(3000);
console.log('Express server listening on port 3000');