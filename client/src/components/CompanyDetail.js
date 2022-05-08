import { useParams } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import { getCompanyById } from '../graphql/queries';
import JobList from './JobList';

function CompanyDetail() {
  const { companyId } = useParams();

  const [company, setCompany] = useState();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  const getCompany = useCallback(async () => {
    const data = await getCompanyById(companyId);
    if (data.error) {
      setError(data.error);
    } else {
      setCompany(data.company);
      setJobs(data.company.jobs);
    }
  }, [companyId]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      {company &&
        <div>
          <h1 className="title">
            {company.name}
          </h1>
          <div className="box">
            {company.description}
          </div>
          <h5>Jobs at {company.name}</h5>
          <JobList jobs={jobs} />
        </div>}
    </>
  );
}

export default CompanyDetail;
