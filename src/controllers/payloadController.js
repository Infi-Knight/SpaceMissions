const Payload = require('../models/Payload');

// Get all payloads
const getAllPayloads = async (req, res) => {
  try {
    const payloads = await Payload.find();
    return payloads;
  } catch {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// Get a single payload
const getPayloadWithId = async (req, res) => {
  try {
    const payload_id = req.params.payload_id;
    const payload = await Payload.findOne({ payload_id });
    if (payload === null) {
      res.status(404).send({
        message: `Payload with id: ${payload_id} was not found`
      });
    }
    res.status(200).send(payload);
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// create a new payload
const addPayload = async (req, res) => {
  try {
    const payload_id = req.body.payload_id;
    const existingPayload = await Payload.findOne({ payload_id });
    if (existingPayload) {
      res.status(409).send({
        error: `Payload with id: ${payload_id} already exists`
      });
    } else {
      const newPayload = new Payload(req.body);
      await newPayload.save();
      res.status(201).send({
        message: `Payload with id: ${req.body.payload_id} successfully created`
      });
    }
  } catch (err) {
    if (error instanceof TypeError) {
      res.status(400).send({
        error: 'Illegal payload data, can not create a payload entry'
      });
    }
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// update an existing payload
const updatePayload = async (req, res) => {
  try {
    const payload_id = req.params.payload_id;
    const payload = req.body;
    const updatedPayload = await Payload.findOneAndUpdate(
      { payload_id },
      payload,
      { new: true }
    );
    res.status(200).send({
      message: `Payload with id: ${payload_id} updated sucessfully`,
      updatedPayload
    });
  } catch (err) {
    if (err instanceof TypeError) {
      res.status(400).send({
        error: 'Illegal payload data, aborting update'
      });
    }
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deletePayload = async (req, res) => {
  try {
    const payload_id = req.params.payload_id;
    await Payload.findOneAndDelete({ payload_id });
    res
      .status(200)
      .send({ message: `Payload with id: ${payload_id} deleted successfully` });
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
  getAllPayloads,
  getPayloadWithId,
  addPayload,
  updatePayload,
  deletePayload
};
