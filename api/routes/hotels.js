import express from 'express';
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../controllers/hotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express();

//CREATE
router.post('/', verifyAdmin, createHotel)
//UPDATE
router.put('/:id', verifyAdmin, updateHotel)
//DELETE
router.delete('/:id', verifyAdmin, deleteHotel)
//GET ONE
router.get('/:id', getHotel)
//GET ALL
router.get('/', getAllHotel)

export default router;