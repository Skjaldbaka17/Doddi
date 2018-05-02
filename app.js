const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');
const path = require('path');
const router = require('./router');
const readdirAsync = util.promisify(fs.readdir);
const readFileAsync = util.promisify(fs.readFile);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));

app.use('/', router);

//Ef síðan er ekki til.
function notFoundHandler(req, res, next) { // eslint-disable-line
    const title = 'Fannst ekki';
    const message = 'Sorry, this page is currently under construction.';
    res.status(404).render('error', {message });
  }
  
  /*Ef upp kemur villa. Hinsvegar væri hægt að gera betur með því að 
    gefa upp meiri upplýsingar með status-kóðanum (default hér 500)*/
  function errorHandler(err, req, res, next) { // eslint-disable-line
    console.error(err);
    const title = 'Villa kom upp';
    const message = '';
    res.status(500).render('error', { message });
  }

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}/`);
});





