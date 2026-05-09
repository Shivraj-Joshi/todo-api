import express from 'express';
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
// import { use } from 'react';

const router = express.Router();
const prisma = new PrismaClient();


router.post('/register', async (req, res) => {
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

export default router   