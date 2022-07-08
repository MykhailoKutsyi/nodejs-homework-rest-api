const { createError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const getContacts = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getContacts;
