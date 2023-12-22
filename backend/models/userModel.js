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

// Adding a method to the user schema to compare entered password with the stored hashed password
userSchema.methods.matchPasswords = async function(enteredPassword) {
  // 'enteredPassword' is the password provided by the user during login
  // 'this.password' refers to the hashed password stored in the user document's 'password' field
  // Using 'bcrypt.compare' to compare the entered password with the stored hashed password asynchronously
  // 'bcrypt.compare' returns a promise, hence the 'async' function and 'await' keyword is used
  return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model('User', userSchema)

export default User