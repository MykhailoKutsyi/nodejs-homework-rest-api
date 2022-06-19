const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");
const { contactSchema } = require("../../schemas/contacts");

const updateContactById = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { contactId } = req.params;
  const contact = await contacts.updateContact(contactId, req.body);
  if (!contact) {
    throw createError(404);
  }
  res.json(contact);
};

module.exports = updateContactById;
