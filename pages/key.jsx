import Head from 'next/head'
import Markdown from '../components/Markdown'
import LocaleSelect from '../components/LocaleSelect'
import CarbonHead from '../components/CarbonHead'
import { assert } from '../utils/assert'
import { withErrorHandling } from '../utils/error'
import { getApp } from '../api/natrium'
import Button from '../components/Button'
import { useState } from 'react'

function OriginalBlock(props) {

    const localeTextList = props.original

    const [editing, setEditing] = useState(false)

    const [selectedLocale, setSelectedLocale] = useState(localeTextList[0].locale)

    const selectedLocaleText = localeTextList.find(it => it.locale === selectedLocale)

    const [inputValue, setInputValue] = useState(selectedLocaleText.text)

    function handleClickEdit(ev) {
        setEditing(!editing)
    }

    function handleInputChange(ev) {
        setInputValue(ev.target.value)
    }

    function handleSelectChange(ev) {
        const newSelectedLocale = ev.target.value
        setSelectedLocale(newSelectedLocale)
        setInputValue(localeTextList.find(it => it.locale === newSelectedLocale).text)
        setEditing(false)
    }

    return (
        <>
            <div className="mb-1">
                <select className="w-20" value={selectedLocale} onChange={handleSelectChange}>
                    {localeTextList.map(it => {
                        return (
                            <option key={it.locale} value={it.locale}>
                                {it.locale}
                            </option>
                        )
                    })}
                </select>
                <span className="mx-1">|</span>
                <Button onClick={handleClickEdit}>{editing ? '保存' : '编辑'}</Button>
            </div>

            <input type="text" className={`border-b outline-none ${editing ? 'bg-blue-50' : ''}`}
                   value={inputValue} onChange={handleInputChange} readOnly={!editing} />
        </>
    )
}

function TranslationBlock(props) {

    const localeList = props.localeList
    const localeTextList = props.translation

    const [editing, setEditing] = useState(false)

    const [selectedLocale, setSelectedLocale] = useState(localeList[0])

    const selectedLocaleText = localeTextList.find(it => it.locale === selectedLocale)

    const [inputValue, setInputValue] = useState(selectedLocaleText?.text ?? '')

    function handleClickEdit(ev) {
        setEditing(!editing)
    }

    function handleInputChange(ev) {
        setInputValue(ev.target.value)
    }

    function handleSelectChange(ev) {
        const newSelectedLocale = ev.target.value
        setSelectedLocale(newSelectedLocale)
        setInputValue(localeTextList.find(it => it.locale === newSelectedLocale)?.text ?? '')
        setEditing(false)
    }

    return (
        <>
            <div className="mb-1">
                <select className="w-20" value={selectedLocale} onChange={handleSelectChange}>
                    {localeList.map(it => {
                        return (
                            <option key={it} value={it}>
                                {it}
                            </option>
                        )
                    })}
                </select>
                <span className="mx-1">|</span>
                <Button onClick={handleClickEdit}>{editing ? '保存' : '编辑'}</Button>
                {!selectedLocaleText && (
                    <>
                        <span className="mx-1">|</span>
                        <span>未翻译</span>
                    </>
                )}
            </div>

            <input type="text" className={`border-b outline-none ${editing ? 'bg-blue-50' : ''}`}
                   value={inputValue} onChange={handleInputChange} readOnly={!editing} />
        </>
    )
}

export default function Key(props) {

    const { carbonKey } = props
    assert(carbonKey, 'carbon key must be not null')
    assert(carbonKey.original, 'key original must be not null')
    assert(carbonKey.original.length > 0, 'key original locale text must not be empty')

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
                    <li>说明：{carbonKey.description ?? ''}</li>
                </ul>

                <h3 id="原文">原文</h3>
                <OriginalBlock original={carbonKey.original} />

                <h3 id="译文">译文</h3>
                <TranslationBlock localeList={props.localeList} translation={carbonKey.translation ?? []} />

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