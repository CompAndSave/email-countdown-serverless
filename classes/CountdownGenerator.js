const GifCountdown = require("gif-countdown");
const { gzip } = require('node-gzip');
const fs = require("fs");
const path = require("path");

const OUTPUT_GIF_PATH = process.env.ENABLE_SERVERLESS === "true" ? "/tmp/output.gif" : path.join(__dirname, "../tmp/output.gif");

module.exports = class CountdownGenerator {
  /**
   * @class
   * @classdesc Class to generator the countdown gif
   */
  constructor() {}

  /**
   * Get generated gif path
   * 
   * @param {string} expDateTime Expiration date time. ISO format, e.g., 2023-01-01T23:59:59-08:00
   * @param {string} imagePath Counter background image path
   * @param {object} fontText
   * @param {string} fontText.font_path Font path
   * @param {string} fontText.font_name Font family name, e.g., `Open Sans`
   * @param {string|number} fontText.font_size Font size in pixel, e.g., `40`
   * @param {function} fontText.text_fn Function to generate the text string by timer parameter. E.g., ``` (counter)=> `${counter.days} : ${counter.hours} : ${counter.minutes} : ${counter.seconds}` ```
   * @param {string} fontText.text_color Color string for text. E.g., `rgb(163, 168, 178)`
   * @param {number} fontText.text_x_offset X coordinate offset for text
   * @param {number} fontText.text_y_offset Y coordinate offset for text
   * @param {string} [expImagePath] Expired counter image path
   * @param {boolean} [compress=true] Compress by file by gzip. Default is `true`
   * @param {GifCountdown} [gifCountdown] GifCountdown class object with customized configurations
   * @returns {promise} Promise with file path of the gzipped gif file
   */
  static async getGif(expDateTime, imagePath, fontText, expImagePath, compress = true, gifCountdown) {
    gifCountdown = gifCountdown ?? new GifCountdown();
    
    await gifCountdown.loadImage(imagePath);
    await gifCountdown.registerFontText(fontText);
    if (expImagePath) { await gifCountdown.loadExpiredImage(expImagePath); }

    const buffer = await gifCountdown.generate(expDateTime);

    const processedBuffer = compress ? await gzip(buffer) : buffer;
    fs.writeFileSync(OUTPUT_GIF_PATH, processedBuffer);

    return Promise.resolve(OUTPUT_GIF_PATH);
  }
}