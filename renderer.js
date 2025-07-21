







const { readScreenText } = require('./ocr');
const { Configuration, OpenAIApi } = require('openai');

// Replace with your OpenAI key
const configuration = new Configuration({
   apiKey: "Open Ai key" // ✅ Replace this with your OpenAI key
});
const openai = new OpenAIApi(configuration);

async function askGPT() {
  try {
    const screenText = await readScreenText();
    document.getElementById('screenText').value = screenText;

    const question = document.getElementById('question').value;
    const fullPrompt = `This is what's on my screen:\n\n${screenText}\n\nMy question: ${question}`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: fullPrompt }]
    });

    document.getElementById('answer').innerText = response.data.choices[0].message.content;
  } catch (err) {
    document.getElementById('answer').innerText = `❌ Error: ${err.message}`;
  }
}

window.askGPT = askGPT;
