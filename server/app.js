const express = require("express");
const session = require("express-session");
const path = require("path");
const MemoryStore = require("memorystore")(session);
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const { Client } = require("@notionhq/client");

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/build")));

const maxAge = 1000 * 60 * 5;
const sessionObj = {
  secret: "koseyeon",
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: maxAge }),
  cookie: {
    maxAge,
  },
};
app.use(session(sessionObj));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//const userDB = {};

app.get("/", (req, res) => {
  res.sendFile("index");
});

app.get("/auth/notion/callback", async (req, res) => {
  const code = req.query.code;
  // const authValue = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");
  if (code !== null) {
    const response = await axios({
      method: "POST",
      url: "https://api.notion.com/v1/oauth/token",
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
      headers: {
        // Authorization: `Basic ${authValue}`,
        "Content-Type": "application/json",
      },
      data: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/auth/notion/callback",
      },
    });
    //userDB[response.data.bot_id] = response.data.access_token;
    req.session.accessToken = response.data.access_token;
    res.redirect("http://localhost:3000/main");
  }
});
app.get("/main", async (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("/page", async (req, res) => {
  const accessToken = req.session.accessToken;
  if (accessToken) {
    const notion = new Client({ auth: accessToken });
    const response = await notion.search({
      filter: { property: "object", value: "page" },
    });
    const pageIds = [];
    response.results.forEach((result) => {
      if (result.object === "page") {
        pageIds.push(result.id);
      }
    });
    const pageContents = [];
    for (let i = 0; i < pageIds.length; i++) {
      const content = await notion.blocks.children.list({
        block_id: pageIds[i],
        page_size: 50,
      });
      pageContents.push(content);
    }
    res.status(200).json(pageContents);
  }
});
