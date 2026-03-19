import express from "express";
import {
  clearAllNotification,
  deleteNotification,
  getNotifications,
} from "../controllers/notification.controllers";
import isAuth from "../middlewares/isAuth";

let notificationRouter = express.Router();

notificationRouter.get("/get", isAuth, getNotifications);
notificationRouter.delete("/deleteone/:id", isAuth, deleteNotification);
notificationRouter.delete("/", isAuth, clearAllNotification);

export default notificationRouter;
