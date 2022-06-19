const fs = require("fs/promises");
const contactsPath = "./models/contacts.json";

const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId.toString());
  return contact;
};

const addContact = async (newContact) => {
  const contacts = await listContacts();
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId.toString());
  const updatedContacts = contacts.filter(
    ({ id }) => id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return contact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
