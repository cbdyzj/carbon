import Head from 'next/head'
import LocaleSelect from '../components/LocaleSelect'
import Markdown from '../components/Markdown'

export default function KeyList() {
    return (
        <div>
            <Head>
                <title>Key List | carbon</title>
            </Head>
            <Markdown page>
                <h1>Key列表</h1>
                {/* locale */}
                <hr />
                <LocaleSelect />
            </Markdown>
        </div>
    )
}