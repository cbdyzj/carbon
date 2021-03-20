import Head from 'next/head'
import LocaleSelect from '../components/LocaleSelect'
import Markdown from '../components/Markdown'
import CarbonHead from '../components/CarbonHead'
import { withErrorHandling } from '../utils/error'
import { getApp } from '../api/natrium'

function getKeyList(app) {
    if (!Array.isArray(app.pageList)) {
        return []
    }

    function getPageName(code) {
        return app.pageList.find(it => it.code === code)?.name ?? ''
    }

    return app.pageList
        .map(it => it.keyList)
        .filter(it => Array.isArray(it))
        .flatMap(it => it)
        .map(it => {
            return {
                key: it.key,
                pageCode: it.pageCode,
                pageName: getPageName(it.pageCode),
                url: `/key?appId=${app.id}&key=${it.key}`,
                description: it.description ?? ''
            }
        })
}

export default function Keys(props) {

    function handleClickCreateKey(ev) {
        ev.preventDefault()
    }

    const keyList = getKeyList(props.app)

    return (
        <div>
            <Head>
                <title>Keys - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />
                <h2 id="key列表">Key列表</h2>

                <div className="mb-1">
                    <span>共{keyList.length}个Key</span>
                    <span className="mx-1">|</span>
                    <a href="#" onClick={handleClickCreateKey}>新增Key</a>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>Key</th>
                        <th>页面</th>
                        <th>说明</th>
                    </tr>
                    </thead>
                    <tbody>
                    {keyList.map(it => {
                        return (
                            <tr key={it.key}>
                                <td><a href={it.url}>{it.key}</a></td>
                                <td>{it.pageName}</td>
                                <td>{it.description}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {/* locale */}
                <hr />
                <LocaleSelect />
            </Markdown>
        </div>
    )
}

export const getServerSideProps = withErrorHandling(async function (ctx) {
    const { appId } = ctx.query

    if (!appId) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const app = await getApp(appId)
    return {
        props: {
            app,
        }
    }
})