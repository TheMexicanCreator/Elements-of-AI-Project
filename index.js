import { Configuration, OpenAIApi } from "openai";
import express  from "express";
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
    organization: "org-l9AgGIvjaOs9BsT6y9mD3IHy",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express()

app.use(bodyParser.json())
app.use(cors())
const port = 3080

app.post('/', async (req, res) => {
    const {message} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      res.json({
        message: response.data.choices[0].text,
      })
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});