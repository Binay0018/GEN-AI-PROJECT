import { Navigate, useParams } from 'react-router';

const LegacyInterviewRedirect = () => {
  const { interviewId } = useParams();
  return <Navigate to={`/report/${interviewId}`} replace />;
};

export default LegacyInterviewRedirect;
