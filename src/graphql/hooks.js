import { useMutation, useQuery } from "@apollo/client";
import { getAccessToken } from "../auth";
import {
  COMPANY_QUERY,
  CREATE_JOB_MUTATION,
  JOBS_QUERY,
  JOB_QUERY,
} from "./queries";

export function useJob(id) {
  const { data, error, loading } = useQuery(JOB_QUERY, {
    variables: { id },
  });
  return {
    job: data?.job,
    error,
    loading,
  };
}

export function useJobs() {
  const { data, error, loading } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  return {
    jobs: data?.jobs,
    error,
    loading,
  };
}

export function useCreateJob() {
  const [mutate, { loading }] = useMutation(CREATE_JOB_MUTATION);
  return {
    createJob: async (title, description) => {
      const { data: { job } } = await mutate({
        variables: { input: { title, description } },
        context: {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        },
        update: (cache, { data: { job } }) => {
          cache.writeQuery({
            query: JOB_QUERY,
            variables: { id: job.id },
            data: { job },
          });
        },
      });
      return job;
    },
    loading
  };
}

export function useCompany(companyId) {
  const { data, error, loading } = useQuery(COMPANY_QUERY, {
    variables: { companyId },
  });
  return {
    company: data?.company,
    error,
    loading,
  };
}
