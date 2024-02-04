// /middleware/authenticate.js
const Authenticate = async (req, res, next) => {
    try {

        const user = req.session.user;
        if (!user) { throw new Error("Couldn't find User") }
        req.email = user.email;
        req.token = req.sessionID;
        next();


    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

module.exports = Authenticate;