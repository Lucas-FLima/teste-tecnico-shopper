import { Router } from "express";
import { ConfirmController } from "../controllers/ConfirmController";
import { EstimateController } from "../controllers/EstimateController";
import { HistoryController } from "../controllers/HistoryController";

const route = Router();

route.post("/ride/estimate", new EstimateController().handle);
route.patch("/ride/confirm", new ConfirmController().handle);
route.get("/ride/:customer_id", new HistoryController().handle);

export default route;
