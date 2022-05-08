import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobById } from '../graphql/queries';

function JobDetail() {
  const { jobId } = useParams();

  const [job, setJob] = useState();

  const getJob = async () => {
    const data = await getJobById(jobId);
    setJob(data.job);
  }

  useEffect(() => {
    getJob();
  }, []);

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
