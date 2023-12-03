const express = require('express');
const dbConnect = require('./config/dbConnection');
const { notFound, errorHandler, handleError } = require('./middlewares/errorHandler');
const userRouter = require('./routes/userRoutes');
const dotenv=require("dotenv").config();
const bodyParser = require("body-parser");
const courseCategoryRouter = require('./routes/courseCategoryRoutes');
const courseRouter = require('./routes/courseRoutes');
const lessonRouter = require('./routes/lessonRoutes');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

dbConnect();

app.get('/', (req, res) => {
    res.send('Hello to EduVerse Server');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/user",userRouter);
app.use("/api/course/category",courseCategoryRouter);
app.use("/api/course",courseRouter);
app.use("/api/lesson",lessonRouter);
app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}.`);
});