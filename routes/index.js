const express = require('express');
const router = express.Router();
const path = require("path");
const asyncHandler = require('express-async-handler');
const { CountdownGenerator } = require("../classes/Main");

const SHORT_DATETIME_REGEX = /^[\d]{4}-[\d]{2}-[\d]{2}$/;
const LONG_DATETIME_REGEX = /^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}/;

/**
 * GET /:expDateTime - Get the countdown gif
 */
router.get('/:expDateTime', asyncHandler(async (req, res, next)=> {
  const expDateTime = req.params.expDateTime;
  if (!SHORT_DATETIME_REGEX.test(expDateTime) && !LONG_DATETIME_REGEX.test(expDateTime)) { res.status(400).send(); }
  
  const imagePath = path.join(__dirname, "../assets/images/bg.png");
  const expImagePath = path.join(__dirname, "../assets/images/bg.png");
  const fontText = {
    font_path: path.join(__dirname, "../assets/fonts/OpenSans-Bold.ttf"),
    font_name: "Open Sans",
    font_size: 40,
    text_fn: (counter)=> `${counter.days}       ${counter.hours}        ${counter.minutes}       ${counter.seconds}`,
    text_color: "rgb(163, 168, 178)",
    text_x_offset: 35,
    text_y_offset: 49
  };

  setHeader(res);
  res.sendFile(await CountdownGenerator.getGif(expDateTime, imagePath, fontText, expImagePath));
}));

module.exports = router;

/**
 * Set header for response
 * 
 * @param {object} res Express response object
 * @param {boolean} [gzipped=true] Set gzip to header. Default is `true`
 */
const setHeader = (res, gzipped = true)=> {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "-1");
  if (gzipped) { res.setHeader("Content-Encoding", "gzip"); }
}