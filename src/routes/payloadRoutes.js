const {
  getAllPayloads,
  getPayloadWithId,
  addPayload,
  updatePayload,
  deletePayload
} = require('../controllers/payloadController');

const payloadRoutes = [
  {
    method: 'GET',
    url: '/api/payloads',
    handler: getAllPayloads
  },
  {
    method: 'GET',
    url: '/api/payloads/:payload_id',
    handler: getPayloadWithId
  },
  {
    method: 'POST',
    url: '/api/payloads',
    handler: addPayload
  },
  {
    method: 'PUT',
    url: '/api/payloads/:payload_id',
    handler: updatePayload
  },
  {
    method: 'DELETE',
    url: '/api/payloads/:payload_id',
    handler: deletePayload
  }
];

module.exports = payloadRoutes;
