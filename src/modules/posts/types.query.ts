export const GET_TYPES = () => {
    return `SELECT * from type ORDER BY id ASC;`;
}

export const GET_TYPE_BY_CONTENT = () => {
    return `SELECT * from type WHERE content = $1 LIMIT 1;`;
}
export const INSERT_TYPE = () => {
    return `INSERT INTO type (content, "createdAt", "updatedAt") 
            VALUES ($1, NOW(), NOW()) RETURNING *;`;
}