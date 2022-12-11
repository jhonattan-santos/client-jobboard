import { useQuery } from "@apollo/client";
import { JOBS_QUERY } from "../graphql/queries";
import JobList from "./JobList";


function JobBoard() {
  const { data, error, loading } = useQuery(JOBS_QUERY, {
    fetchPolicy: 'network-only'
  });

  if (error) {
    return <p>Sorry, something went wrong.</p>
  }
  
  if (loading) {
    return <p>Loading...</p>
  }
  const { jobs } = data;
  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
