import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParagraphInput } from './dtos/paragraphInput.dto';
import { Post } from './entities';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private readonly postsRepository: Repository<Post>) {}

    async getPosts(): Promise<Array<Post>> {
        const posts: Array<Post> = (await this.postsRepository.query(
            `SELECT array_agg(json_build_object(
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
                    FROM tags
                    JOIN post__tag ON (post.id = post__tag.post_id)
                )
            ) 
            ORDER BY post."updatedAt" DESC ) 
            FROM post;
        `))[0]['array_agg'];

        return posts;
    }
    
    async getPostBySlug(slug: string): Promise<Post> {
        let response = (await this.postsRepository.query(`
            SELECT json_build_object(
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
                    FROM tags
                    JOIN post__tag ON (post.id = post__tag.post_id)
                )
            ) FROM post     
            WHERE post.slug = '${slug}';
        `));

        response = response && (response.length > 0) ? response[0] : null;

        const post = response ? response['json_build_object'] : null;

        return post;
    }

    async getEnabledPostBySlug(slug: string): Promise<Post> {
        const post: Post = (await this.postsRepository.query(`
            SELECT json_build_object(
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
                    FROM tags
                    JOIN post__tag ON (post.id = post__tag.post_id)
                )
            ) FROM post     
            WHERE post.slug = '${slug}' AND post.enabled = true;
        `))[0]['json_build_object'];

        return post;
    }

    async getPostsByParent(parentId: number): Promise<Array<Post>> {
        const posts: Array<Post> = (await this.postsRepository.query(`
            SELECT array_agg(json_build_object(
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
                    FROM tags
                    JOIN post__tag ON (post.id = post__tag.post_id)
                )
            ) ORDER BY post."updatedAt" DESC ) 
            FROM post     
            WHERE post.parent_id = '${parentId}' AND post.enabled = true;
        `))[0]['array_agg'];

        return posts;
    }

    async getPostsByAuthor(firstname: string, lastname: string): Promise<Array<Post>> {
        const posts: Array<Post> = (await this.postsRepository.query(`
            SELECT array_agg(json_build_object(
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
                    FROM tags
                    JOIN post__tag ON (post.id = post__tag.post_id)
                )
            ) 
            ORDER BY post."updatedAt" DESC ) 
            FROM post     
            WHERE post.author_id = (
                SELECT id FROM author WHERE firstname = '${firstname}' AND lastname = '${lastname}'
            )
            AND post.enabled = true;
        `))[0]['array_agg'];

        return posts;
    }
    
    async getPostsByType(typeId: number): Promise<Array<Post>> {
        const posts: Array<Post> = (await this.postsRepository.query(`
        SELECT array_agg(json_build_object(
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
                FROM tags
                JOIN post__tag ON (post.id = post__tag.post_id)
            )
        ) 
        ORDER BY post."updatedAt" DESC ) 
        FROM post     
        WHERE post.type_id = '${typeId}'
        AND post.enabled = true;
    `))[0]['array_agg'];

    return posts;
    }

    // async getPostsByTag(tag: string): Promise<Array<Post>> {
    //     const posts: Array<Post> = (await this.postsRepository.query(`
    //     SELECT array_agg(json_build_object(
    //         'id', post.id,
    //         'enabled', post.enabled,
    //         'slug', post.slug,
    //         'title', post.title,
    //         'image', post.image,
    //         'readTime', post.read_time,
    //         'createdAt', post."createdAt",
    //         'updatedAt', post."updatedAt",
    //         'author', ( 
    //             SELECT json_build_object(
    //                 'id', author.id,
    //                 'email', author.email,
    //                 'firstname', author.firstname,
    //                 'lastname', author.lastname,
    //                 'createdAt', author."createdAt",
    //                 'updatedAt', author."updatedAt" )
    //             FROM author 
    //             WHERE author.id = post.author_id ),
    //         'type', ( 
    //             SELECT json_build_object(
    //                 'id', type.id,
    //                 'content', type.content,
    //                 'createdAt', type."createdAt",
    //                 'updatedAt', type."updatedAt" )
    //             FROM type 
    //             WHERE type.id = post.type_id ),
    //         'analysis', ( 
    //             SELECT json_build_object(
    //                 'id', analysis.id,
    //                 'score', analysis.score,
    //                 'pros', analysis.pros,
    //                 'cons', analysis.cons,
    //                 'createdAt', analysis."createdAt",
    //                 'updatedAt', analysis."updatedAt" )
    //             FROM analysis 
    //             WHERE analysis.post_id = post.id ),
    //         'paragraphs', (
    //             SELECT array_agg(json_build_object(
    //                 'id', paragraph.id,
    //                 'content', paragraph.content,
    //                 'classes', paragraph.classes,
    //                 'position', paragraph.position,
    //                 'htmlTag', (
    //                     SELECT json_build_object(
    //                         'id', "html-tag".id,
    //                         'content', "html-tag".content ) 
    //                     FROM "html-tag"
    //                     WHERE paragraph.htmltag_id = "html-tag".id ) ) ORDER BY position ASC )
    //             FROM paragraph 
    //             WHERE post_id = post.id),
    //         'parent', ( 
    //             SELECT json_build_object(
    //                 'id', parent.id,
    //                 'enabled', parent.enabled,
    //                 'slug', parent.slug,
    //                 'title', parent.title,
    //                 'createdAt', parent."createdAt",
    //                 'updatedAt', parent."updatedAt" )
    //             FROM post AS parent 
    //             WHERE parent.id = post.parent_id ),
    //         'children', ( 
    //             SELECT array_agg(json_build_object(
    //                 'id', children.id,
    //                 'enabled', children.enabled,
    //                 'slug', children.slug,
    //                 'title', children.title,
    //                 'createdAt', children."createdAt",
    //                 'updatedAt', children."updatedAt" ))
    //             FROM post AS children 
    //             WHERE children.parent_id = post.id ),
    //         'tags', (
    //             SELECT  array_agg(json_build_object(
    //                     'id', tags.id,
    //                     'content', tags.content,
    //                     'createdAt', tags."createdAt",
    //                     'updatedAt', tags."updatedAt" ) )
    //             FROM tags
    //             JOIN post__tag ON (post.id = post__tag.post_id)
    //         )
    //     ) 
    //     ORDER BY post."updatedAt" DESC ) 
    //     FROM post     
    //     WHERE post.id = (
    //         SELECT post_id 
    //         FROM post__tag
    //         WHERE post__tag.tag_id = (
    //             SELECT id
    //             FROM tags
    //             WHERE content = '${tag}'
    //         )
    //     )
    //     AND post.enabled = true;
    // `))[0]['array_agg'];

    //     return posts;
    // }
    
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

    async getPostsByScore(): Promise<Array<Post>> {
        const posts: Array<Post> = (await this.postsRepository.query(`
        SELECT array_agg(json_build_object(
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
                FROM tags
                JOIN post__tag ON (post.id = post__tag.post_id)
            )
        )
        ORDER BY analysis.score ASC, post."updatedAt" DESC
        ) 
		FROM post
		LEFT OUTER JOIN analysis ON post.id = analysis.post_id
        WHERE post.enabled = true;
    `))[0]['array_agg'];

        return posts;
    }

    async create(enabled: boolean, slug: string, title: string, metaTitle: string, metaDescription: string, image: string, readTime: number, typeId: string | number, authorId: string | number, parentId: string | number, paragraphs: Array<ParagraphInput>): Promise<Post> {

        const flatPost = await this.postsRepository.query(`
            INSERT INTO post (
                "createdAt", 
                "updatedAt",
                enabled,
                slug,
                title,
                meta_title,
                meta_description,
                image,
                read_time,
                type_id,
                author_id,
                parent_id
            ) VALUES (
                NOW(),
                NOW(),
                '${enabled}',
                '${slug}',
                '${title}',
                '${metaTitle}',
                '${metaDescription}',
                '${image}',
                '${readTime}',
                ${typeId || null},
                ${authorId || null},
                ${parentId || null}
                
            ) RETURNING *;`);
        
        const createdPost: Post = flatPost && (flatPost.length > 0) ? flatPost[0] : null;

        const values = paragraphs.map(p => 
            `(
                '${p.content}', 
                '${p.classes}',
                '${p.position}', 
                NOW(), 
                NOW(),
                ${p.htmlTag.id}, 
                ${createdPost.id}
            )`).join(',');

        const createdParagraphs = await this.postsRepository.query(`
            INSERT INTO paragraph (
                content,
                classes,
                position,
                "createdAt",
                "updatedAt",
                htmltag_id,
                post_id
            ) VALUES 
                ${values} 
            RETURNING *`);

        createdPost.paragraphs = createdParagraphs;

        return createdPost;

    }

    async deletePost(id: number): Promise<Post> {

        const analysis = await this.postsRepository.query(`
            DELETE FROM analysis 
            WHERE post_id = ${id}
            RETURNING *;
        `);

        const paragraphs = await this.postsRepository.query(`
            DELETE FROM paragraph 
            WHERE post_id = ${id}
            RETURNING *;
        `);

        const flatPost = await this.postsRepository.query(`
            DELETE FROM post 
            WHERE id = ${id}
            RETURNING *;
        `);
        
        const post: Post = flatPost && (flatPost.length > 0) ? flatPost[0] : null;
        
        post.paragraphs = paragraphs && paragraphs.length ? paragraphs : null;
        
        post.analysis = analysis && analysis.length ? analysis[0] : null;

        return post;
    }

}
