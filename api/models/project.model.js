import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  components: [componentSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
