import { useQuery } from "@apollo/client";
import { JOBS_QUERY, JOB_QUERY } from "./queries";

export function useJob(id) {
  const { data, error, loading } = useQuery(JOB_QUERY, {
    variables: { id }
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
