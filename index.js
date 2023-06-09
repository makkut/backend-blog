import express from "express";
import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import cors from "cors";
import initDatabase from "./startUp/initDatabase.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use(cors());

const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   console.log("Production");
// } else {
//   console.log("Development");
// }

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
