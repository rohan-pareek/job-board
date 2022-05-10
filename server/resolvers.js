import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        job: (_root, args) => Job.findById(args.id),
        company: (_root, args) => Company.findById(args.id),
        jobs: () => Job.findAll()
    },

    Mutation: {
        createJob: (_root, args) => Job.create({ title: args.title, companyId: args.companyId, description: args.description }),
        createJobWithInput: (_root, args) => Job.create(args.input)
    },

    Job: {
        company: (job) => Company.findById(job.companyId)
    },

    Company: {
        jobs: (company) => Job.findAll(job => job.companyId === company.id)
    }
}
