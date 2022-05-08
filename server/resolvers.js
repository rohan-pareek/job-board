import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        job: (root, args) => {
            return Job.findById(args.id)
        },
        company: (root, args) => {
            return Company.findById(args.id)
        },
        jobs: () => Job.findAll()
    },

    Job: {
        company: (job) =>  Company.findById(job.companyId)
    }
}
