import jwt from "jsonwebtoken"

const SECRET = 'secret-key'

export default {
    sign: (payload)=>jwt.sign(payload , SECRET),
    verify : (access_token)=> jwt.verify(access_token , SECRET)
}