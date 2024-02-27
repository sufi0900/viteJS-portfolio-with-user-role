import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin", "superadmin"],
  },

  id: { type: String },
  sessionToken: String,
});

export default mongoose.model("User", userSchema);
