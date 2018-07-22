
require('dotenv').config();

console.log(process.env.DATABASE)
//installation fel partie serveur
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); 
const cors = require('cors');
const path = require('path');   
//declaration
const app = express();

//les routes declareer fel users rani bch nesta3malhom fel vables UserRoutes eli lehné
const UserRoutes = require ('./routes/users');
const TodoLists = require ('./routes/tasks');

//declaration de la vble _port 
//.env mesure de securité
const _PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connection a la base
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true } );
mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});
mongoose.connection.on('error', (err) => {
    console.log('Unable to connect to the database ' + err);
});


app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.send('yes ')

});


app.use('/tasks', TodoLists);

//connecter au port 
// console.log('listen on port 3000');

//url mte3na eli bech nesta3mlouh
        
app.use('/users',UserRoutes);
app.listen(_PORT,() => {

    console.log('server started in port', _PORT)
});

























// app.get('/', function (req, res) {
//     res.send('<b>My</b> first express http server');
// });

// app.use(function(req, res, next) {
//     res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
// });

// app.listen(8080, function () {
//     console.log('Example app listening on port 8080.');
// });