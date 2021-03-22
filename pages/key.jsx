import Head from 'next/head'
import Markdown from '../components/Markdown'
import LocaleSelect from '../components/LocaleSelect'
import CarbonHead from '../components/CarbonHead'
import { assert } from '../utils/assert'
import { withErrorHandling } from '../utils/error'
import { getApp } from '../api/natrium'
import Button from '../components/Button'
import { useState } from 'react'
import { updateApp } from '../api/carbon'

function OriginalBlock(props) {

    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [inputValue, setInputValue] = useState(props.original)

    async function handleClickEditingButton(ev) {
        if (!editing) {
            setEditing(true)
        } else {
            setSaving(true)
            if (inputValue !== props.original) {
                await props.updateOriginal(inputValue)
            }
            setSaving(false)
            setEditing(false)
        }
    }

    function handleClickCancelButton(ev) {
        setInputValue(props.original)
        setEditing(false)
    }

    function handleInputChange(ev) {
        setInputValue(ev.target.value)
    }

    function getEditingButtonText() {
        if (saving) {
            return '保存中...'
        }
        return editing ? '保存' : '编辑'
    }

    return (
        <>
            <div className="mb-1">
                {(editing && !saving) && (
                    <>
                        <Button onClick={handleClickCancelButton}>取消</Button>
                        <span className="mx-1">|</span>
                    </>
                )}
                <Button onClick={handleClickEditingButton} disabled={saving}>{getEditingButtonText()}</Button>
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
                <select value={selectedLocale} onChange={handleSelectChange}>
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

function getCarbonKey(app, key) {
    function getPageName(code) {
        return app.pageList.find(it => it.code === code)?.name ?? ''
    }

    const originalKey = app.pageList
        .map(it => it.keyList)
        .filter(it => Array.isArray(it))
        .flatMap(it => it)
        .find(it => it.key === key)

    assert(typeof originalKey === 'object', 'key not found')
    assert(originalKey.original, 'key original must be not null')

    return {
        ...originalKey,
        pageName: getPageName(originalKey.pageCode),
    }
}

export default function Key(props) {

    const [app, setApp] = useState(props.app)
    const [carbonKey, setCarbonKey] = useState(props.carbonKey)

    function getOriginalKey() {
        return app.pageList
            .map(it => it.keyList)
            .filter(it => Array.isArray(it))
            .flatMap(it => it)
            .find(it => it.key === carbonKey.key)
    }

    async function updateOriginal(newOriginal) {
        const key = carbonKey.key
        const originalKey = getOriginalKey()
        originalKey.original = newOriginal
        const newApp = { ...app }
        const result = await updateApp(newApp)
        if (result && result.error) {
            alert(result.error)
            return
        }
        setApp(newApp)
        setCarbonKey(getCarbonKey(newApp, key))
    }

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
                <OriginalBlock original={carbonKey.original} updateOriginal={updateOriginal} />

                <h3 id="译文">译文</h3>
                <TranslationBlock localeList={app.localeList} translation={carbonKey.translation ?? []} />

                {/* locale */}
                <hr />
                <LocaleSelect />
            </Markdown>

        </div>
    )
}


export const getServerSideProps = withErrorHandling(async function (ctx) {
    const { appId, key } = ctx.query

    if (!appId) {
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

    const carbonKey = getCarbonKey(app, key)

    return {
        props: {
            app,
            carbonKey,
        }
    }
})