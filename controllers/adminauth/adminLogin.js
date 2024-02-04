const User = require('../../model/User');
const bcrypt = require('bcrypt');
const adminMail = process.env.ADMIN_MAIL;

async function AdminLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422), res.json({ message: 'Please fill all fields' });
    }

    if (email != adminMail) {
        return res.status(400), res.json({ message: 'Invalid Credentials' });
    }

    try {

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400), res.json({ message: 'Invalid Credentials' });
        }

        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {
            return res.status(400), res.json({ message: "Invalid Credentials" });
        }

       req.session.user = user;
       req.session.isAdmin = true;
        res.status(200), res.json({ message: 'Login Succesful' });

    }
    catch (err) {
        console.error(err);
        res.status(500), res.json({ message: 'Internal Server Error' });
    }

}

module.exports = AdminLogin;