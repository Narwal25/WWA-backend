const AdminSignup = require('../../controllers/adminauth/adminSignup');
const AdminLogin = require('../../controllers/adminauth/adminLogin');
const AdminForgotPassword = require('../../controllers/adminauth/adminForgot');
const AdminLogout = require('../../controllers/adminauth/adminLogout');
const User = require("../../model/User");
let request, response;

jest.mock("../../model/User");

beforeEach(() => {
    request = {
        body: {
            firstname: "firstname",
            lastname: "lastname",
            email: "email@email.com",
            password: "password",
            cpassword: "password"

        }
    }
    response = {
        status: jest.fn((x) => x),
        json: jest.fn((x) => x),
    };
})



describe('Signup Rountes', () => {

    it("Should return status 422 if Admin Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await AdminSignup(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if Passwords is short than 6 character", async () => {
        request.body.password = "short";
        result = await AdminSignup(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if Passwords doesn't Match", async () => {
        request.body.password = "differentpassword";
        result = await AdminSignup(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if Admin already Exist", async () => {
        User.findOne.mockImplementationOnce(() => ({
            id: 1,
            email: 'email',
            password: 'password',
        }));
        result = await AdminSignup(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

});

describe('Login Routes', () => {

    it("Should return status 422 if Admin Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await AdminLogin(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if Admin Not found", async () => {
        User.findOne.mockImplementationOnce(() => (undefined));
        result = await AdminLogin(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("Should return status 400 if password does not match", async () => {
        User.findOne.mockImplementationOnce(() => ({ password: 'not match' }));
        result = await AdminLogin(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

});

describe('Forgot Password Routes', () => {

    it("Should return status 422 if Admin Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await AdminForgotPassword(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if Admin Not found", async () => {
        User.findOne.mockImplementationOnce(() => (undefined));
        result = await AdminForgotPassword(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("Should return status 422 if Passwords doesn't Match", async () => {
        request.body.password = "differentpassword";
        result = await AdminSignup(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

});

describe('Logout Routes', () => {

    it("Should return status 500 if Admin was not logged in", async () => {
        const jwtoken = "Not a valid Token";
        result = await AdminLogout(request, response);
        expect(response.status).toHaveBeenCalledWith(500);
    });

});

