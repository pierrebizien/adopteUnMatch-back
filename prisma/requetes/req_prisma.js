const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
 createTeam: async function (dataToCreate) {
    const team = await prisma.team.create({data: dataToCreate})
  },

  getTeamById : async function (id) 
  {
    return (await prisma.team.findFirst({
      where : {id: id}
    }))
  }
}

