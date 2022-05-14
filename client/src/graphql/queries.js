import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { request } from 'graphql-request';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const JOB_FRAGMENT = gql`
    fragment JobFragment on Job {
        id,
        title,
        company {
            name
        }
    }
`;

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    defaultOptions: { // defaultOptions can be used if all queries or mutations needs to be configured at once (globally)
        query: {
            fetchPolicy: "cache-first"
        },
        mutate: {
            fetchPolicy: "cache-first"
        }
    }
});

export function getJobs() {
    try {
        const query = gql`
        query {
            jobs {
                ...JobFragment
            }
        }
        ${JOB_FRAGMENT}
        `;

        // no-cache is used when data is not meant to be saved in memory. Default value for fetchPolicy is "catch-first"
        return client.query({ query, fetchPolicy: "network-only" })
            .then(res => res.data)
            .catch(error => {
                return {
                    error
                }
            });
    } catch (error) {
        return {
            error
        }
    }


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
        .then(data => data)
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

    const variables = { id: companyId };

    return client.query({ query, variables })
        .then(res => res.data)
        .catch(error => {
            return {
                error
            }
        });
}

export function createJobWithInput({ title, description, companyId }) {

    // $id is a variable
    const mutation = gql`
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

    const variables = {
        input: {
            title,
            description,
            companyId
        }
    };

    const headers = {
        'Authorization': 'Bearer ' + getAccessToken()
    }

    const context = { headers }; // context is used to configure http requests sent by the client

    return client.mutate({ mutation, variables, context })
        .then(res => res.data)
        .catch(error => {
            return {
                error
            }
        });

}
