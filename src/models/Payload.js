const mongoose = require('mongoose');

const PayloadSchema = new mongoose.Schema({
  payload_id: { type: String, required: true },
  norad_id: [{ type: Number }],
  nationality: { type: String, required: true },
  payload_type: String,
  payload_mass_kg: Number,
  orbit: String,
  orbit_params: {
    type: Map,
    of: String
  }
});

const Payload = mongoose.model('payload', PayloadSchema);
module.exports = Payload;
