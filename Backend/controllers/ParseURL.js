const { validationResult } = require("express-validator");
const cheerio = require("cheerio");

module.exports.ParseURL = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { url } = req.body;
    console.log("Fetching:", url);

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch URL" });
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
      if (text) { // ignore very short fragments
        content.push(text);
      }
    });

    const uniqueContent = [...new Set(content)];

    return res.json({
      allContent: uniqueContent,
    });

  } catch (error) {
    console.error("Error parsing URL:", error);
    return res.status(500).json({ error: "Server error while parsing URL" });
  }
};
