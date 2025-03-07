import { Router } from "express";
import { Route } from "../routes/routes.types";
import authService from "./auth.service";
import { ResponseHandler } from "../utility/response-handler";
const authRouter = Router();

// validation???
authRouter.post("/login", async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

// why post?
authRouter.post("/logout", (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const result = authService.logout(token || "");
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});
export default new Route("/auth", authRouter);
