import * as authModel from '../models/authModel.js'

export async function registerUser(req, res) {
    const user= await authModel.register(req.body)
    if (user) {
        res.status(201).json({ message: 'User registered successfully', user });
    } else {
        res.status(400).json({ message: 'User registration failed' });
    }  
}
 
