const User = require("../../model/User");

async function Signup(req, res) {

  const { firstname, lastname, email, password, cpassword } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstname || !lastname || !email || !password || !cpassword) {
    return res.status(422), res.json({ message: 'please fill all fields' });
  }

  if (!emailRegex.test(email)) {
    return res.status(422).json({ message: 'Invalid email format' });
  }
  if (password.length < 8) {
    return res.status(422), res.json({ message: 'password should be atleast 8 character long' });
  }

  if (password !== cpassword) {
    return res.status(422), res.json({ message: 'Passwords do not match' });
  }

  try {

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400), res.json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({ firstname, lastname, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201);
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: 'Internal Server Error' });
  }
}

module.exports = Signup;