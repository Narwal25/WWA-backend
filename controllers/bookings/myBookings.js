const Booking = require("../../model/Booking");
const GetBookingList = require("./getBookingList");

async function MyBookings(req, res) {
    try {
        const email = req.session.user.email;

        if (!email) {
            return res.status(422), res.json({ message: "No booking for this Email" });
        }
    } catch (err) {
        return res.status(400), res.json({ message: "Unautherized"});
    }

    try {
        const email = req.session.user.email;
        const bookings = await Booking.find({ email: email });

        if (bookings.length === 0) {
            return res.status(400), res.json({ message: 'No Booking with this email.' });
        }

        const bookingslist = GetBookingList({ bookings });
        res.status(200), res.json({ message: 'Booking Found', bookings: bookingslist });

    }
    catch (err) {
        console.error(err);
        res.status(500), res.json({ message: 'Internal Server Error' });
    }
}

module.exports = MyBookings;