import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nodeSchedule from "node-schedule";
import { csurfProtection } from "./middlewares/jwt.js";
import { userRouter } from "./routes/userRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { bookRouter } from "./routes/bookRoutes.js";
import { loanRouter } from "./routes/loanRoutes.js";
import { Penalty } from "./models/Penalty.js";
import { Loan } from "./models/Loan.js";
import { borrowerRouter } from "./routes/borrowerRoutes.js";

dotenv.config();
const port = process.env.PORT || 4040;
const dbUri = process.env.DBURI;

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(port, () => {
      console.log(`This app is running on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csurfProtection);

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/books", bookRouter);
app.use("/loans", loanRouter);

// schedueled tasks every midnight
const createPenalty = nodeSchedule.scheduleJob("0 0 * * *", async () => {
  const loans = await Loan.find({ loanDeadline: { $lte: new Date() } });
  try {
    await Promise.all(
      loans.map(async (loan) => {
        Penalty.createPenalty(loan, loan.borrower);
      })
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/csurf", (req, res) => {
  res.json({ csurfProtection: req.csrfToken() });
});
