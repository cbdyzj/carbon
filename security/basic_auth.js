import initializeBasicAuth from 'nextjs-basic-auth'
import { BASIC_AUTH_USERS } from '../env'

const BASIC_AUTH_USERS_JSON = BASIC_AUTH_USERS || '[{"user":"carbon","password":"carbon"}]'

export const useBasicAuth = initializeBasicAuth({
    users: JSON.parse(BASIC_AUTH_USERS_JSON)
})