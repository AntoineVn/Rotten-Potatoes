import Header from '../components/Header/Header'
import Head from 'next/head'

function favorites() {
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

export default favorites
