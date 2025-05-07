import { createHash as cryptoCreateHash } from 'crypto'

const HASHCODE: string = (process.env.HASHCODE as string);


export const createHash = (value: string) => {
    return cryptoCreateHash(HASHCODE).update(value).digest('hex')
}

export enum ReturnMessages {
    update = 'Updated',
    delete = 'Deleted',
    emailAlreadyUsed = 'Email Already Used',
    wrongPass = 'Wrong password',
    userNotFound = 'User not found',
    notFound = 'Not found',
    invalidToken = 'Invalid token',
    accessDenied = 'Access denied',
    success = 'Success',
    UnexpectedError = 'Unexpected error'
}