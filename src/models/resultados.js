const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const resultSchema = new mongoose.Schema({
    patientName: {
      type: String
    },
    title: {
      type: String
    },
    prescription: {
        type: String,
    },
    date: { 
      type: String
    },
    slug: { type: String, slug: "patientImage" },
    slug2: { type: String, slug: "patient" },
    slug3: { type: String, slug: "patientpatientNumber" },
    slug4: { type: String, slug: "date" }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('resultado', resultSchema, 'resultados')