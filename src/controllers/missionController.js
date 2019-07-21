const Mission = require('../models/Mission');
const Payload = require('../models/Payload');

// Get all missions
const getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find();
    return missions;
  } catch {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// Get a single mission
const getMissionWithId = async (req, res) => {
  try {
    const mission_id = req.params.mission_id;
    const mission = await Mission.findOne({ mission_id });
    if (mission === null) {
      res.status(404).send({
        message: `Mission with id: ${mission_id} was not found`
      });
    }
    res.status(200).send(mission);
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// Add a new mission
const addMission = async (req, res) => {
  try {
    const mission_id = req.body.mission_id;
    const existingMission = await Mission.findOne({ mission_id });

    if (existingMission) {
      res.status(409).send({
        error: `Mission with id: ${mission_id} already exists`
      });
    } else {
      const mission = new Mission(req.body);
      const payload_ids = req.body.payload_ids || null;
      if (payload_ids && payload_ids.length >= 1) {
        for (payload_id of payload_ids) {
          const payload = await Payload.findOne({ payload_id });
          mission.payloads.push(payload);
        }
      }
      const savedMission = await mission.save();
      res.status(201).send({
        message: `Mission with ${req.body.mission_id} successfully created`,
        savedMission
      });
    }
  } catch (err) {
    if (err instanceof TypeError) {
      res.status(400).send({
        error: 'Illegal mission data, can not create requested mission entry'
      });
    }
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// update existing mission
const updateMission = async (req, res) => {
  try {
    const mission_id = req.params.mission_id;
    const mission = req.body;
    const updatedMission = await Mission.findOneAndUpdate(
      { mission_id },
      mission,
      { new: true }
    );
    res.status(200).send({
      message: `Mission with id: ${mission_id} updated successfully`,
      updatedMission
    });
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(400).send({
        error: 'Illegal mission data, aborting update'
      });
    }
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deleteMission = async (req, res) => {
  try {
    const mission_id = req.params.mission_id;
    await Mission.findOneAndDelete({ mission_id });
    res.status(200).send({
      message: `Mission with id: ${mission_id} successfully deleted`
    });
  } catch (error) {
    if (err instanceof TypeError) {
      res.status(400).send({
        error: 'Illegal payload data, aborting delete'
      });
    }
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllMissions,
  getMissionWithId,
  addMission,
  updateMission,
  deleteMission
};
