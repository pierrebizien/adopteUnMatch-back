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

  getAllMatches : async function (page) {
    return (await prisma.match.findMany({
      skip : (page - 1)*8,
      take : 8,
      where : {
        date: {
        gte: new Date() 
      }},
      include: {
        teamHome: true,
        teamAway: true,
      },
      orderBy : [
        {date : 'asc'}
      ]
    }));
  },

  getmyMatches : async function (id, page) {
    return (await prisma.match.findMany({
      skip : (page - 1)*8,
      take : 8,
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
      },
      orderBy : [
        {date : 'asc'}
      ]
    }))
  },
  getPastMatches : async function (page) {
    return (await prisma.match.findMany({
      skip : (page - 1)*8,
      take : 8,
      where : {
        date: {
          lt: new Date() 
        }
      },
      include: {
        teamHome: true,
        teamAway: true,
      },
      orderBy : [
        {date : 'asc'}
      ]
  }))
  },

  getUpcomingMatches : async function (page) {
    return (await prisma.match.findMany({
      skip : (page - 1)*8,
      take : 8,
      where : {
        date: {
          gte: new Date() 
        }
      },
      include: {
        teamHome: true,
        teamAway: true,
      },
      orderBy : [
        {date : 'asc'}
      ]
  }))
  },

  getFreeMatches : async function (page) {
    return (await prisma.match.findMany({
      skip : (page - 1)*8,
      take : 8,
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
      },
      orderBy : [
        {date : 'asc'}
      ]
    }))
  },

  joinMatch : async function (matchId , userId)
  {
    return (await prisma.match.update({
      where: { id: matchId },
      data: { teamAway: { connect: { id: userId } } },
    }))
  },

  getMyTeam : async function (userId)
  {
    return (await prisma.team.findUnique({
      where: {id: userId}
    }))
  },

  getMyLastFive : async function (userId)
  {
    return (await prisma.match.findMany({
      take : 5,
      where: {
        OR : [{teamHomeId: userId}, {teamAwayId: userId}],
        date : {gte : new Date()},
	},
		include: {
		teamHome: true,
		teamAway: true,
	  },
      orderBy : [
        {date : 'asc'}
      ]
      }
         ))
  }
}

