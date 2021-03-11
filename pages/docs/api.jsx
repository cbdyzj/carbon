import Head from 'next/head'
import Markdown from '../../components/Markdown'

export default function Api(props) {
    return (
        <div>
            <Head>
                <title>API Reference | carbon</title>
            </Head>

            <Markdown page>{props.text}</Markdown>
        </div>
    )
}

async function fetchText(input) {
    const response = await fetch(input)
    return await response.text()
}

export async function getServerSideProps(ctx) {

    return {
        props: {
            text: await fetchText('https://organism.vercel.app/docs/API.md')
        }
    }
}
