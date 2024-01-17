import buildClient from '@/api/build-client';
import Container from '@/components/ui/container';

const LandingPage = ({ currentUser }: any) => {
  return (
    <Container>
      {currentUser ? <h1>Your are signed in</h1> : <h1>Please sign in</h1>}
    </Container>
  )
};

LandingPage.getInitialProps = async (context: any) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
