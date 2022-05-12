import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        job: (_root, args) => Job.findById(args.id),
        company: (_root, args) => Company.findById(args.id),
        jobs: () => Job.findAll()
    },

    Mutation: {
        createJob: (_root, args, context) => {
            if(!context.auth) {
                throw new Error("Unauthorized");
            }
            return Job.create({ title: args.title, companyId: args.companyId, description: args.description });
        },
        createJobWithInput: (_root, args, context) => {
            if(!context.auth) {
                throw new Error("Unauthorized");
            }
            return Job.create(args.input);
        }
    },

    Job: {
        company: (job) => Company.findById(job.companyId)
    },

    Company: {
        jobs: (company) => Job.findAll(job => job.companyId === company.id)
    }
}
