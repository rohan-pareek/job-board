import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getJobById } from '../graphql/queries';

function JobDetail() {
  const { jobId } = useParams();

  const [job, setJob] = useState();
  const [error, setError] = useState('');

  const getJob = useCallback(async () => {
    const data = await getJobById(jobId);
    if (data.error) {
      setError(data.error);
    } else {
      setJob(data.job);
    }
  }, [jobId])

  useEffect(() => {
    getJob();
  }, [getJob]);

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      {job && <div>
        <h1 className="title">
          {job.title}
        </h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>
            {job.company.name}
          </Link>
        </h2>
        <div className="box">
          {job.description}
        </div>
      </div>}
    </>
  );
}

export default JobDetail;
