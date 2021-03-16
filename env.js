function e(key) {
    return process.env[key] || ''
}

export const NANO_API_TOKEN = e('NANO_API_TOKEN')

export const BASIC_AUTH_USERS = e('BASIC_AUTH_USERS')
