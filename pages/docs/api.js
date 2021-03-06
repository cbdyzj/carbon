import Head from 'next/head'
import marked from 'marked'

const markdownContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const markdownBody = {
    margin: '10px 0 30px 0',
    width: '85%',
    maxWidth: '800px',
    fontSize: '19px',
}

export default function Api(props) {
    return (
        <div>
            <Head>
                <title>API Reference | carbon</title>
            </Head>

            <main style={markdownContainer}>
                <div style={markdownBody} className="markdown-body"
                     dangerouslySetInnerHTML={{ __html: marked(props.text) }}>
                </div>
            </main>

            <footer>

            </footer>
        </div>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch('https://organism.vercel.app/docs/API.md')
    const text = await response.text()
    return {
        props: { text }
    }
}
