import { gql, useQuery } from "@apollo/client";

const JOBS_QUERY = gql`
  query JobsQuery {
    jobs {
      id,
      title,
      company {
        name
      }
    }
  }
`;

export const useJobs = () => {

    const { data, error, loading } = useQuery(JOBS_QUERY, {
        fetchPolicy: 'network-only'
    });

    return {
        jobs: data?.jobs,
        error,
        loading
    }

}