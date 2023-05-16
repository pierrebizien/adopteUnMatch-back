const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
 createTeam: async function (dataToCreate) {
    const team = await prisma.team.create({data: dataToCreate})
  },

  getTeamById : async function (id) 
  {
    return (await prisma.team.findFirst({
      where : {id: id},
      include: {
        homeMatches: true,
        awayMatches: true,
      }
    }))
  },

  createMatch : async function (dataToCreate) {
    return (await prisma.match.create({data : dataToCreate}))
  },

  getAllMatches : async function () {
    return (await prisma.match.findMany({
      where : {
        date: {
        gte: new Date() 
      }},
      include: {
        teamHome: true,
        teamAway: true,
      }
    }));
  },

  getmyMatches : async function (id) {
    return (await prisma.match.findMany({
      where : {
        date: {
          gte: new Date() 
        },
      OR : [
        {teamHomeId : id},
        {teamAwayId : id}
      ]
      },
      include: {
        teamHome: true,
        teamAway: true,
      }
    }))
  },
  getPastMatches : async function () {
    return (await prisma.match.findMany({
      where : {
        date: {
          lt: new Date() 
        }
      },
      include: {
        teamHome: true,
        teamAway: true,
      }
  }))
  },

  getUpcomingMatches : async function () {
    return (await prisma.match.findMany({
      where : {
        date: {
          gte: new Date() 
        }
      },
      include: {
        teamHome: true,
        teamAway: true,
      }
  }))
  },

  getFreeMatches : async function () {
    return (await prisma.match.findMany({
      where : {
        date: {
          gte: new Date() 
        },
      OR : [
        {teamAwayId : null}
      ]
      },
      include: {
        teamHome: true,
        teamAway: true,
      }
    }))
  },

  joinMatch : async function (matchId , userId)
  {
    return (await prisma.match.update({
      where: { id: matchId },
      data: { teamAway: { connect: { id: userId } } },
    }))
  }
}

