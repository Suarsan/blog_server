export const GET_TAGS = () => {
    return `SELECT * from tags ORDER BY id ASC;`;
}

export const GET_TAG = () => {
    return `SELECT * from tags WHERE content = $1;`
}

export const INSERT_TAG = () => {
    return  `INSERT INTO tag (content, "createdAt", "updatedAt") 
            VALUES ($1, NOW(), NOW()) RETURNING *;`;
}

export const INSERT_POST_TAG = () => {
    return `INSERT INTO post__tag (post_id, tag_id) 
            VALUES ($1, $2) RETURNING *;`;
}

export const DELETE_TAGS_BY_POST_ID = () => {
    return `DELETE FROM post__tag WHERE post_id = $1;`;
}