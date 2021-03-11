// natrium kv store service
// https://natrium.herokuapp.com/
import { assert } from "@/utils/assert"
import { NANO_API_TOKEN } from '@/secrets'

const API = "https://natrium.herokuapp.com/api/kv/carbon"

export async function create(key: string, value: string) {
    const response = await fetch(`${API}:${key}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': NANO_API_TOKEN,
        },
        body: value
    })
    const result = await response.json()
    assert(!result.error, result.error)
}

export async function update(key: string, value: string) {
    const response = await fetch(`${API}:${key}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': NANO_API_TOKEN,
        },
        body: value
    })
    const result = await response.json()
    assert(!result.error, result.error)
}


export async function read(key: string): Promise<string> {
    const response = await fetch(`${API}:${key}`)
    const result = await response.json()
    assert(!result.error, result.error)
    return result.value
}


