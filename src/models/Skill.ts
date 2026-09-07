import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: "frontend" | "backend" | "tools";
  borderColor: string;
  textColor: string;
  iconPath: string;
  order: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, enum: ["frontend", "backend", "tools"], required: true },
    borderColor: { type: String, default: "#38bdf8" },
    textColor: { type: String, default: "#38bdf8" },
    iconPath: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
