const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");

const getContacts = async (req, res) => {
  const contactsList = await contacts.listContacts();
  if (!contactsList) {
    throw createError(404);
  }
  res.json(contactsList);
};

module.exports = getContacts;
