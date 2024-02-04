const Booking = require("../../model/Booking");
const GetBookingList = require("./getBookingList");
const adminMail = process.env.ADMIN_MAIL;

async function AllBookings(req, res) {

    try {
        const email = req.session.user.email;

        if (!email || email != adminMail || !req.session.isAdmin) {
            return res.status(400), res.json({ message: "Unautherized" });
        }
    } catch (err) {
        return res.status(400), res.json({ message: "Unautherized"});
    }

    try {
        
        const bookings = await Booking.find();

        if (bookings.length === 0) {
            return res.status(400), res.json({ message: 'No Bookings yet' });
        }

        const bookingslist = GetBookingList({ bookings });
        res.status(200), res.json({ message: 'Booking Found', bookings: bookingslist });

    }
    catch (err) {
        console.error(err);
        res.status(500), res.json({ message: 'Internal Server Error' });
    }
}

module.exports = AllBookings;