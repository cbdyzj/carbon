import Head from 'next/head'
import Markdown from '../components/Markdown'
import LocaleSelect from '../components/LocaleSelect'

export default function PageList() {
    return (
        <div>
            <Head>
                <title>Page List | carbon</title>
            </Head>

            <Markdown page>
                <h2>页面列表</h2>
                {/* locale */}
                <hr />
                <LocaleSelect />
            </Markdown>
        </div>
    )
}