const mongoose = require('mongoose');

let productoSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true

},
precio:{
    type: String,
    required: true
}
});

const productoModel = mongoose.model('ProductoSchema', productoSchema, 'producto');
module.exports = productoModel;