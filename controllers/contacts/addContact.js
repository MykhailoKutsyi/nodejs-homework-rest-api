const { contactSchema } = require("../../schemas/contacts");
const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");
const crypto = require("crypto");

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const id = crypto.randomUUID();
  req.body.id = id;
  await contacts.addContact(req.body);
  res.status(201).json(req.body);
};

module.exports = addContact;
