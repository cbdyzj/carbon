import { NextApiRequest, NextApiResponse } from 'next'
import { CarbonApp, CarbonKey, Locale, LocaleText } from "@/model/CarbonApp"
import { read, update } from "@/api/natrium"
import { assert } from '@/utils/assert'

interface AddKeyPayload extends CarbonKey {
    appId: string
}

async function fetchCarbonApp(appId): Promise<CarbonApp> {
    const value = await read(appId)
    return JSON.parse(value)
}

async function handleAddKey(payload: AddKeyPayload) {
    const carbonApp: CarbonApp = await fetchCarbonApp(payload.appId)
    const carbonPage = carbonApp.pageList.find(it => it.pageCode === payload.pageCode)

    assert(carbonPage, 'carbon page not found')

    const carbonKey = carbonPage.keyList.find(it => it.key === payload.key);
    assert(!carbonKey, `carbon key: ${payload.key} exists`)

    const newKey = {
        key: payload.key,
        pageCode: payload.pageCode,
        original: payload.original,
        translation: payload.translation,
    }
    carbonPage.keyList.push(newKey)
    await update(payload.appId, JSON.stringify(carbonApp))
}

type UpdateKeyPayload = AddKeyPayload

function mergeLocaleText(targetList: LocaleText[], sourceList?: LocaleText[]) {
    if (!sourceList || !sourceList.length) {
        return
    }
    const targetLocaleTextMap = new Map
    targetList.forEach(it => targetLocaleTextMap.set(it.locale, it))

    for (const sourceLocaleText of sourceList) {

        if (targetLocaleTextMap.has(sourceLocaleText.locale)) {
            const targetLocaleText = targetLocaleTextMap.get(sourceLocaleText.locale)
            targetLocaleText.text = sourceLocaleText.text
        } else {
            targetList.push(sourceLocaleText)
        }
    }
}

async function handleUpdateKey(payload: UpdateKeyPayload) {
    const carbonApp: CarbonApp = await fetchCarbonApp(payload.appId)

    const carbonPage = carbonApp.pageList.find(it => it.pageCode === payload.pageCode)

    assert(carbonPage, 'carbon page not found')

    const carbonKey = carbonPage.keyList.find(it => it.key === payload.key);
    assert(carbonKey, `carbon key: ${payload.key} not found`)

    if (!carbonKey.original) {
        carbonKey.original = []
    }
    mergeLocaleText(carbonKey.original, payload.original)
    if (!carbonKey.translation) {
        carbonKey.translation = []
    }
    mergeLocaleText(carbonKey.translation, payload.translation)
    await update(payload.appId, JSON.stringify(carbonApp))
}

interface GetKeyTranslationQuery {
    appId: string
    key: string
    locale: Locale
}

async function handleGetKeyTranslation(query: GetKeyTranslationQuery) {
    const carbonApp: CarbonApp = await fetchCarbonApp(query.appId)
    const localeText = carbonApp?.pageList
        ?.flatMap(it => it?.keyList)
        ?.find(it => it.key === query.key)
        ?.translation?.find(it => it.locale === query.locale)
    if (!localeText) {
        return {}
    }
    return localeText
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'POST':
                await handleAddKey(req.body)
                res.status(200).end()
                break
            case 'PUT':
                await handleUpdateKey(req.body)
                res.status(200).end()
                break
            case 'GET':
                const result = await handleGetKeyTranslation(req.query as any)
                res.status(200).send(result)
                break
            default:
                res.status(404).end()
        }
    } catch (err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}
