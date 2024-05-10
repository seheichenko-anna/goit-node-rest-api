import express from "express";

import authControllers from "../controllers/authControllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import {
  userAvatarSchema,
  userSchema,
  userSubscriptionSchema,
} from "../schemas/authSchemas.js";

import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSchema),
  authControllers.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSchema),
  authControllers.signin
);

authRouter.post("/signout", authenticate, authControllers.signout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/user",
  authenticate,
  isEmptyBody,
  validateBody(userSubscriptionSchema),
  authControllers.changeSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  isEmptyBody,
  validateBody(userAvatarSchema),
  authControllers.updateAvatar
);

export default authRouter;
