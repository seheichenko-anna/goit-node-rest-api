import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const getContactById = async (contactId) => {
  const result = Contact.findById(contactId);
  return result;
};

export const removeContact = async (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const addContact = async (data) => Contact.create(data);

export const updateContact = async (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data);

export const updateStatusContact = async (contactId, data) => {
  const result = await Contact.findByIdAndUpdate(contactId, {
    favorite: data.favorite,
  });
  return result;
};
