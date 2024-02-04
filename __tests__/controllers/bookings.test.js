const CreateBookings = require('../../controllers/bookings/createBookings');
const MyBookings = require('../../controllers/bookings/myBookings');
const AllBookings = require('../../controllers/bookings/allBookings');
const Booking = require("../../model/Booking");

let request, response;

jest.mock("../../model/Booking");

beforeEach(() => {
    request = {
        body: {
            email: "email",
            userDetails: {
                name: "firstname",
                email: "email",
                address: "address",
                contact: 1234567890,
                date: "2020-02-02",
                adult: 1,
                children: 1
            },
            selectedAdventures: {
                Thrillville: [],
            }

        },
        session: {
            user:{
                email: "email@email.com",
            },
            isAdmin: false
        }
    }
    response = {
        status: jest.fn((x) => x),
        json: jest.fn((x) => x),
    };
})


describe('Ticket Booking Routes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.userDetails.email = undefined;
        result = await CreateBookings(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if number of visitors is Zero", async () => {
        request.body.userDetails.adult = 0;
        request.body.userDetails.children = 0;
        result = await CreateBookings(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

});

describe('View Bookings Routes', () => {

    it("Should return status 422 if User is not looged in ", async () => {
        request.session.user.email = undefined;
        result = await MyBookings(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });
    
    it("Should return status 400 if No Booking Found", async () => {
        Booking.find.mockImplementationOnce(() => ([]));
        result = await MyBookings(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    })

});


beforeEach(() => {
    request = {
        body: {
            email: "admin@wednesday.com",
            userDetails: {
                name: "firstname",
                email: "email",
                address: "address",
                contact: 1234567890,
                date: "2020-02-02",
                adult: 1,
                children: 1
            },
            selectedAdventures: {
                Thrillville: [],
            }

        },
        session: {
            user:{
                email: "admin@wednesday.com",
            },
            isAdmin: true
        }
    }
    response = {
        status: jest.fn((x) => x),
        json: jest.fn((x) => x),
    };
})


describe('Ticket Booking Routes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.userDetails.email = undefined;
        result = await CreateBookings(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if number of visitors is Zero", async () => {
        request.body.userDetails.adult = 0;
        request.body.userDetails.children = 0;
        result = await CreateBookings(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

});

describe('View Bookings Routes', () => {

    it("Should return status 400 if User is not loged in ", async () => {
        request.session.user.email = undefined;
        result = await AllBookings(request, response);
        console.log(result);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("Should return status 400 if Admin is not loged in ", async () => {
        request.body.email = "notAdminMail@email.com";
        result = await AllBookings(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });
    
    it("Should return status 400 if No Booking Found", async () => {
        Booking.find.mockImplementationOnce(() => ([]));
        result = await AllBookings(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    })

});