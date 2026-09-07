import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  image: string;
  images?: string[];
  shortDescription: string;
  fullDescription: string;
  features: string[];
  frontendTech: string[];
  backendTech: string[];
  icons: string[];
  liveUrl: string;
  githubUrl: string;
  githubFrontend: string;
  githubBackend: string;
  featured: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, default: "" },
    features: { type: [String], default: [] },
    frontendTech: { type: [String], default: [] },
    backendTech: { type: [String], default: [] },
    icons: { type: [String], default: [] },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    githubFrontend: { type: String, default: "" },
    githubBackend: { type: String, default: "" },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (mongoose.models.Project && !mongoose.models.Project.schema.paths["images"]) {
  delete mongoose.models.Project;
}

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
