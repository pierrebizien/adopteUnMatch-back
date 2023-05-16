const jwt = require ('jsonwebtoken');

module.exports = {
    auth : function (req, res, next)
    {
        try {
            const token = req.header('authorization').split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
            req.body.userId = decodedToken.userId;
            next();
        }
        catch (error)
        {
            res.status(401).json({
                message: "Wrong Token"
            })
            
        }
    }
}