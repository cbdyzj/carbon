import Head from 'next/head'
import Markdown from '../../components/Markdown'
import marked from 'marked'
import LocaleSelect from '../../components/LocaleSelect'
import CarbonHead from '../../components/CarbonHead'

export default function Api(props) {
    return (
        <div>
            <Head>
                <title>API Reference | carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />
                <div dangerouslySetInnerHTML={{ __html: marked(props.text) }} />
                <hr />
                <LocaleSelect />
            </Markdown>
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
            text: await fetchText('https://charcoal.vercel.app/docs/API.md')
        }
    }
}
