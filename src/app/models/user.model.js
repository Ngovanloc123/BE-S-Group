import mongoose from "mongoose";


const Schema = mongoose.Schema;

const Users = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    min: 18, 
    index: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    minLength: 8, 
    required: true 
  }
}, {
  timestamps: true,
}
);


const UserModel = mongoose.model('User', Users);


export default UserModel;
