const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const presSchema = new mongoose.Schema({
  patient: {
    type: String
  },
  title: {
    type: String
  },
  date: {
    type: String
  },
  prescription: {
    type: String
  },

  slug: { type: String, slug: "patient" },
slug1: { type: String, slug: "date" },
slug2: { type: String, slug: "prescription" }
}, {
  timestamps: true
});

module.exports = mongoose.model('Prescription', presSchema, 'prescriptions')
