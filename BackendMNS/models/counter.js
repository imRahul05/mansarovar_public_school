// models/counter.js
import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true, // one counter per role
  },
  count: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model('Counter', counterSchema);
export default Counter;
