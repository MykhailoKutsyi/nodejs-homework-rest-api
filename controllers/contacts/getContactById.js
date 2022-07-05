const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw createError(404);
  }
  res.json(contact);
};

module.exports = getContactById;
