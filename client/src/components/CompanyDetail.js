import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { companies } from '../fake-data';
import { getCompanyById } from '../graphql/queries';

function CompanyDetail() {
  const { companyId } = useParams();

  const [company, setCompany] = useState();

  const getCompany = async () => {
    const data = await getCompanyById(companyId);
    setCompany(data.company);
  }

  useEffect(() => {
    getCompany();
  }, []);

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
    </div>}
    </>
  );
}

export default CompanyDetail;
