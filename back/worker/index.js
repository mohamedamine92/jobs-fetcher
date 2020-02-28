const CronJob = require("cron").CronJob;
const fetchGithub = require("./fetch-github");

module.exports = {
  initWorker: function() {
    // fetch github jobs
    const job = new CronJob(
      "0 12 * * *",
      fetchGithub,
      null,
      true,
      "Europe/Paris"
    );
    job.start();

    console.log("is job running? ", job.running);
  }
};
