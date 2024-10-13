import {Router} from "express";
import { adminAuth } from "../middleware/jwt.admin.js";
import { allforecast, oneForecast, addForecast, updateForecast, deleteteForecast  } from "../controllers/forecast.js";
import { schemaValidator } from "../middleware/validator.admin.js";
import { forecastSchema } from "../schema/forecast.js";
const routes = Router();

routes.get('/forecast-all', allforecast);
routes.get('/forecast/:id', oneForecast);
routes.post('/forecast',adminAuth, schemaValidator(forecastSchema), addForecast);
routes.put('/forecast/:id',adminAuth, updateForecast);
routes.delete('/forecast/:id',adminAuth, deleteteForecast);

export default routes