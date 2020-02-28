const express = require("express");
const { initWorker } = require("../worker");
const asyncRedis = require("async-redis");
const options = {};
const client = asyncRedis.createClient("redis://localhost:6379", options);

const app = express();
const port = 3001;

initWorker();

app.get("/api/jobs", async (req, res) => {
  const jobs = await client.get("github");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  return res.send(jobs);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
