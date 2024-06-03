const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const { Schema } = mongoose;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const movieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
  },
  Director: {
    type: String,
  },
  Poster: {
    type: String,
  },
  imdbID: {
    type: String,
    required: true,
  },
});

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    movies: [movieSchema],
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const List = mongoose.model("List", listSchema);

module.exports = {
  connectDB,
  User,
  List,
};
