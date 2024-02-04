const Booking = require("../../model/Booking");
const adminMail = process.env.ADMIN_MAIL;

async function DeleteBookings(req, res) {
    const { booking } = req.body;

    try {
        const email = req.session.user.email;

        if (email != adminMail || !req.session.isAdmin) {
            return res.status(400), res.json({ message: 'Unauthorized' });
        }
    } catch (err) {
        return res.status(400), res.json({ message: "Unauthorized"});
    }

    try {

        const bookingpre = await Booking.findOne({ bookingnumber: booking.bookingnumber });
        bookingpre.adventures[booking.park] = bookingpre.adventures[booking.park].filter((a) => a !== booking.adventure);

        await bookingpre.save();

        res.status(200), res.json({ message: "Booking Delete Successful" });
    }
    catch (err) {
        console.error(err); const Booking = require("../model/Booking");


        async function AdminBookTicketController(req, res) {

            const { userDetails, selectedAdventures } = req.body;

            if (!userDetails.name || !userDetails.email || !userDetails.address || !userDetails.contact || !userDetails.date) {
                return res.status(422), res.json({ message: 'Please fill all fields' });
            }

            if (userDetails.adult === 0 && userDetails.children === 0) {
                return res.status(422), res.json({ message: 'Select atleast one Visitor' });
            }

            const totalbooking = await Booking.countDocuments({}, { hint: "_id_" });
            const bookingnumber = "WWA" + 10000 + totalbooking;
            const newBookingData = {
                ...userDetails,
                bookingnumber: bookingnumber,
                adventures: {
                    ...selectedAdventures,
                },
            };

            try {

                const newBooking = new Booking(newBookingData);
                const response = await newBooking.save();

                res.status(201), res.json({ message: 'Booking successfully', bookingnumber: bookingnumber });

            } catch (error) {
                console.log(error);
                res.status(500), res.json({ message: 'Internal Server Error' });
            }
        }






        module.exports = { AdminBookTicketController, AdminBookingsController, AdminEditTicketController, AdminDeleteBookingController }
        res.status(500), res.json({ message: 'Internal Server Error' });
    }

}

module.exports = DeleteBookings;