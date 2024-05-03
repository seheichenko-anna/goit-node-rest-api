import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const fields = "-createdAt -updatedAt";
  const { _id: owner } = req.user;
  const filter = { owner };
  const { page = 1, limit = 20, favorite = "" } = req.query;
  if (favorite) {
    filter.favorite = favorite === "true";
  }

  const skip = (page - 1) * limit;
  const setting = { skip, limit };

  const result = await contactsService.listContacts({
    filter,
    fields,
    setting,
  });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.getContact({ owner, _id });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.removeContact({ owner, _id });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.updateContact({ owner, _id }, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.updateStatusContact(
    { owner, _id },
    req.body
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
