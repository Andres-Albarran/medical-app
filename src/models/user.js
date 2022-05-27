const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const usuarioSchema = new Schema({
  image: {
    type: String,
    default: "usuario.png"
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  number: {
    type: String,
    require: true
  },
  slug: { type: String, slug: "image" },
slug2: { type: String, slug: "name" },
slug3: { type: String, slug: "password" },
slug4: { type: String, slug: "number" },
},
{
  timestamps: true
});

usuarioSchema.methods.encrypt = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

usuarioSchema.methods.comparar = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('usuario', usuarioSchema, "usuarios")