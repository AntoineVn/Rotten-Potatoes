import Head from 'next/head'
import Header from '../components/Header/Header'
import Nav from '../components/Users/Nav'
import Results from '../components/Users/Results'
import requests_back from '../utils/requests_back'

export default function Home({ results }) {
  console.log(results)  
  return (
    <div>
      <Head>
        <title>RottenPotatoes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />

      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  
  const request = await fetch(
    `http://localhost:4000${requests_back[genre]?.url || requests_back.All.url }`
  ).then((res) => res.json());

  return {
    props: {
      results: request,
    },
  };
}
