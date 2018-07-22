const express = require('express');
//utiliser get wel post mta3 router mta3 express
const router = express.Router();
//task mta3 schema
const Task = require ('../models/task');
const passport = require ('passport');

//ajouter a task
//n'ajouter pas un task si n'est pas authauriser par jwt
router.post('/add',passport.authenticate('jwt', {session : false}),(req,res,next) => {
 let task = new Task({
  name : req.body.name,
  done : req.body.done,
  owner : req.body.owner
 });

 task.save((err,task)=> {
    if(err){
        return res.send({
            success : false,
            message : 'error while saving'
        });
    }
    return res.send({
        success:true,
        task,
        message : 'task saved'
    });

 });
});
//afficher les tasks d'un owner
router.post('/list',passport.authenticate('jwt', {session : false}),(req,res) => {
const owner = req.body.owner;
//find all tous y7otha f tasks 
//owner hiya nafsha owner : owner
Task.find({owner}, (err,tasks)=>{
    if(err){
        return res.send({
            success:false,
            message: 'error while receiving tasks' 
        });
    }
    //== : type valeur ===:type bark
    if(tasks==""){
        return res.send({
            success:false,
            message: 'you have no tasks yet' //pas de tasks
        });
    }
    return res.send({
        success:true, //jibli tasks
        tasks
    });
});

});
//delete
//:id eli bech nfas5ouh mel base
router.delete('/remove/:id', (req,res)=> {
    const taskId = req.params.id;
    //fi objet {---}
    Task.remove({_id:taskId},(err) => {
      if (err){
          return res.send({
              success : false ,
              message:'failed to delete the task'
          });
      }
      return res.send({
          success :true,
          message:'deleted task'
      });
    });

});



module.exports = router;