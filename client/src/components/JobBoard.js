import JobList from './JobList';
import { useEffect, useState } from 'react';
import { getJobs } from '../graphql/queries';

function JobBoard() {

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  const getAllJobs = async () => {
    const data = await getJobs();
    if (data.error) {
      setError(data.error);
    } else {
      setJobs(data.jobs);
    }
  }

  useEffect(() => {
    getAllJobs();
  }, []);

  if (error) {
    return <p>{error.message}</p>
  }

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
