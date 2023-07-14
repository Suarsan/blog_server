export const GET_HTMLTAGS = () => {
    return `SELECT * from "html-tag";`;
}

export const GET_HTMLTAG_BY_CONTENT = () => {
    return `SELECT * from "html-tag" WHERE content = $1 LIMIT 1;`;
}

export const INSERT_HTMLTAG = () => {
    return `INSERT INTO "html-tag" (content, "createdAt", "updatedAt")
            VALUES ($1, NOW(), NOW()) RETURNING *;`;
}