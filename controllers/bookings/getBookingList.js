const GetBookingList = ({ bookings }) => {

    const bookingslist = bookings.flatMap(booking => {
        const adventures = Object.keys(booking.adventures).flatMap(parkName => {
            return booking.adventures[parkName].map(adventureName => ({
                address: booking.address,
                adult: booking.adult,
                children: booking.children,
                email: booking.email,
                name: booking.name,
                contact: booking.contact,
                date: booking.date,
                bookingnumber: booking.bookingnumber,
                park: parkName,
                adventure: adventureName,
            }));
        });

        return adventures;
    });

    return bookingslist;
}

module.exports = GetBookingList;