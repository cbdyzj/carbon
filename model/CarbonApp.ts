export type Locale = string

export interface LocaleText {
    locale: Locale
    text: string
}

export interface CarbonKey {
    key: string
    pageCode: string
    original: LocaleText[]
    translation?: LocaleText[]
}

export interface CarbonPage {
    pageName: string
    pageCode: string
    pageDescription?: string
    keyList: CarbonKey[]
}

export interface CarbonApp {
    appName: string
    appId: string
    fallbackLocale: Locale
    localeList: Locale[]
    pageList: CarbonPage[]
}