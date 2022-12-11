import { useJobs } from "../graphql/hooks";
import JobList from "./JobList";

function JobBoard() {
  const { jobs, error, loading } = useJobs();

  if (error) {
    return <p>Sorry, something went wrong.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
