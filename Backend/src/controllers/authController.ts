import {Request, Response} from 'express';
import {registerUser, loginUser} from '../services/authService';
import {RegisterDTO, LoginDTO} from '../types';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: RegisterDTO = req.body;

        if (!data.name || !data.email || !data.password) {
            res.status(400).json({ error: 'All fields are required'});
            return;
        }

        if (data.password.length < 6) {
            res.status(400).json({error: 'Password must be at least 6 characters'})
        }

        const result = await registerUser(data);
        res.status(201).json(result);
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({error: error.message});
        }else {
            res.status(500).json({error: 'Registration failed'});
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> =>{
    try {
        const data: LoginDTO = req.body;

        if(!data.email || !data.password){
            res.status(400).json({error: 'Email and password are required'});
            return
        }
        
        const result = await loginUser(data);
        res.json(result);

    }catch (error){
        if (error instanceof Error) {
            res.status(401).json({error: error.message});
        } else {
            res.status(500).json({error: 'Login failed'})
        }
    }
};
