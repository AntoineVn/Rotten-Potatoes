import Header from '../../components/Header/Header'
import Nav_admin from '../../components/Admin/Nav_admin'
import Results_admin from '../../components/Admin/Results_admin'
import requests from '../../utils/requests'
import Head from 'next/head'
import useLocalStorage from '../../hooks/useLocalstorage';
import { useRouter } from "next/router";

export default function Home({ results }) {
  const [role, setRole] = useLocalStorage("role", null); 
  
  const router = useRouter()

  const back = () => {
    router.push('/')
  }

  console.log(results)  
  return (
    <div>
      <Head>
        <title>RottenPotatoes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      { role != "admin" && (
        <div className="flex flex-col">
          <h1 className="text-center text-5xl text-red-600">Unauthorized </h1>
          
          <button 
            className="ml-auto mr-auto mt-20 w-40 rounded text-xl 
                  bg-white text-red-500 hover:text-red-600" 
            onClick={back}
          >
            Back to Home
          </button>
        </div>
      )}
      { role == "admin" && (
        <div>
          <Nav_admin />
          <Results_admin results={results}/>
        </div>
      )}
      
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results
    }
  }
}