import jwt from 'jsonwebtoken'

const authenticationToken = (req, res, next) => {
    try {
        // console.log('Auth header:', req.headers['authorization'])
        // getting the authorization header    
        const authHeader = req.headers['authorization']

        //exrtracting auth token from header

        const token = authHeader && authHeader.split(' ')[1]

        //if no token found then block the request 

        if (!token) {
            return res.status(401).json({ error: "No Token provided. Access Denied" })
        }

        //verify the token 

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        //attach user info 

        req.user = decoded

        //move to the actuall route request 

        next()

    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" })
    }
}

export default authenticationToken