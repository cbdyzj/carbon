import Head from 'next/head'
import Markdown from '../components/Markdown'
import LocaleSelect from '../components/LocaleSelect'
import CarbonHead from '../components/CarbonHead'

export default function Pages() {
    // noinspection HtmlUnknownTarget
    return (
        <div>
            <Head>
                <title>Pages - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />
                <h2 id="页面列表">页面列表</h2>
                <p>共5个页面，共15个Key</p>
                <table>
                    <thead>
                    <tr>
                        <th>页面</th>
                        <th>页面编号</th>
                        <th>Key</th>
                        <th>说明</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Index</td>
                        <td>index</td>
                        <td>共2个Key</td>
                        <td>Index page</td>
                    </tr>
                    <tr>
                        <td>APP List</td>
                        <td>app_list</td>
                        <td>共3个Key</td>
                        <td>Application list</td>
                    </tr>
                    <tr>
                        <td>Page List</td>
                        <td>page_list</td>
                        <td>共4个Key</td>
                        <td>Page list of the application</td>
                    </tr>
                    <tr>
                        <td>Key List</td>
                        <td>key_list</td>
                        <td>共5个Key</td>
                        <td>Key list</td>
                    </tr>
                    <tr>
                        <td>API doc</td>
                        <td>api_doc</td>
                        <td>共1个Key</td>
                        <td>API doc</td>
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