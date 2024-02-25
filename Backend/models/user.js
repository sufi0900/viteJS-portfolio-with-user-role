import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" }, // "user" or "admin"

  id: { type: String },
  sessionToken: String,
});

export default mongoose.model("User", userSchema);
