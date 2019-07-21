const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  mission_name: { type: String, required: true },
  mission_id: { type: String, required: true },
  organisation: { type: String, required: true },
  website: String,
  payload_ids: [{ type: String }],
  payloads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'payload'
    }
  ],
  description: String,
  socialMedia: {
    type: Map,
    of: String
  }
});

const Mission = mongoose.model('mission', MissionSchema);
module.exports = Mission;
