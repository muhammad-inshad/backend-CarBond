const Admin = require('../../models/admin');
const user=require('../../models/user')
const jwt = require('jsonwebtoken');
const SECRET = 'yourSecretKey'; // You should use process.env.SECRET in production

exports.AdminLogin = async (req, res) => {
  try {
    const { name, password } = req.body;

    // 1. Check if admin exists
    const admin = await Admin.findOne();


console.log(req.body)
    console.log(admin)
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // 2. Check password
    if (admin.password != password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: admin._id, name: admin.name },
      SECRET,
      { expiresIn: '1d' }
    );

    // 4. Success response
    res.status(200).json({ message: 'Login successful', token, admin });

  } catch (err) {
    console.error('❌ Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.showUser = async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json(data); // Return user data as JSON
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
};

