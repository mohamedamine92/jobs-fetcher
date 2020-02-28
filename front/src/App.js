import React from "react";
import "./App.css";
import Jobs from "./Jobs";

const JOB_API_URL = "http://localhost:3001/api/jobs";

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  console.log(res);
  const json = await res.json();
  updateCb(json);
}

function App() {
  const [jobsList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  return (
    <div className="App">
      <Jobs jobs={jobsList} />
    </div>
  );
}

export default App;
