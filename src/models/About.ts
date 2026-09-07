import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  title?: string;
  description: string;
  image: string;
  name?: string;
  location?: string;
  email?: string;
  phone?: string;
  showDetails?: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    title: { type: String, required: false, default: "" },
    description: { type: String, required: true },
    image: { type: String, required: true, default: "/images/about-me.png" },
    name: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    showDetails: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.About) {
  delete (mongoose.models as any).About;
}

const About = mongoose.model<IAbout>("About", AboutSchema);

export default About;
