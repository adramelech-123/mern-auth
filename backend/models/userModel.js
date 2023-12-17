import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// The following middleware intercepts the 'save' operation on a Mongoose schema, checks if the 'password' field has been modified, and if so, hashes the password before allowing the document to be saved in the database. 

// Middleware function triggered before saving a document in the userSchema
userSchema.pre('save', async function (next) {
  // Check if the 'password' field has been modified; if not, move to the next middleware or operation
  if (!this.isModified('password')) {
    next();
  }

  // If the 'password' field has been modified:
  // Generate a salt using bcrypt with a cost factor of 10
  const salt = await bcrypt.genSalt(10);

  // Hash the password using bcrypt and the generated salt
  this.password = await bcrypt.hash(this.password, salt);

  // Proceed to the next middleware or save operation
  next();
})

const User = mongoose.model('User', userSchema)

export default User