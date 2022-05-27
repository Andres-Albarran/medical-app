const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const consultSchema = new mongoose.Schema({
  image: {
    type: String
  },
  author: {
    type: String
  },
  
  number: {
    type: String
  },

  slug: { type: String, slug: "patientImage" },
slug2: { type: String, slug: "patient" },
slug3: { type: String, slug: "patientNumber" }
}, {
  timestamps: true
});

module.exports = mongoose.model('consulta', consultSchema, 'consultas')