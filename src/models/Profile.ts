import mongoose, { Schema, Document } from "mongoose";

export interface ISocialLink {
  _id?: string;
  platform: string;
  url: string;
  iconName: string;
  showInHero?: boolean;
  showInContact?: boolean;
}

export interface IProfile extends Document {
  name: string;
  title: string;
  roles: string[];
  bio: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  availableForHire: boolean;
  socialLinks: ISocialLink[];
  avatarUrl?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  aboutImage?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  iconName: { type: String, default: "Globe" },
  showInHero: { type: Boolean, default: true },
  showInContact: { type: Boolean, default: true },
});

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, default: "Saiful Islam" },
    title: { type: String, required: true, default: "Junior Fullstack Developer" },
    roles: { type: [String], default: ["Junior Fullstack Developer", "Frontend Engineer", "Backend Specialist", "UI/UX Designer"] },
    bio: { type: String, default: "I build robust, scalable applications and delightful user experiences with modern technologies." },
    location: { type: String, default: "Jatrabari, Dhaka" },
    email: { type: String, default: "si912999@gmail.com" },
    phone: { type: String, default: "01707961402" },
    resumeUrl: { type: String, default: "/resume.pdf" },
    availableForHire: { type: Boolean, default: true },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    avatarUrl: { type: String, default: "/images/about-me.png" },
    aboutTitle: { type: String, default: "Junior Fullstack Developer" },
    aboutDescription: { 
      type: String, 
      default: "I'm a passionate front-end developer with a keen eye for design and a dedication to creating intuitive, engaging user experiences. With a background in both design and development, I bridge the gap between aesthetics and functionality. My journey in web development started 5 years ago, and I've been in love with crafting digital experiences ever since. I specialize in building responsive, accessible websites and applications that not only look great but perform exceptionally well. When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or hiking in the mountains to recharge my creative batteries." 
    },
    aboutImage: { type: String, default: "/images/about-me.png" },
    githubUrl: { type: String, default: "https://github.com/saifulislam" },
    linkedinUrl: { type: String, default: "https://linkedin.com/in/saifulislam" },
  },
  { timestamps: true }
);

if (mongoose.models.Profile) {
  delete mongoose.models.Profile;
}

export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

