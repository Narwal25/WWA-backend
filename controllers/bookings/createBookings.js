const Booking = require("../../model/Booking");

async function CreateBookings(req, res) {

    const { userDetails, selectedAdventures } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userDetails.name || !userDetails.email || !userDetails.address || !userDetails.contact || !userDetails.date) {
        return res.status(422), res.json({ message: 'Please fill all fields' });
    }

    if (!emailRegex.test(userDetails.email)) {
        return res.status(422), res.json({ message: 'Invalid email format' });
    }

    if (4 > userDetails.contact.length || userDetails.contact.length > 15) {
        return res.status(422), res.json({ message: 'Invalid contact'})
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

module.exports = CreateBookings;