import mongoose, { Schema, Document } from "mongoose";

export interface ISocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface IProfile extends Document {
  name: string;
  title: string;
  roles: string[];
  bio: string;
  location: string;
  email: string;
  resumeUrl: string;
  availableForHire: boolean;
  socialLinks: ISocialLink[];
  avatarUrl?: string;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  iconName: { type: String, default: "Globe" },
});

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, default: "Saiful Islam" },
    title: { type: String, required: true, default: "Full Stack & Software Engineer" },
    roles: { type: [String], default: ["Full Stack Developer", "Backend Specialist", "AI Enthusiast", "System Architect"] },
    bio: { type: String, default: "I build robust, scalable applications and delightful user experiences with modern technologies." },
    location: { type: String, default: "Dhaka, Bangladesh" },
    email: { type: String, default: "saifulislam3412883@gmail.com" },
    resumeUrl: { type: String, default: "/resume.pdf" },
    availableForHire: { type: Boolean, default: true },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    avatarUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
