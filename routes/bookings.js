const express = require('express');
const router = express.Router();
const CreateBookings = require('../controllers/bookings/createBookings');
const MyBookings = require('../controllers/bookings/myBookings');
const AllBookings = require('../controllers/bookings/allBookings');
const EditBookings = require('../controllers/bookings/editBookings');
const DeleteBookings = require('../controllers/bookings/deleteBookings');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Adventure booking endpoints
 */
//Create Bookings Route
/**
 * @swagger
 * /bookings/create:
 *   post:
 *     summary: Book adventure ticket
 *     description: Book an adventure ticket for the specified user and adventures.
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userDetails:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   address:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   date:
 *                     type: string
 *                   adult:
 *                     type: number
 *                   children:
 *                     type: number
 *               selectedAdventures:
 *                 type: object
 *                 properties:
 *                   adventure1:
 *                     type: boolean
 *                   adventure2:
 *                     type: boolean
 *                   adventure3:
 *                     type: boolean
 *             required:
 *               - userDetails
 *               - selectedAdventures
 *     responses:
 *       '201':
 *         description: Booking successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking successfully.
 *               bookingnumber: WWA10001
 *       '422':
 *         description: Unprocessable Entity - Validation failed.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields.
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error.
 */
router.post('/bookings/create', CreateBookings);

//My Bookings Route
/**
 * @swagger
 * /bookings/my:
 *   post:
 *     summary: Get bookings for a specific user.
 *     tags: [Bookings]
 *     description: Retrieve booking information for a user based on their email.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successful response with booking information.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking Found
 *               bookings:
 *                 - bookingNumber: "WWA10001"
 *                   name: John Doe
 *                   email: john@example.com
 *                   address: 123 Main St
 *                   contact: 555-1234
 *                   date: 2023-01-01
 *                   adult: 2
 *                   children: 1
 *                   adventures:
 *                     adventure1: true
 *                     adventure2: false
 *       400:
 *         description: No booking found for the provided email.
 *         content:
 *           application/json:
 *             example:
 *               message: No Booking with this email.
 *       422:
 *         description: Incomplete or invalid request body.
 *         content:
 *           application/json:
 *             example:
 *               message: No booking for this Email
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post("/bookings/my", MyBookings);

//All Bookings Route
/**
 * @swagger
 * /bookings/all:
 *   post:
 *     summary: Get all booking.
 *     description: Route to retrieve all bookings by admin.
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Bookings found.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking Found
 *               bookings:
 *                 - booking1
 *                 - booking2
 *       400:
 *         description: Unauthorized or No bookings found.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized or No Bookings yet
 *       422:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             example:
 *               message: No booking for this Email
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post("/bookings/all", AllBookings);

//Edit Bookings Route
/**
 * @swagger
 * /bookings/edit:
 *   post:
 *     summary: Edit a booking.
 *     description: Route to edit a booking by admin.
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             user:
 *               name: John Doe
 *               email: john@example.com
 *               address: 123 Main St
 *               contact: +1234567890
 *               date: '2023-01-01'
 *               adult: 2
 *               children: 1
 *             booking:
 *               bookingnumber: WWA10001
 *     responses:
 *       200:
 *         description: Booking update successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking Update Successful
 *       400:
 *         description: Validation error or Invalid booking details.
 *         content:
 *           application/json:
 *             example:
 *               message: Please fill all fields or Select at least one Visitor
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post("/bookings/edit", EditBookings);

// Delete Bookings Route
/**
 * @swagger
 * /bookings/delete:
 *   post:
 *     summary: Delete a booking.
 *     description: Route to delete a booking by admin.
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             booking:
 *               bookingnumber: WWA10001
 *               park: Adventure Park
 *               adventure: Roller Coaster
 *     responses:
 *       200:
 *         description: Booking deletion successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking Delete Successful
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post('/bookings/delete', DeleteBookings);

module.exports = router;