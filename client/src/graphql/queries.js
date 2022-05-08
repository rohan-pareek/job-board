import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export function getJobs() {
    const query = gql`
        {
            jobs {
                id,
                title,
                company {
                    name
                }
            }
        }
    `;

    return request(GRAPHQL_URL, query)
    .then(data=>data)
}

export function getJobById(jobId) {
    const query = gql`
        {
            job(id: "${jobId}") {
                id,
                title,
                description,
                company {
                    id,
                    name
                }
            }
        }
    `;

    return request(GRAPHQL_URL, query)
    .then(data=>data)
}

export function getCompanyById(companyId) {
    const query = gql`
        {
            company(id: "${companyId}") {
                id,
                name,
                description
            }
        }
    `;

    return request(GRAPHQL_URL, query)
    .then(data=>data)
}
