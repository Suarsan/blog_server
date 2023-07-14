export const GET_ANALYSIS = () => {
    return `SELECT id, score, pros, cons from analysis
            ORDER BY id ASC;`;
}

export const INSERT_ANALYSIS = () => {
    return `INSERT INTO analysis (score, pros, cons, "createdAt","updatedAt", post_id) 
            VALUES ($1, $2, $3, NOW(), NOW(), $4)
            RETURNING *;`;
}

export const DELETE_ANALYSIS = () => {
    return `DELETE FROM analysis 
            WHERE post_id = $1
            RETURNING *;`;
}