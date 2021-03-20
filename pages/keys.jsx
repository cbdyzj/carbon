import Head from 'next/head'
import LocaleSelect from '../components/LocaleSelect'
import Markdown from '../components/Markdown'
import CarbonHead from '../components/CarbonHead'
import { withErrorHandling } from '../utils/error'
import { getApp } from '../api/natrium'
import { useState } from 'react'
import Modal from '../components/Modal'
import Button from '../components/Button'

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

    const [modalVisible, setModalVisible] = useState(false)

    function handleClickCreateKey(ev) {
        setModalVisible(true)
    }

    const keyList = getKeyList(props.app)
    const pageList = (props.app.pageList ?? []).map(it => {
        return {
            code: it.code,
            name: it.name,
        }
    })

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
                    <Button onClick={handleClickCreateKey}>新增Key</Button>
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
            <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <div className="bg-white border border-white shadow p-4">
                    <h3 className="font-medium">新增Key</h3>
                    <div className="mt-2">
                        <span className="inline-block w-1/5">Key: </span>
                        <input className="border-b outline-none inline-block w-4/5" type="text" />
                    </div>
                    <div className="mt-2">
                        <span className="inline-block w-1/5">页面: </span>
                        <select className="inline-block w-4/5">
                            {pageList.map(it => {
                                return (
                                    <option key={it.code} value={it.code}>{it.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mt-2">
                        <span className="inline-block w-1/5">说明: </span>
                        <input className="border-b outline-none inline-block w-4/5" type="text" />
                    </div>

                    <div className="mt-2">
                        <Button onClick={() => setModalVisible(false)}>取消</Button>
                        <Button className="ml-1" onClick={() => setModalVisible(false)}>确认</Button>
                    </div>

                </div>
            </Modal>
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