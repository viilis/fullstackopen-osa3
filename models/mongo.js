const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    minlength: 3,
    required: [true, 'name is required'],
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, 'number is required'],
    unique: true,
  },
}).plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
