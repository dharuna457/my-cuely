const screenshot = require('screenshot-desktop');
const path = require('path');
const fs = require('fs');
const { createWorker } = require('tesseract.js');

async function readScreenText() {
  const imgPath = path.join(__dirname, 'screenshot.png');
  await screenshot({ filename: imgPath });

  const worker = await createWorker({
    logger: m => console.log(m), // Optional logging
    workerPath: path.resolve(__dirname, 'node_modules/tesseract.js/dist/worker.min.js'),
    langPath: path.resolve(__dirname, 'node_modules/tesseract.js/lang-data'),
    corePath: path.resolve(__dirname, 'node_modules/tesseract.js-core/tesseract-core.wasm.js'),
  });

  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const { data: { text } } = await worker.recognize(imgPath);

  await worker.terminate();
  return text;
}

module.exports = { readScreenText };
