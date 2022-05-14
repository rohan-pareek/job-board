import { useJobs } from '../graphql/hooks';
import JobList from './JobList';

function JobBoard() {

  const { jobs, error, loading } = useJobs();

  if (loading) {
    return <p>Fetching Jobs...</p>
  }

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
