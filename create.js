const req_prisma = require('./prisma/requetes/req_prisma.js');
const express = require('express');
 
module.exports = {
createTeamBack : function (req, res , next, data)
{
    console.log('data', data);
    req_prisma.createTeam(data)
    .then(() => res.status(201).json({
        message: 'Équipe créé !',
        error_code: 0
    }))
    .catch(e => {
        if (e.code === 'P2002')
        {
            let err_message = 'L\'équipe n\'a pas pu être créée.';
            let error = 1;
            if (e.meta.target[0] === 'login')
            {
                err_message = `${err_message} Ce login existe déjà`;
                error = 2;
            }
            else if (e.meta.target[0] === 'name')
            {
                err_message = `${err_message} Ce nom d'équipe existe déjà`;
                error = 3;
            }
            res.status(403).json({
                message : err_message,
                error_code : error
            });
            return ;
        }
    });
    }
}