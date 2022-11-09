import * as bcrypt from 'bcrypt';

const hash = async(data: string, rounds?: number) => {
    return await bcrypt.hash(data, rounds ? rounds : 12);
}
const compareHash = async(hash1: string, hash2: string) => {
    return await bcrypt.compare(hash1, hash2);
}
export const security = {
    hash,
    compareHash
};