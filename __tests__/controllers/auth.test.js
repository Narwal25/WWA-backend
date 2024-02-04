const Signup = require('../../controllers/auth/signup');
const Login = require('../../controllers/auth/login');
const ForgotPassword = require('../../controllers/auth/forgot');
const Logout = require('../../controllers/auth/logout');
const User = require("../../model/User");
let request, response;

jest.mock("../../model/User");

beforeEach(() => {
    request = {
        body: {
            firstname: "firstname",
            lastname: "lastname",
            email: "email@email.com",
            password: "longpassword",
            cpassword: "longpassword"

        }
    }
    response = {
        status: jest.fn((x) => x),
        json: jest.fn((x) => x),
    };
})



describe('Signup Rountes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await Signup(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if Passwords is short than 6 character", async () => {
        request.body.password = "short";
        result = await Signup(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 422 if Passwords doesn't Match", async () => {
        request.body.password = "differentpassword";
        result = await Signup(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if User already Exist", async () => {
        User.findOne.mockImplementationOnce(() => ({
            id: 1,
            email: 'email',
            password: 'password',
        }));
        result = await Signup(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

});

describe('Login Routes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await Login(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if User Not found", async () => {
        User.findOne.mockImplementationOnce(() => (undefined));
        result = await Login(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("Should return status 400 if password does not match", async () => {
        User.findOne.mockImplementationOnce(() => ({ password: 'not match' }));
        result = await Login(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

});

describe('Forgot Password Routes', () => {

    it("Should return status 422 if User Details are Incomplete", async () => {
        request.body.email = undefined;
        result = await ForgotPassword(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

    it("Should return status 400 if User Not found", async () => {
        User.findOne.mockImplementationOnce(() => (undefined));
        result = await ForgotPassword(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("Should return status 422 if Passwords doesn't Match", async () => {
        request.body.password = "differentpassword";
        result = await ForgotPassword(request, response);
        expect(response.status).toHaveBeenCalledWith(422);
    });

});

describe('Logout Routes', () => {

    it("Should return status 500 if User was not logged in", async () => {
        const jwtoken = "Not a valid Token";
        result = await Logout(request, response);
        expect(response.status).toHaveBeenCalledWith(500);
    });

});

