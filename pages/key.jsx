import Head from 'next/head'
import Markdown from '../components/Markdown'
import LocaleSelect from '../components/LocaleSelect'
import CarbonHead from '../components/CarbonHead'
import { assert } from '../utils/assert'
import { withErrorHandling } from '../utils/error'
import { getApp } from '../api/natrium'

function OriginalBlock(props) {

    const localeTextList = props.original

    function handleClickEdit(ev) {
        ev.preventDefault()
    }

    return (
        <>
            <div className="mb-1">
                <select defaultValue={localeTextList[0].locale}>
                    {localeTextList.map(it => {
                        return (
                            <option key={it.locale} value={it.locale}>
                                {it.locale}
                            </option>
                        )
                    })}
                </select>
                <span className="mx-1">|</span>
                <a href="#" onClick={handleClickEdit}>{'编辑'}</a>
            </div>

            <input type="text" value={localeTextList[0]?.text} readOnly />
        </>
    )
}

function TranslationBlock(props) {

    const localeList = props.localeList
    const localeTextList = props.translation

    function handleClickEdit(ev) {
        ev.preventDefault()
    }

    return (
        <>
            <div className="mb-1">
                <select defaultValue={localeList[0]}>
                    {localeList.map(it => {
                        return (
                            <option key={it} value={it}>
                                {it}
                            </option>
                        )
                    })}
                </select>
                <span className="mx-1">|</span>
                <a href="#" onClick={handleClickEdit}>{'编辑'}</a>
            </div>

            <input type="text" value={localeTextList[0]?.text} readOnly />
        </>
    )
}

export default function Key(props) {

    const { carbonKey } = props
    assert(carbonKey, 'carbon key must be not null')

    return (
        <div>
            <Head>
                <title>{carbonKey.key} - Keys - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />
                <h2 id="key">{carbonKey.key}</h2>
                <ul>
                    <li>页面：{carbonKey.pageName}</li>
                    <li>说明：{carbonKey.description || ''}</li>
                </ul>

                <h3 id="原文">原文</h3>
                <OriginalBlock original={carbonKey.original ?? []} />

                <h3 id="译文">译文</h3>
                <TranslationBlock localeList={props.localeList} translation={carbonKey.translation || []} />

                {/* locale */}
                <hr />
                <LocaleSelect />
            </Markdown>

        </div>
    )
}

export const getServerSideProps = withErrorHandling(async function (ctx) {
    const { appId, key } = ctx.query

    if (!appId || !key) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const app = await getApp(appId)
    assert(app, 'carbon app must be not null')
    assert(Array.isArray(app.pageList), 'pages must be not empty')

    function getPageName(code) {
        return app.pageList.find(it => it.code === code)?.name ?? ''
    }

    const originalKey = app.pageList
        .map(it => it.keyList)
        .filter(it => Array.isArray(it))
        .flatMap(it => it)
        .find(it => it.key === key)

    assert(typeof originalKey === 'object', 'key not found')

    return {
        props: {
            carbonKey: {
                ...originalKey,
                pageName: getPageName(originalKey.pageCode),
            },
            localeList: app.localeList,
        }
    }
})