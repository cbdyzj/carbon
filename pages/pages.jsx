import Head from 'next/head'
import Markdown from '../components/Markdown'
import LocaleSelect from '../components/LocaleSelect'
import CarbonHead from '../components/CarbonHead'
import { getApp } from '../api/natrium'
import { withErrorHandling } from '../utils/error'
import Button from '../components/Button'

function getPageList(app = {}) {
    if (!Array.isArray(app.pageList)) {
        return []
    }
    return app.pageList.map(it => {
        return {
            code: it.code,
            name: it.name,
            description: it.description,
            keyCount: it.keyList?.length ?? 0,
        }
    })
}

export default function Pages(props) {

    function handleClickCreatePage(ev) {
    }

    const pageList = getPageList(props.app)

    return (
        <div>
            <Head>
                <title>Pages - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />
                <h2 id="页面列表">页面列表</h2>

                <div className="mb-1">
                    <span>共5个页面，共15个Key</span>
                    <span className="mx-1">|</span>
                    <Button onClick={handleClickCreatePage}>新建页面</Button>
                </div>

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
                    {pageList.map(it => {
                        return (
                            <tr key={it.code}>
                                <td>{it.name}</td>
                                <td>{it.code}</td>
                                <td>共{it.keyCount}个Key</td>
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
