import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theme: { type: String, required: false },
});

userSchema.plugin(uniqueValidator);
export { userSchema };
// export const User = mongoose.model("User", userSchema);
