
import User from '../models/userModel.js';

 

// Register
  const resgisterUser =  async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ email, password });
    await user.save();



    const token = user.generateAuthToken();

// Set the cookie with the token
res.cookie('authToken', token, {
  httpOnly: true, // Helps prevent XSS attacks
  secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS only in production
  maxAge: 3600000 // 1 hour
});

    res.json({msg:"user registered successfully " ,  token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




// Login
 const loginUser =  async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
console.log(password)

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.json({msg:"login successfully !!" , token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export  {resgisterUser , loginUser };
