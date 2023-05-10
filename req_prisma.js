const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const prisma = new PrismaClient();

module.exports = {
 createTeam: async function (dataToCreate) {
    return (await prisma.team.create({
      data: dataToCreate}))
  }
}

//{login : string, name : string, password : string, city : string}
