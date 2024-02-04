const Booking = require("../../model/Booking");
const adminMail = process.env.ADMIN_MAIL;

async function EditBookings(req, res) {
    const { user, booking } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        const email = req.session.user.email;

        if (email != adminMail || !req.session.isAdmin) {
            return res.status(400), res.json({ message: "Unauthorized" });
        }
    } catch (err) {
        return res.status(400), res.json({ message: "Unauthorized"});
    }

    if (!user.name || !user.email || !user.address || !user.contact) {
        return res.status(400), res.json({ message: 'Please fill all fields' });
    }

    if (!emailRegex.test(user.email)) {
        return res.status(422), res.json({ message: 'Invalid email format' });
    }

    if (4 > user.contact.length || user.contact.length > 15) {
        return res.status(422), res.json({ message: 'Invalid contact'})
    }

    if (user.adult === 0 && user.children === 0) {
        return res.status(400), res.json({ message: 'Select atleast one Visitor' });
    }

    try {

        const bookingpre = await Booking.findOne({ bookingnumber: booking.bookingnumber });
        bookingpre.name = user.name;
        bookingpre.email = user.email;
        bookingpre.contact = user.contact;
        bookingpre.address = user.address;
        bookingpre.date = user.date;
        bookingpre.adult = user.adult;
        bookingpre.children = user.children;
        await bookingpre.save();

        res.status(200), res.json({ message: "Booking Update Successful" });
    } catch (err) {
        console.error(err);
        res.status(500), res.json({ message: 'Internal Server Error' });
    }
}

module.exports = EditBookings;