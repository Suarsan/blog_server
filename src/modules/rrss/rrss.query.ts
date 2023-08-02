export const GET_RRSS_TYPES = () => {
    return `SELECT * from "rrss-type" ORDER BY id ASC;`;
}
export const GET_RRSS_TYPE = () => {
    return `SELECT * from "rrss-type" WHERE "id"=$1 LIMIT 1;`;
}
export const GET_RRSS_CONNECTIONS = () => {
    return `SELECT * from "rrss-connection" ORDER BY id ASC;`;
}
export const GET_RRSS_DIFFUSIONS = () => {
    return `SELECT * from "rrss-diffusion" ORDER BY id ASC;`;
}
export const GET_RRSS_CONNECTION = () => {
    return `SELECT * from "rrss-connection" WHERE "name"=$1 LIMIT 1;`;
}
export const GET_RRSS_CONNECTION_BY_ID = () => {
    return `SELECT * from "rrss-connection" WHERE "id"=$1 LIMIT 1;`;
}
export const GET_RRSS_DIFFUSION = () => {
    return `SELECT * from "rrss-diffusion" WHERE "name"=$1 LIMIT 1;`;
}
export const GET_RRSS_DIFFUSION_BY_UUID = () => {
    return `SELECT * from "rrss-diffusion" WHERE "uuid"=$1 LIMIT 1;`;
}
export const INSERT_RRSS_CONNECTION = () => {
    return `INSERT INTO "rrss-connection" ("createdAt", "updatedAt", "name", "tokens", "type_id") VALUES (NOW(), NOW(), $1, $2, $3) RETURNING *`;
}
export const INSERT_RRSS_DIFFUSION = () => {
    return `INSERT INTO "rrss-diffusion" ("createdAt", "updatedAt", "name", "content", "date", "uuid", "rrss-connection_id") VALUES (NOW(), NOW(), $1, $2, $3, $4, $5) RETURNING *`;
}
export const UPDATE_RRSS_CONNECTION = () => {
    return `UPDATE "rrss-connection" SET "name"=$2, "tokens"=$3,"type_id"=$4 WHERE "id"=$1 RETURNING *`;
}
export const DELETE_RRSS_CONNECTION = () => {
    return `DELETE FROM "rrss-connection" WHERE "id"=$1 RETURNING *`;
}
export const DELETE_RRSS_DIFFUSION = () => {
    return `DELETE FROM "rrss-diffusion" WHERE "id"=$1 RETURNING *`;
}