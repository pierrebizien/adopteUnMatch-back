const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const managePassword = require('../../auth-tools.js') 
exports.login = (req, res, next) => 
{
        console.log(req.body);
        prisma.Team.findFirst({
    		where : {login: req.body.login}
    	})
    	.then(user => {
    		managePassword(req, res, next, user);
    	})
    	.catch(err => console.log(err))
}