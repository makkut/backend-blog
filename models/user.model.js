import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    completedMeetings: {
      type: Number,
    },
    image: {
      type: String,
    },
    rate: {
      type: Number,
    },
    sex: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profession: {
      type: { type: Schema.Types.ObjectId, ref: "Profession" },
    },
    qualieties: {
      type: { type: Schema.Types.ObjectId, ref: "Quality" },
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", schema);
