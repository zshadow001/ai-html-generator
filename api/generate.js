export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: `Generate only clean HTML+CSS code. No explanation. Task: ${prompt}`
    })
  });

  const data = await response.json();

  let code = data.output[0].content[0].text;

  res.status(200).json({ code });
}
