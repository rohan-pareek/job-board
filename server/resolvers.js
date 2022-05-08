import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        job: (_root, args) => Job.findById(args.id),
        company: (_root, args) => Company.findById(args.id),
        jobs: () => Job.findAll()
    },

    Job: {
        company: (job) =>  Company.findById(job.companyId)
    }
}
