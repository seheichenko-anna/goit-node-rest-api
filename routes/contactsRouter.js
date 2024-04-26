import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(updateFavoriteSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
