import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage extends Document {
  title: string;
  imageUrl: string;
  caption: string;
  category?: string;
  order: number;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    caption: { type: String, default: "" },
    category: { type: String, default: "Featured" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
