import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js'

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);

        const user = new User({
            username,
            email,
            password: hash
        })

        await user.save();

        return res.status(200).send('User created!')
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {


        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, 'Wrong password or username')) //me gusto la idea de usar el next() con createError
        const { password, isAdmin, ...otherDetails } = user._doc;   //para no enviar todos los datos y sea mas seguro
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY)



        return res.cookie("access_token", token, { httpOnly: true }).status(200).json({ ...otherDetails });
    } catch (err) {
        next(err);
    }
}
