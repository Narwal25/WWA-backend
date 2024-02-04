function AdminLogout(req, res) {
    try {
        req.session.destroy();
        res.status(200), res.json({ message: 'Logout successful' });
    }
    catch (error) {
        res.status(500), res.json({ message: 'Internal Server Error' });
    }
}

module.exports = AdminLogout;