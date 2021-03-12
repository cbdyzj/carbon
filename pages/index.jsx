import Head from 'next/head'
import Markdown from '../components/Markdown'
import LocaleSelect from '../components/LocaleSelect'

export default function Home() {

    // noinspection HtmlUnknownTarget
    return (
        <div>
            <Head>
                <title>carbon</title>
            </Head>

            <Markdown page>
                <h1 id="carbon"><a href="/">carbon</a></h1>
                <blockquote>
                    <p>国际化资源小工具</p>
                </blockquote>
                <p><a href="/app-list">进入应用列表</a></p>
                <h3 id="文档">文档</h3>
                <table>
                    <thead>
                    <tr>
                        <th>链接</th>
                        <th>说明</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><a href="/docs/api">API文档</a></td>
                        <td>支持HTTP API</td>
                    </tr>
                    <tr>
                        <td>Java SDK</td>
                        <td>0依赖，0侵入的Java SDK</td>
                    </tr>
                    <tr>
                        <td>JavaScript SDK</td>
                        <td>单个<code>&lt;script&gt;</code>标签完成集成的JS SDK</td>
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
