const fs = require("fs/promises");
const path = require("path");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("1234567890", 2);

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function updatingContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const id = contactId.toString();
  const contact = contacts.find((contact) => contact.id === id);

  return contact || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updatingContacts(contacts);

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const id = contactId.toString();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(idx, 1);
  await updatingContacts(contacts);

  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
