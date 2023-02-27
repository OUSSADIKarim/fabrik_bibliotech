import mongoose from "mongoose";
import { User } from "./User.js";

const Schema = mongoose.Schema;

const employeeSchema = new Schema({});

export const Employee = User.discriminator("Employee", employeeSchema);
