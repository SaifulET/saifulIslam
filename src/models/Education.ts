import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  degree: string;
  university: string;
  timeBound: string;
  cgpa: string;
  description: string;
  coursework: string[];
  highlights: string[];
  location?: string;
  order: number;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    university: { type: String, required: true },
    timeBound: { type: String, required: true },
    cgpa: { type: String, required: true },
    description: { type: String, default: "" },
    coursework: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    location: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);
