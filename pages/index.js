// import { useRouter } from 'next/router';
// import useSWR from 'swr';
import { Container } from '@material-ui/core';
import Layout from '../components/Layout';
import Header from '../components/Header';
import StockAutocomplete from '../components/StockAutocomplete';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Index() {
  return (
    <Layout>
      <Header />
      <Container maxWidth="lg">
        <main className="center">
          <StockAutocomplete />
        </main>
        <style jsx>{`
          main {
            width: 90%;
            margin: 50px auto;
          }
        `}</style>
      </Container>
    </Layout>
  );
}