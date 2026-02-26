import jwt from 'jsonwebtoken'

// Authenticate user Middleware
// Rememebr the userToken received in the headers is processed and stored as usertoken in headers and not like userToken
const authUser = async (req, res, next) => {

    try {

        const { usertoken } = req.headers;


        if (!usertoken) {
            return res.json({ success: false, message: "Not authorized, login again!" })
        }
        const userToken_decode = jwt.verify(usertoken, process.env.JWT_SECRET)

        //if no body in req then create one empty body here
        req.body = req.body || {};
        req.body.userId = userToken_decode.id;
        next();


    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })
    }

};

export default authUser