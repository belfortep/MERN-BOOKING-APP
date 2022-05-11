import express from 'express';
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from '../controllers/roomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express();

//CREATE
router.post('/:hotelId', verifyAdmin, createRoom)
//UPDATE
router.put('/:id', verifyAdmin, updateRoom)
//DELETE
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)
//GET ONE
router.get('/:id', getRoom)
//GET ALL
router.get('/', getAllRoom)

export default router;