const argv = require("yargs").argv;
const API = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await API.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await API.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await API.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await API.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
