export const GET_POSTS = () => {
    return  `SELECT array_agg(json_build_object(
                'id', post.id,
                'enabled', post.enabled,
                'slug', post.slug,
                'title', post.title,
                'image', post.image,
                'metaTitle', post.meta_title,
                'metaDescription', post.meta_description,
                'readTime', post.read_time,
                'createdAt', post."createdAt",
                'updatedAt', post."updatedAt",
                'author', ( 
                    SELECT json_build_object(
                        'id', author.id,
                        'email', author.email,
                        'firstname', author.firstname,
                        'lastname', author.lastname,
                        'createdAt', author."createdAt",
                        'updatedAt', author."updatedAt" )
                    FROM author 
                    WHERE author.id = post.author_id ),
                'type', ( 
                    SELECT json_build_object(
                        'id', type.id,
                        'content', type.content,
                        'createdAt', type."createdAt",
                        'updatedAt', type."updatedAt" )
                    FROM type 
                    WHERE type.id = post.type_id ),
                'analysis', ( 
                    SELECT json_build_object(
                        'id', analysis.id,
                        'score', analysis.score,
                        'pros', analysis.pros,
                        'cons', analysis.cons,
                        'createdAt', analysis."createdAt",
                        'updatedAt', analysis."updatedAt" )
                    FROM analysis 
                    WHERE analysis.post_id = post.id ),
                'paragraphs', (
                    SELECT array_agg(json_build_object(
                        'id', paragraph.id,
                        'content', paragraph.content,
                        'classes', paragraph.classes,
                        'position', paragraph.position,
                        'htmlTag', (
                            SELECT json_build_object(
                                'id', "html-tag".id,
                                'content', "html-tag".content ) 
                            FROM "html-tag"
                            WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
                    FROM paragraph 
                    WHERE post_id = post.id),
                'parent', ( 
                    SELECT json_build_object(
                        'id', parent.id,
                        'enabled', parent.enabled,
                        'slug', parent.slug,
                        'title', parent.title,
                        'createdAt', parent."createdAt",
                        'updatedAt', parent."updatedAt" )
                    FROM post AS parent 
                    WHERE parent.id = post.parent_id ),
                'children', ( 
                    SELECT array_agg(json_build_object(
                        'id', children.id,
                        'enabled', children.enabled,
                        'slug', children.slug,
                        'title', children.title,
                        'createdAt', children."createdAt",
                        'updatedAt', children."updatedAt" ))
                    FROM post AS children 
                    WHERE children.parent_id = post.id ),
                'tags', (
                    SELECT  array_agg(json_build_object(
                        'id', tags.id,
                        'content', tags.content,
                        'createdAt', tags."createdAt",
                        'updatedAt', tags."updatedAt" ) )
                    FROM post__tag
                    JOIN tags ON (post__tag.tag_id = tags.id)
                    WHERE post_id = post.id
                )
            ) 
            ORDER BY post."updatedAt" DESC ) 
            FROM post;`; 
};

export const GET_POST_BY_SLUG = () => { 
    return  `SELECT json_build_object(
                'id', post.id,
                'enabled', post.enabled,
                'slug', post.slug,
                'title', post.title,
                'image', post.image,
                'metaTitle', post.meta_title,
                'metaDescription', post.meta_description,
                'readTime', post.read_time,
                'createdAt', post."createdAt",
                'updatedAt', post."updatedAt",
                'author', ( 
                    SELECT json_build_object(
                        'id', author.id,
                        'email', author.email,
                        'firstname', author.firstname,
                        'lastname', author.lastname,
                        'createdAt', author."createdAt",
                        'updatedAt', author."updatedAt" )
                    FROM author 
                    WHERE author.id = post.author_id ),
                'type', ( 
                    SELECT json_build_object(
                        'id', type.id,
                        'content', type.content,
                        'createdAt', type."createdAt",
                        'updatedAt', type."updatedAt" )
                    FROM type 
                    WHERE type.id = post.type_id ),
                'analysis', ( 
                    SELECT json_build_object(
                        'id', analysis.id,
                        'score', analysis.score,
                        'pros', analysis.pros,
                        'cons', analysis.cons,
                        'createdAt', analysis."createdAt",
                        'updatedAt', analysis."updatedAt" )
                    FROM analysis 
                    WHERE analysis.post_id = post.id ),
                'paragraphs', (
                    SELECT array_agg(json_build_object(
                        'id', paragraph.id,
                        'content', paragraph.content,
                        'classes', paragraph.classes,
                        'position', paragraph.position,
                        'htmlTag', (
                            SELECT json_build_object(
                                'id', "html-tag".id,
                                'content', "html-tag".content ) 
                            FROM "html-tag"
                            WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
                    FROM paragraph 
                    WHERE post_id = post.id),
                'parent', ( 
                    SELECT json_build_object(
                        'id', parent.id,
                        'enabled', parent.enabled,
                        'slug', parent.slug,
                        'title', parent.title,
                        'createdAt', parent."createdAt",
                        'updatedAt', parent."updatedAt" )
                    FROM post AS parent 
                    WHERE parent.id = post.parent_id ),
                'children', ( 
                    SELECT array_agg(json_build_object(
                        'id', children.id,
                        'enabled', children.enabled,
                        'slug', children.slug,
                        'title', children.title,
                        'createdAt', children."createdAt",
                        'updatedAt', children."updatedAt" ))
                    FROM post AS children 
                    WHERE children.parent_id = post.id ),
                'tags', (
                    SELECT  array_agg(json_build_object(
                        'id', tags.id,
                        'content', tags.content,
                        'createdAt', tags."createdAt",
                        'updatedAt', tags."updatedAt" ) )
                    FROM post__tag
                    JOIN tags ON (post__tag.tag_id = tags.id)
                    WHERE post_id = post.id
                )
            ) FROM post     
            WHERE post.slug = $1;`; 
};

export const GET_ENABLED_POST_BY_SLUG = () => {
    return  `SELECT json_build_object(
                'id', post.id,
                'enabled', post.enabled,
                'slug', post.slug,
                'title', post.title,
                'image', post.image,
                'metaTitle', post.meta_title,
                'metaDescription', post.meta_description,
                'readTime', post.read_time,
                'createdAt', post."createdAt",
                'updatedAt', post."updatedAt",
                'author', ( 
                    SELECT json_build_object(
                        'id', author.id,
                        'email', author.email,
                        'firstname', author.firstname,
                        'lastname', author.lastname,
                        'createdAt', author."createdAt",
                        'updatedAt', author."updatedAt" )
                    FROM author 
                    WHERE author.id = post.author_id ),
                'type', ( 
                    SELECT json_build_object(
                        'id', type.id,
                        'content', type.content,
                        'createdAt', type."createdAt",
                        'updatedAt', type."updatedAt" )
                    FROM type 
                    WHERE type.id = post.type_id ),
                'analysis', ( 
                    SELECT json_build_object(
                        'id', analysis.id,
                        'score', analysis.score,
                        'pros', analysis.pros,
                        'cons', analysis.cons,
                        'createdAt', analysis."createdAt",
                        'updatedAt', analysis."updatedAt" )
                    FROM analysis 
                    WHERE analysis.post_id = post.id ),
                'paragraphs', (
                    SELECT array_agg(json_build_object(
                        'id', paragraph.id,
                        'content', paragraph.content,
                        'classes', paragraph.classes,
                        'position', paragraph.position,
                        'htmlTag', (
                            SELECT json_build_object(
                                'id', "html-tag".id,
                                'content', "html-tag".content ) 
                            FROM "html-tag"
                            WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
                    FROM paragraph 
                    WHERE post_id = post.id),
                'parent', ( 
                    SELECT json_build_object(
                        'id', parent.id,
                        'enabled', parent.enabled,
                        'slug', parent.slug,
                        'title', parent.title,
                        'createdAt', parent."createdAt",
                        'updatedAt', parent."updatedAt" )
                    FROM post AS parent 
                    WHERE parent.id = post.parent_id ),
                'children', ( 
                    SELECT array_agg(json_build_object(
                        'id', children.id,
                        'enabled', children.enabled,
                        'slug', children.slug,
                        'title', children.title,
                        'image', children.image,
                        'createdAt', children."createdAt",
                        'updatedAt', children."updatedAt" ))
                    FROM post AS children 
                    WHERE children.parent_id = post.id ),
                'tags', (
                    SELECT  array_agg(json_build_object(
                        'id', tags.id,
                        'content', tags.content,
                        'createdAt', tags."createdAt",
                        'updatedAt', tags."updatedAt" ) )
                    FROM post__tag
                    JOIN tags ON (post__tag.tag_id = tags.id)
                    WHERE post_id = post.id
                )
            ) FROM post     
            WHERE post.slug = $1 AND post.enabled = true;`;
};


export const GET_POSTS_BY_PARENT = () => {
    return  `SELECT array_agg(json_build_object(
                'id', post.id,
                'enabled', post.enabled,
                'slug', post.slug,
                'title', post.title,
                'image', post.image,
                'metaTitle', post.meta_title,
                'metaDescription', post.meta_description,
                'readTime', post.read_time,
                'createdAt', post."createdAt",
                'updatedAt', post."updatedAt",
                'author', ( 
                    SELECT json_build_object(
                        'id', author.id,
                        'email', author.email,
                        'firstname', author.firstname,
                        'lastname', author.lastname,
                        'createdAt', author."createdAt",
                        'updatedAt', author."updatedAt" )
                    FROM author 
                    WHERE author.id = post.author_id ),
                'type', ( 
                    SELECT json_build_object(
                        'id', type.id,
                        'content', type.content,
                        'createdAt', type."createdAt",
                        'updatedAt', type."updatedAt" )
                    FROM type 
                    WHERE type.id = post.type_id ),
                'analysis', ( 
                    SELECT json_build_object(
                        'id', analysis.id,
                        'score', analysis.score,
                        'pros', analysis.pros,
                        'cons', analysis.cons,
                        'createdAt', analysis."createdAt",
                        'updatedAt', analysis."updatedAt" )
                    FROM analysis 
                    WHERE analysis.post_id = post.id ),
                'paragraphs', (
                    SELECT array_agg(json_build_object(
                        'id', paragraph.id,
                        'content', paragraph.content,
                        'classes', paragraph.classes,
                        'position', paragraph.position,
                        'htmlTag', (
                            SELECT json_build_object(
                                'id', "html-tag".id,
                                'content', "html-tag".content ) 
                            FROM "html-tag"
                            WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
                    FROM paragraph 
                    WHERE post_id = post.id),
                'parent', ( 
                    SELECT json_build_object(
                        'id', parent.id,
                        'enabled', parent.enabled,
                        'slug', parent.slug,
                        'title', parent.title,
                        'createdAt', parent."createdAt",
                        'updatedAt', parent."updatedAt" )
                    FROM post AS parent 
                    WHERE parent.id = post.parent_id ),
                'children', ( 
                    SELECT array_agg(json_build_object(
                        'id', children.id,
                        'enabled', children.enabled,
                        'slug', children.slug,
                        'title', children.title,
                        'createdAt', children."createdAt",
                        'updatedAt', children."updatedAt" ))
                    FROM post AS children 
                    WHERE children.parent_id = post.id ),
                'tags', (
                    SELECT  array_agg(json_build_object(
                        'id', tags.id,
                        'content', tags.content,
                        'createdAt', tags."createdAt",
                        'updatedAt', tags."updatedAt" ) )
                    FROM post__tag
                    JOIN tags ON (post__tag.tag_id = tags.id)
                    WHERE post_id = post.id
                )
            ) ORDER BY post."updatedAt" DESC ) 
            FROM post     
            WHERE post.parent_id = $1 AND post.enabled = true;`;
};

export const GET_POSTS_BY_AUTHOR = () => { 
    return  `SELECT array_agg(json_build_object(
                'id', post.id,
                'enabled', post.enabled,
                'slug', post.slug,
                'title', post.title,
                'image', post.image,
                'metaTitle', post.meta_title,
                'metaDescription', post.meta_description,
                'readTime', post.read_time,
                'createdAt', post."createdAt",
                'updatedAt', post."updatedAt",
                'author', ( 
                    SELECT json_build_object(
                        'id', author.id,
                        'email', author.email,
                        'firstname', author.firstname,
                        'lastname', author.lastname,
                        'createdAt', author."createdAt",
                        'updatedAt', author."updatedAt" )
                    FROM author 
                    WHERE author.id = post.author_id ),
                'type', ( 
                    SELECT json_build_object(
                        'id', type.id,
                        'content', type.content,
                        'createdAt', type."createdAt",
                        'updatedAt', type."updatedAt" )
                    FROM type 
                    WHERE type.id = post.type_id ),
                'analysis', ( 
                    SELECT json_build_object(
                        'id', analysis.id,
                        'score', analysis.score,
                        'pros', analysis.pros,
                        'cons', analysis.cons,
                        'createdAt', analysis."createdAt",
                        'updatedAt', analysis."updatedAt" )
                    FROM analysis 
                    WHERE analysis.post_id = post.id ),
                'paragraphs', (
                    SELECT array_agg(json_build_object(
                        'id', paragraph.id,
                        'content', paragraph.content,
                        'classes', paragraph.classes,
                        'position', paragraph.position,
                        'htmlTag', (
                            SELECT json_build_object(
                                'id', "html-tag".id,
                                'content', "html-tag".content ) 
                            FROM "html-tag"
                            WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
                    FROM paragraph 
                    WHERE post_id = post.id),
                'parent', ( 
                    SELECT json_build_object(
                        'id', parent.id,
                        'enabled', parent.enabled,
                        'slug', parent.slug,
                        'title', parent.title,
                        'createdAt', parent."createdAt",
                        'updatedAt', parent."updatedAt" )
                    FROM post AS parent 
                    WHERE parent.id = post.parent_id ),
                'children', ( 
                    SELECT array_agg(json_build_object(
                        'id', children.id,
                        'enabled', children.enabled,
                        'slug', children.slug,
                        'title', children.title,
                        'createdAt', children."createdAt",
                        'updatedAt', children."updatedAt" ))
                    FROM post AS children 
                    WHERE children.parent_id = post.id ),
                'tags', (
                    SELECT  array_agg(json_build_object(
                        'id', tags.id,
                        'content', tags.content,
                        'createdAt', tags."createdAt",
                        'updatedAt', tags."updatedAt" ) )
                    FROM post__tag
                    JOIN tags ON (post__tag.tag_id = tags.id)
                    WHERE post_id = post.id
                )
            ) 
            ORDER BY post."updatedAt" DESC ) 
            FROM post     
            WHERE post.author_id = (
                SELECT id FROM author WHERE firstname = $1 AND lastname = $2
            )
            AND post.enabled = true;`;
};
    
export const GET_POSTS_BY_TYPE = () => {
    return  `SELECT array_agg(json_build_object(
                'id', post.id,
                'enabled', post.enabled,
                'slug', post.slug,
                'title', post.title,
                'image', post.image,
                'metaTitle', post.meta_title,
                'metaDescription', post.meta_description,
                'readTime', post.read_time,
                'createdAt', post."createdAt",
                'updatedAt', post."updatedAt",
                'author', ( 
                    SELECT json_build_object(
                        'id', author.id,
                        'email', author.email,
                        'firstname', author.firstname,
                        'lastname', author.lastname,
                        'createdAt', author."createdAt",
                        'updatedAt', author."updatedAt" )
                    FROM author 
                    WHERE author.id = post.author_id ),
                'type', ( 
                    SELECT json_build_object(
                        'id', type.id,
                        'content', type.content,
                        'createdAt', type."createdAt",
                        'updatedAt', type."updatedAt" )
                    FROM type 
                    WHERE type.id = post.type_id ),
                'analysis', ( 
                    SELECT json_build_object(
                        'id', analysis.id,
                        'score', analysis.score,
                        'pros', analysis.pros,
                        'cons', analysis.cons,
                        'createdAt', analysis."createdAt",
                        'updatedAt', analysis."updatedAt" )
                    FROM analysis 
                    WHERE analysis.post_id = post.id ),
                'paragraphs', (
                    SELECT array_agg(json_build_object(
                        'id', paragraph.id,
                        'content', paragraph.content,
                        'classes', paragraph.classes,
                        'position', paragraph.position,
                        'htmlTag', (
                            SELECT json_build_object(
                                'id', "html-tag".id,
                                'content', "html-tag".content ) 
                            FROM "html-tag"
                            WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
                    FROM paragraph 
                    WHERE post_id = post.id),
                'parent', ( 
                    SELECT json_build_object(
                        'id', parent.id,
                        'enabled', parent.enabled,
                        'slug', parent.slug,
                        'title', parent.title,
                        'createdAt', parent."createdAt",
                        'updatedAt', parent."updatedAt" )
                    FROM post AS parent 
                    WHERE parent.id = post.parent_id ),
                'children', ( 
                    SELECT array_agg(json_build_object(
                        'id', children.id,
                        'enabled', children.enabled,
                        'slug', children.slug,
                        'title', children.title,
                        'createdAt', children."createdAt",
                        'updatedAt', children."updatedAt" ))
                    FROM post AS children 
                    WHERE children.parent_id = post.id ),
                'tags', (
                    SELECT  array_agg(json_build_object(
                        'id', tags.id,
                        'content', tags.content,
                        'createdAt', tags."createdAt",
                        'updatedAt', tags."updatedAt" ) )
                    FROM post__tag
                    JOIN tags ON (post__tag.tag_id = tags.id)
                    WHERE post_id = post.id
                )
            ) 
            ORDER BY post."updatedAt" DESC ) 
            FROM post     
            WHERE post.type_id = $1
            AND post.enabled = true;`;
};


export const GET_POSTS_BY_TAG = () => {
    return  `SELECT array_agg(json_build_object(
                'id', post.id,
                'enabled', post.enabled,
                'slug', post.slug,
                'title', post.title,
                'image', post.image,
                'readTime', post.read_time,
                'createdAt', post."createdAt",
                'updatedAt', post."updatedAt",
                'author', ( 
                    SELECT json_build_object(
                        'id', author.id,
                        'email', author.email,
                        'firstname', author.firstname,
                        'lastname', author.lastname,
                        'createdAt', author."createdAt",
                        'updatedAt', author."updatedAt" )
                    FROM author 
                    WHERE author.id = post.author_id ),
                'type', ( 
                    SELECT json_build_object(
                        'id', type.id,
                        'content', type.content,
                        'createdAt', type."createdAt",
                        'updatedAt', type."updatedAt" )
                    FROM type 
                    WHERE type.id = post.type_id ),
                'analysis', ( 
                    SELECT json_build_object(
                        'id', analysis.id,
                        'score', analysis.score,
                        'pros', analysis.pros,
                        'cons', analysis.cons,
                        'createdAt', analysis."createdAt",
                        'updatedAt', analysis."updatedAt" )
                    FROM analysis 
                    WHERE analysis.post_id = post.id ),
                'paragraphs', (
                    SELECT array_agg(json_build_object(
                        'id', paragraph.id,
                        'content', paragraph.content,
                        'classes', paragraph.classes,
                        'position', paragraph.position,
                        'htmlTag', (
                            SELECT json_build_object(
                                'id', "html-tag".id,
                                'content', "html-tag".content ) 
                            FROM "html-tag"
                            WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
                    FROM paragraph 
                    WHERE post_id = post.id),
                'parent', ( 
                    SELECT json_build_object(
                        'id', parent.id,
                        'enabled', parent.enabled,
                        'slug', parent.slug,
                        'title', parent.title,
                        'createdAt', parent."createdAt",
                        'updatedAt', parent."updatedAt" )
                    FROM post AS parent 
                    WHERE parent.id = post.parent_id ),
                'children', ( 
                    SELECT array_agg(json_build_object(
                        'id', children.id,
                        'enabled', children.enabled,
                        'slug', children.slug,
                        'title', children.title,
                        'createdAt', children."createdAt",
                        'updatedAt', children."updatedAt" ))
                    FROM post AS children 
                    WHERE children.parent_id = post.id ),
                'tags', (
                    SELECT  array_agg(json_build_object(
                        'id', tags.id,
                        'content', tags.content,
                        'createdAt', tags."createdAt",
                        'updatedAt', tags."updatedAt" ) )
                    FROM post__tag
                    JOIN tags ON (post__tag.tag_id = tags.id)
                    WHERE post_id = post.id
                )
            ) 
            ORDER BY post."updatedAt" DESC ) 
            FROM post     
            WHERE post.id IN (
                SELECT post_id 
                FROM post__tag
                WHERE post__tag.tag_id = (
                    SELECT id
                    FROM tags
                    WHERE content = $1
                )
            )
            AND post.enabled = true;`;
};
    

export const GET_POSTS_BY_SCORE = () => { 
    return  `SELECT array_agg(json_build_object(
                'id', post.id,
                'enabled', post.enabled,
                'slug', post.slug,
                'title', post.title,
                'image', post.image,
                'metaTitle', post.meta_title,
                'metaDescription', post.meta_description,
                'readTime', post.read_time,
                'createdAt', post."createdAt",
                'updatedAt', post."updatedAt",
                'author', ( 
                    SELECT json_build_object(
                        'id', author.id,
                        'email', author.email,
                        'firstname', author.firstname,
                        'lastname', author.lastname,
                        'createdAt', author."createdAt",
                        'updatedAt', author."updatedAt" )
                    FROM author 
                    WHERE author.id = post.author_id ),
                'type', ( 
                    SELECT json_build_object(
                        'id', type.id,
                        'content', type.content,
                        'createdAt', type."createdAt",
                        'updatedAt', type."updatedAt" )
                    FROM type 
                    WHERE type.id = post.type_id ),
                'analysis', ( 
                    SELECT json_build_object(
                        'id', analysis.id,
                        'score', analysis.score,
                        'pros', analysis.pros,
                        'cons', analysis.cons,
                        'createdAt', analysis."createdAt",
                        'updatedAt', analysis."updatedAt" )
                    FROM analysis
                    WHERE analysis.post_id = post.id ) ,
                'paragraphs', (
                    SELECT array_agg(json_build_object(
                        'id', paragraph.id,
                        'content', paragraph.content,
                        'classes', paragraph.classes,
                        'position', paragraph.position,
                        'htmlTag', (
                            SELECT json_build_object(
                                'id', "html-tag".id,
                                'content', "html-tag".content ) 
                            FROM "html-tag"
                            WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
                    FROM paragraph 
                    WHERE post_id = post.id),
                'parent', ( 
                    SELECT json_build_object(
                        'id', parent.id,
                        'enabled', parent.enabled,
                        'slug', parent.slug,
                        'title', parent.title,
                        'createdAt', parent."createdAt",
                        'updatedAt', parent."updatedAt" )
                    FROM post AS parent 
                    WHERE parent.id = post.parent_id ),
                'children', ( 
                    SELECT array_agg(json_build_object(
                        'id', children.id,
                        'enabled', children.enabled,
                        'slug', children.slug,
                        'title', children.title,
                        'createdAt', children."createdAt",
                        'updatedAt', children."updatedAt" ))
                    FROM post AS children 
                    WHERE children.parent_id = post.id ),
                'tags', (
                    SELECT  array_agg(json_build_object(
                        'id', tags.id,
                        'content', tags.content,
                        'createdAt', tags."createdAt",
                        'updatedAt', tags."updatedAt" ) )
                    FROM post__tag
                    JOIN tags ON (post__tag.tag_id = tags.id)
                    WHERE post_id = post.id
                )
            )
            ORDER BY analysis.score ASC, post."updatedAt" DESC
            ) 
            FROM post
            LEFT OUTER JOIN analysis ON post.id = analysis.post_id
            WHERE post.enabled = true;`;
};

export const INSERT_POST = () => {
    return `INSERT INTO post ("createdAt", "updatedAt", enabled, slug, title, meta_title, meta_description, image, read_time, type_id, author_id, parent_id) 
            VALUES (NOW(), NOW(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *;`;
}

export const INSERT_PARAGRAPH = () => {
    return `INSERT INTO paragraph (content, classes, position, "createdAt", "updatedAt", htmltag_id, post_id) 
            VALUES ($1, $2, $3, NOW(), NOW(), $4, $5) 
            RETURNING *;`;
}

export const UPDATE_POST = () => {
    return `UPDATE post
            SET "createdAt" = NOW(), "updatedAt" = NOW(), enabled = $1, slug = $2, title = $3, meta_title = $4, meta_description = $5, image = $6, read_time = $7, type_id = $8, author_id = $9, parent_id = $10
            WHERE id = $11
            RETURNING *`;
}

export const DELETE_POST = () => {
    return `DELETE FROM post
            WHERE id = $1
            RETURNING *`;
}

export const DELETE_PARAGRAPHS = () => {
    return `DELETE FROM paragraph
            WHERE post_id = $1`;
}


//     async getPostsByAnyTags(tags: Array<string>): Promise<Array<Post>> {
//         const posts: Array<Post> = await this.postsRepository.find({
//             relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
//             order: {
//                 paragraphs: { position: "ASC" }
//             },        
//             where: { tags: { content: In(tags) }, enabled: true }
//         });

//         return posts;
//     }

//     async getPostsByTags(tags: Array<string>): Promise<Array<Post>> {
//         const posts: Array<Post> = await this.postsRepository.find({
//             relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
//             order: {
//                 paragraphs: { position: "ASC" }
//             },        
//             where: { tags: { content: In(tags) }, enabled: true }
//         });

//         return posts;
//     }