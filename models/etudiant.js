
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const Etudiant = new Schema({
    CIN: Number,
    Nom: String,
    Prenom: String,
    NTelephone: Number
  });


