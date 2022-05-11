import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) => {
    try {

        const hotel = new Hotel(req.body)

        const savedHotel = await hotel.save();

        return res.status(200).json(savedHotel);

    } catch (err) {
        next(err)
    }
}

export const updateHotel = async (req, res, next) => {
    try {

        const hotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        return res.status(200).json(hotel);

    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {

        await Hotel.findByIdAndDelete(req.params.id);

        return res.status(200).send('Hotel deleted');

    } catch (err) {
        next(err)
    }
}

export const getHotel = async (req, res, next) => {
    try {

        const hotel = await Hotel.findById(req.params.id);

        return res.status(200).json(hotel);

    } catch (err) {
        next(err)
    }
}

export const getAllHotel = async (req, res, next) => {
    try {

        const hotels = await Hotel.find();

        return res.status(200).json(hotels);

    } catch (err) {
        next(err)
    }
}