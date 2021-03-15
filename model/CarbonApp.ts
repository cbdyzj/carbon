export type Locale = string

export interface CarbonText {
    locale: Locale
    text: string
}

export interface CarbonKey {
    key: string
    pageCode: string
    original: CarbonText[]
    translation?: CarbonText[]
}

export interface CarbonPage {
    name: string
    code: string
    description?: string
    keyList?: CarbonKey[]
}

export interface CarbonApp {
    id: string
    name: string
    fallbackLocale: Locale
    localeList: Locale[]
    pageList?: CarbonPage[]
}