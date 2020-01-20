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
  // const { query } = useRouter();
  // const { data, error } = useSWR(
  //   `/api/symbol_autocomplete${query.q ? '?q=' + query.q : ''}`,
  //   fetcher
  // );
  // // The following line has optional chaining, added in Next.js v9.1.5,
  // // is the same as `data && data.author`
  // const symbol = data?.symbol;
  // let securityName = data?.security_name;

  // if (!data) securityName = 'Loading...';
  // if (error) securityName = 'Failed to fetch the company.';

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