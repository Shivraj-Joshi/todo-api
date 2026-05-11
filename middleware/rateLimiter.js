import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // time limit adds upto 15 minutes
    max: 10, // no. of attempts in 15 minutes allowed
    message: { error: "Too many requests, please try again" }
})

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, //max 100 requests per 15 min
    message: { error: "Too many requests, please try again later" }
})