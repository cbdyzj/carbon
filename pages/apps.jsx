import Head from 'next/head'
import Markdown from '../components/Markdown'
import LocaleSelect from '../components/LocaleSelect'
import CarbonHead from '../components/CarbonHead'


export default function Apps() {
    // noinspection HtmlUnknownTarget
    return (
        <div>
            <Head>
                <title>Apps - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead/>
                <h2 id="应用列表">应用列表</h2>
                <table>
                    <thead>
                    <tr>
                        <th>APP名称</th>
                        <th>APP ID</th>
                        <th>页面</th>
                        <th>Key</th>
                        <th>说明</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><a href="https://carbonium.vercel.app/">carbon</a></td>
                        <td>carbon</td>
                        <td><a href="/pages?appId=carbon">共5个页面</a></td>
                        <td><a href="/keys?appId=carbon">共15个Key</a></td>
                        <td>国际化资源小工具</td>
                    </tr>
                    <tr>
                        <td><a href="https://natrium.herokuapp.com/">natrium</a></td>
                        <td>natrium</td>
                        <td><a href="/pages?appId=natrium">共0个页面</a></td>
                        <td><a href="/keys?appId=natrium">共0个Key</a></td>
                        <td>电报机器人：nano</td>
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