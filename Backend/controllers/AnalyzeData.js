const { validationResult } = require("express-validator");
const { createClient } = require("redis");
const cheerio = require("cheerio");
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


const getRedisClient = async () => {
  const client = createClient({
  username: "default",
  password: "<redis_key_here>", 
  socket: {
    host: "redis-14325.crce220.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 14325,
  },
});

client.on("error", (err) => console.error("Redis Client Error:", err));

await client.connect();

return client;
}

const ParseURL = async (url) => {
  try {
    console.log("Fetching:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    $("script, style, nav, footer, header, noscript, svg, form, iframe").remove();

    const importantTags = [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "li", "blockquote", "article", "section", "span"
    ];

    const content = [];

    $(importantTags.join(",")).each((i, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (text) { 
        content.push(text);
      }
    });

    const uniqueContent = [...new Set(content)];
    return { allContent: uniqueContent };

  } catch (error) {
    console.error("Error parsing URL:", error);
    throw new Error("Failed to fetch or parse URL");
  }
};

module.exports.AnalyzeData = async (req, res) => {
  // const client = await getRedisClient();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

 const { domain, url } = req.body;

  try {
    // const cachedData = await client.get(domain);
    // if (cachedData) {
    //   console.log("Cache hit for domain:", domain);
    //   return res.json({ reply: cachedData });
    // }

    const data = await ParseURL(url);
    const Prompt = process.env.PROMPT;

    if (!data || !Prompt) {
      return res.status(400).json({ error: "Both data and prompt are required" });
    }

    const finalPrompt = `${data.allContent.join("\n\n")}\n\n$`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: "system", content: process.env.PROMPT},
        { role: "user", content: finalPrompt },
      ],
      temperature: 0.7,
    });
    console.log(completion);
    
    const reply = completion.choices[0].message.content;

    // await client.set(domain, reply, {
    //   EX: 15 * 24 * 60 * 60, // 15 days
    // });

    res.json({ reply });
  } catch (error) {
    console.error("Error in AnalyzeData:", error);
    res.status(500).json({ error: "Error analyzing data" });
  }
};
