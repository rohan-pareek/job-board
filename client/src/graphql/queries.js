import { request, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

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
    .catch(error => {
        return {
            error
        }
    });
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
    .catch(error => {
        return {
            error
        }
    });
}

export function getCompanyById(companyId) {

    // $id is a variable
    const query = gql`
        query CompanyQuery($id: ID!) {
            company(id: $id) {
                id,
                name,
                description,
                jobs {
                    id,
                    title
                }
            }
        }
    `;

    const variables = {id: companyId};

    return request(GRAPHQL_URL, query, variables)
    .then(data=>data)
    .catch(error => {
        return {
            error
        }
    });
}

export function createJobWithInput({title, description, companyId}) {

    // $id is a variable
    const query = gql`
        mutation CreateJobWithInput($input: CreateJobInput!) {
            job: createJobWithInput(input: $input) {
                id,
                title,
                company {
                    id,
                    name
                }
            }
        }
    `;

    const variables = {input: {
        title,
        description,
        companyId
    }};

    const headers = {
        'Authorization': 'Bearer ' + getAccessToken()
    }

    return request(GRAPHQL_URL, query, variables, headers)
    .then(data=>data)
    .catch(error => {
        return {
            error
        }
    });
}
