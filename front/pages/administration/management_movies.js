import Header from '../../components/Header/Header'
import Head from 'next/head'

function management_movies() {
    return (
        <div>
            <Head>
                <title>RottenPotatoes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
        </div>
    )
}

export default management_movies
