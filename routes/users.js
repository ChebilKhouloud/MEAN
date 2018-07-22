const express = require('express');
//utiliser get wel post mta3 router mta3 express
const router = express.Router();
//user mta3 schema
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//login
// ',' utilisé f west objet entre {} w ';' bin star w star
//next utiliser bch maysirech bloquage w yet3ada lel url eli ba3dou
//ki ya3mel login ygenerilou token
router.post('/auth', (req, res, next) => {
    // res.send('I am a login');
    const email = req.body.email;
    const password = req.body.password;
    // email wa7da mta3 base 3alisar w lo5ra front
    const query = { email: email };
    //b table User ne5dem declaré l fou9
    //lawajli 3al email eli jey mel front
    //findone awel we7ed fel base yal9ah yafichihh
    User.findOne(query, (err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error, please try again ' //problem fel fonction
            });
        }
        if (!user) {
            return res.send({
                success: false,
                message: 'error, account not found ' //pas e user 
            })
        }
        user.isPasswordMatch(password, user.password, (err, isMatch) => {
            if (!isMatch) {
                return res.send({
                    success: false,
                    message: 'invalide password'
                });
            }
            const ONE_WEEK = 604800;
            const token = jwt.sign({ user }, process.env.SECRET, { expiresIn : ONE_WEEK });
            //bch manraja3ch bel password el objet user
            let returnUser = {
                name: user.name,
                email: user.email,
                id: user._id
            }


            return res.send({
                success: true,
                message: 'you can login now',//user existe
                user: returnUser,
                token
            });
        });
    });
});

//register
router.post('/register', (req, res, next) => {
    // res.send('I am a register');
    let newUser = new User({
        //bch na9ra el contenu eli jeni mel front
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    //bch nsajlou el user  mte3na fel base avec save (insert)
    newUser.save((err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'failed to save '
            });
        }//user == user: user el user declaré deja f save
        res.send({
            success: true,
            message: 'user saved',
            user
        });
    });

});

//bch les url eli 3malthom lehné najem nesta3malhom el bara
module.exports = router;