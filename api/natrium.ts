// natrium carbon service
// https://natrium.herokuapp.com/
import { assert } from "@/utils/assert"
import { NANO_API_TOKEN } from '@/env'
import { CarbonApp, Locale, CarbonText } from "@/model/CarbonApp";

const CARBON_APP_API = 'https://natrium.herokuapp.com/api/carbon/app'
const CARBON_TEXT_API = 'https://natrium.herokuapp.com/api/carbon/text'

export async function createApp(app: CarbonApp) {
    const response = await fetch(CARBON_APP_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': NANO_API_TOKEN,
        },
        body: JSON.stringify(app),
    })
    const result = await response.json()
    assert(!result.error, result.error)
}

export async function updateApp(app: CarbonApp) {
    const response = await fetch(CARBON_APP_API, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': NANO_API_TOKEN,
        },
        body: JSON.stringify(app)
    })
    const result = await response.json()
    assert(!result.error, result.error)
}


export async function getApp(appId: string): Promise<CarbonApp> {
    const response = await fetch(`${CARBON_APP_API}?appId=${appId}`)
    const result = await response.json()
    assert(!result.error, result.error)
    return result.payload
}

export async function getText(appId: string, key: string, locale: Locale): Promise<CarbonText> {
    const q = new URLSearchParams({
        appId,
        key,
        locale,
    })
    const response = await fetch(`${CARBON_TEXT_API}?${q.toString()}`)
    const result = await response.json()
    assert(!result.error, result.error)
    return result.payload
}
