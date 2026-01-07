"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.NewEntrySchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
const genderEnum = zod_1.z.enum(Object.values(types_1.Gender));
exports.NewEntrySchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Incorrect or missing date",
    }),
    ssn: zod_1.z.string(),
    gender: genderEnum,
    occupation: zod_1.z.string(),
});
const toNewPatient = (object) => {
    return exports.NewEntrySchema.parse(object);
};
exports.toNewPatient = toNewPatient;
