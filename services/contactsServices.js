import Contact from "../models/Contact.js";

export const listContacts = ({ filter = {}, fields, setting = {} }) =>
  Contact.find(filter, fields, setting).populate("owner", "email");

export const getContact = (filter) => Contact.findOne(filter);

export const removeContact = async (filter) => Contact.findOneAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const updateStatusContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, {
    favorite: data.favorite,
  });
