const uuid = require("uuid").v4;
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV != "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename(req, file, cb) {
    cb(null, `${uuid()}&${file.originalname}`);
  },
});

const upload = multer({ storage });
app.use(cors());
app.use(express.static("public"));
app.post("/profile", upload.single("file"), (req, res) => {
  // const file = req.files.at(0);
  const { file } = req;
  res.json({
    file: file ?? "No file found",
    body: req.body ?? "No body found",
  });
});

app.post("/api/profile", upload.single("profile"), (req, res) => {
  res.json({ file: req.file ?? "No file found", body: req.body });
});

app.listen(port);
