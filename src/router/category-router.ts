import {Router} from "express";
import homeController from "../controller/SongController";

export const categoryRouter = Router()
categoryRouter.get('/',homeController.findCategory);