import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>carbon</title>
            </Head>

            <main className={styles.main}>
                <h1>carbon</h1>
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}
