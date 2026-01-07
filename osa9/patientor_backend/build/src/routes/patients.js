"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewEntrySchema.parse(req.body);
        console.log(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.get("/", (_req, res) => {
    res.send(patientsService_1.default.getNonSensitiveEntries());
});
router.post("/", newPatientParser, (req, res) => {
    const addedEntry = patientsService_1.default.addPatient(req.body);
    res.json(addedEntry);
});
router.use(errorMiddleware);
exports.default = router;
