function e(key) {
    return process.env[key] || ''
}

export const NANO_API_TOKEN = e('NANO_API_TOKEN')
