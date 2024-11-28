import {
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  find,
  findById,
  validate,
} from "../models/event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, address, date } = req.body;
    const eventData = { title, description, address, date };

    // Validate event data
    const isValid = validate(eventData);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Invalid event data. Title and date are required." });
    }

    const event = await create(eventData);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, address, date } = req.body;
    const eventData = { title, description, address, date };

    // Validate event data
    const isValid = validate(eventData);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Invalid event data. Title and date are required." });
    }

    const updatedEvent = await findByIdAndUpdate(id, eventData);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    // Use 400 for validation errors
    res.status(400).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
