import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import Messages from "../util/Messages.js";
import grid from "gridfs-stream";
import mongoose from "mongoose";
let gfs;
let gridfsBucket;

const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });

  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

const storage = new GridFsStorage({
  url: Messages.MONGOSTRING,
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];
    if (match.indexOf(file.mimeType) === -1) {
      return `${Date.now()}-image-${file.originalname}`;
    }
    return {
      bucketName: "images",
      filename: `${Date.now()}-image-${file.originalname}`,
    };
  },
});
const upload = multer({ storage }).array("file");

export const uploadImage = async (req, res) => {
  upload(req, res, (err) => {
    console.log(req.files)
    if (err) {
      return res.status(500).json({
        success: false,
        message: `INTERNAL SERVER ERROR`,
        data: err.message,
      });
    } else {
      if (!req.files.length) {
        return res.status(400).json({
          success: false,
          message: Messages.IMAGE_NOT_FOUND,
        });
      } else {
        console.log(req.files)
        const images = [];
        for (let i = 0; i < req.files.length; i++) {
          images.push(`${Messages.BACKEND_BASEURL}/api/v1/image/${req.files[i].filename}`);
        }
        return res.status(200).json({
          success: true,
          message: Messages.IMAGE_UPLOADED,
          data: images,
        });
      }
    }
  });
};

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.file_name });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `INTERNAL SERVER ERROR`,
      data: err.message,
    });
  }
};
