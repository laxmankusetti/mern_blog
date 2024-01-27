import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to update this user!'))
    }
    if(req.body.password){
        if(req.body.password.length < 6 ){
            return next(errorHandler(400, 'password must be atleast 6 characters or more!'))
        }

        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400, 'Username length must be between 7 to 20 characters!'))
        }

        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'Username cannot contain whitespaces!'))
        }

    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set : {
                username : req.body.username,
                email : req.body.email,
                profilePicture : req.body.profilePicture,
                password : req.body.password,
            }
        }, { new : true });
        const { password : pass, ...rest } = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}