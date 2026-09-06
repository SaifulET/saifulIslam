import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  company: string;
  role: string;
  timeBound: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  location?: string;
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    timeBound: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    location: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
