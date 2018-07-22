const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
//declaration de schema user les champs 
const UserSchema = mongoose.Schema ({
   name : String ,
   email: { type : String , required : true},
   password : { type : String , required : true}
});

//pre 9bal ma yetsajel el password bch yetsajel hasher
UserSchema.pre('save',function(next){
  if (!this.isModified('password')){
      return next();
  }
  //generate salt value
  // 10 sous format  caratcter
 bcrypt.genSalt(10,(err,salt) => {
     if (err){
         return next(err);
     }
     //Longueur de sel (salt) à générer ou à utiliser, par défaut à 10
     bcrypt.hash(this.password,salt,(err,hash) => {
         if(err){
             return next(err);
         }
         this.password =hash;
        next();
        })
 })

})

UserSchema.methods.isPasswordMatch = function (plainPassword, hashed,callBack){
    bcrypt.compare(plainPassword,hashed,(err,isMatch) => {
        if(err){
            next(err);
        }
        callBack(null,isMatch);
    });
}

//schema from mongoose l'exportation
const User = mongoose.model('User',UserSchema);
module.exports = User;