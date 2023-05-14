
exports.verifToken = (req, res, next) => 
{
    try {
        const token = req.header('authorization').split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        res.status(200).json({message:"TOKEN OK"});
    }
    catch (error)
    {
        res.status(401).json({error});
    }
}