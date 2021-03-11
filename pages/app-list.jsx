import Head from 'next/head'
import Markdown from '../components/Markdown'

export default function AppList() {
    return (
        <div>
            <Head>
                <title>APP List | carbon</title>
            </Head>

            <main>
                <h1>APP list</h1>
                <Markdown>
                    <div>hello</div>
                </Markdown>
            </main>

            <footer>

            </footer>
        </div>
    )
}