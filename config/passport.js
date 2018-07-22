const JwtStrategy = require ('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const User = require ('../models/user');
module.exports = function(passport){
    //objet option
    let opts ={};
    //token == code key //bearer stratagy
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;

    passport.use(new JwtStrategy(opts,(jwt_payload,done) => {

        User.findById(jwt_payload.user._id,(err,user) => {
            if (err){
                return done(err,false);
            }
            if(user){
                return done (null,user);
            }
        });
    }));

}