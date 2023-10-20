import { Router } from "express";
import { EventController } from "./controllers/EventController";
import { GetProfileController } from "./controllers/GetProfileController";
import { LoginController } from "./controllers/LoginController";
import { ParticipantController } from "./controllers/ParticipantController";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/users", new UserController().createUser);
routes.get("/users", authMiddleware, new UserController().getUsers);
routes.post("/login", new LoginController().login);
routes.get(
  "/profile/list",
  authMiddleware,
  new GetProfileController().getProfile
);
routes.post("/event/create", authMiddleware, new EventController().createEvent);
routes.post(
  "/event/:idEvent/register",
  authMiddleware,
  new ParticipantController().registerInEvent
);
routes.get("/event/list", new EventController().listEvents);
routes.get("/event/my/list", authMiddleware, new EventController().getMyEvents);
routes.get("/event/:id/list", new EventController().getEventById);

export default routes;
