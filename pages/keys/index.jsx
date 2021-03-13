import Head from 'next/head'
import LocaleSelect from '../../components/LocaleSelect'
import Markdown from '../../components/Markdown'
import CarbonHead from '../../components/CarbonHead'
import { useRouter } from 'next/router'

export default function Keys(props) {

    const router = useRouter()
    const { appId } = router.query

    // noinspection HtmlUnknownTarget
    return (
        <div>
            <Head>
                <title>Keys - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />
                <h2 id="key列表">Key列表</h2>
                <p>共15个Key</p>
                <table>
                    <thead>
                    <tr>
                        <th>Key</th>
                        <th>页面</th>
                        <th>类型</th>
                        <th>说明</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><a href="/keys/key.home.greeting">key.home.greeting</a></td>
                        <td>Index</td>
                        <td>文本</td>
                        <td>Hello</td>
                    </tr>
                    <tr>
                        <td><a href="/keys/key.home.description">key.home.description</a></td>
                        <td>Index</td>
                        <td>富文本（Markdown）</td>
                        <td>描述</td>
                    </tr>
                    </tbody>
                </table>

                {/* locale */}
                <hr />
                <LocaleSelect />
            </Markdown>
        </div>
    )
}
