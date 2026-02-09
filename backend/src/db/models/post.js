import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    content: String,
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Post = mongoose.model('post', postSchema);
