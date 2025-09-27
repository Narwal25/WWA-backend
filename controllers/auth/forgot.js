const User = require("../../model/User");
const adminMail = process.env.ADMIN_MAIL;

async function ForgotPassword(req, res) {
  const { email, password, cpassword } = req.body;

  if (!email || !password || !cpassword) {
    return res.status(422), res.json({ message: 'Please fill all fields' });
  }

  if (password !== cpassword) {
    return res.status(422), res.json({ message: 'Passwords do not match' });
  }
    
  if (email == adminMail) {
        return res.status(403), res.json({ message: 'Not Allowed' });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400), res.json({ message: 'Email not found' });
    }

    user.password = password;
    await user.save();
    res.status(200), res.json({ message: 'Password changed successfully' })

  }
  catch (err) {
    console.error(err);
    res.status(500), res.json({ message: 'Internal Server Error' });
  }

}

module.exports = ForgotPassword;