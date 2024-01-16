


import express from 'express'
import { createBooking, getAllBookings, getSingleBooking } from '../controllers/bookingController.js'
import { verifyUser } from '../utils/verifyToken.js'


const router = express.Router()


//create booking
router.post('/', verifyUser, createBooking)

//get single booking
router.get('/:id', verifyUser, getSingleBooking)

//get all bookings
router.get('/', verifyUser, getAllBookings)

export default router