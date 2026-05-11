import express from 'express';
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { authLimiter } from '../middleware/rateLimiter.js';
import { body, validationResult } from 'express-validator';
// import { use } from 'react';

const router = express.Router();
const prisma = new PrismaClient();

//user registeration logic 

router.post('/register', authLimiter, [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least6 characters ')

], async (req, res) => {
    //check validationResult

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { email, password } = req.body

        //check if user already exist or not 

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({ error: "Email Already registered" })
        }

        //Hash the password 

        const hashedPassword = await bcrypt.hash(password, 10)

        //save the user 

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        //returning the user 

        res.status(201).json({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt
        })

    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }

})

//user login logic 

router.post('/login', authLimiter, [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isEmpty().withMessage('Password is required')
],
    async (req, res) => {
        //check validationResult

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ error: errors.array() })
        }
        try {
            const { email, password } = req.body

            //find user by email  

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                return res.status(400).json({
                    error: "invalid Email or password"
                })
            }

            //comparing the  password with stored hash

            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                return res.status(400).json({ error: "Invalid password" })
            }

            // generating jwt token 

            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

            //returning successful login 
            res.json({
                message: "Login Successful",
                token
            })

        } catch (error) {
            res.status(500).json({ error: "something went wrong" })
        }
    })

export default router   