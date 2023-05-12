
const jwt = require ('jsonwebtoken');

module.exports = {
    checkToken : function (req, res, next)
    {
        try {
            const token = req.header('authorization').split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
            return decodedToken;
        }
        catch (error)
        {
            return null;
        }
    }
}