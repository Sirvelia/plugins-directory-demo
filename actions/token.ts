'use server'

import { sign } from 'jsonwebtoken'

export async function generateToken() {
    const SECRET_KEY = process.env.PLOOGINS_SECRET as string
    const TOKEN_EXPIRY = '5m'

    return {
        success: true,
        token: sign({ sid: 1, role: 'service', scope: 'access' }, SECRET_KEY, { algorithm: 'HS512', expiresIn: TOKEN_EXPIRY })
    }
}