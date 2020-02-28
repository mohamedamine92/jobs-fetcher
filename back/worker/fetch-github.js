"use strict";

const fetch = require("node-fetch");
const asyncRedis = require("async-redis");

const options = {};
const client = asyncRedis.createClient("redis://localhost:6379", options);
const baseURL = "https://jobs.github.com/positions.json";

async function fetchGithub() {
  console.log("fetching github ...");
  let numPage = 0;
  let nbResults = 1;
  let allJobs = [];
  while (nbResults > 0) {
    let res;
    try {
      res = await fetch(`${baseURL}?page=${numPage}`);
      const jobs = await res.json();
      allJobs.push(...jobs);
      nbResults = jobs.length;
      console.log(`got ${nbResults} jobs`);
      numPage++;
    } catch (err) {
      console.log("fetch github error", err);
      console.log("fetch github response", res);
      nbResults = 0;
    }
  }
  console.log(`got ${allJobs.length} all jobs`);

  client.set("github", JSON.stringify(allJobs));
}

module.exports = fetchGithub;
