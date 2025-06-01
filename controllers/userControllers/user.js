const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const SECRET = 'yourSecretKey'; // Move this to .env in production
const car=require('../../models/Car')

// Register user
exports.addUser = async (req, res) => {
  try {
    const { name,image, email, phone, password } = req.body;

    // Optional: check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const newUser = new User({ name, email, phone, password ,image});
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error in addUser:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password != password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error. Could not delete user." });
  }
};

exports.carsDelete=async(req,res)=>{
  const {id}=req.params
  try {
     const deletedcar = await car.findByIdAndDelete(id);
     if(!deletedcar){
         return res.status(404).json({ message: "car not found." });
     }
        res.status(200).json({ message: "car deleted successfully." });
    
  } catch (error) {
       console.error("Error deleting car:", error);
    res.status(500).json({ message: "Server error. Could not delete car." });
  }

}
