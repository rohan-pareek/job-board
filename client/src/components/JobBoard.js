import JobList from './JobList';
import { useEffect, useState } from 'react';
import { getJobs } from '../graphql/queries';

function JobBoard() {

  const [jobs, setJobs] = useState([]);

  const getAllJobs = async () => {
    const data = await getJobs();
    setJobs(data.jobs);
  }

  useEffect(()=>{
    getAllJobs(); 
  }, []);
  
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
