const {
  getAllMissions,
  getMissionWithId,
  addMission,
  updateMission,
  deleteMission
} = require('../controllers/missionController');

const missionRoutes = [
  {
    method: 'GET',
    url: '/api/missions',
    handler: getAllMissions
  },
  {
    method: 'GET',
    url: '/api/missions/:mission_id',
    handler: getMissionWithId
  },
  {
    method: 'POST',
    url: '/api/missions',
    handler: addMission
  },
  {
    method: 'PUT',
    url: '/api/missions/:mission_id',
    handler: updateMission
  },
  {
    method: 'DELETE',
    url: '/api/missions/:mission_id',
    handler: deleteMission
  }
];

module.exports = missionRoutes;
