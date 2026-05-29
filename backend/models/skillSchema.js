// import mongoose from "mongoose";

// const skillSchema = new mongoose.Schema({
//   title: {
//     type: String,
//   },
//   proficiency: {
//     type: Number,
//   },
//   svg: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
// });

// export const Skill = mongoose.model("Skill", skillSchema);








import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  proficiency: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: [
      "Frontend",
      "Backend",
      "Database",
      "DevOps",
      "Tools",
      "Mobile",
      "AI/ML",
    ],
  },

  svg: {
    public_id: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },
});

export const Skill = mongoose.model("Skill", skillSchema);