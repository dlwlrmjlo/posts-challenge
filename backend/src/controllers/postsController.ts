import { Request, Response } from 'express';
import { query } from '../db/connection';

interface PostRow {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM posts ORDER BY updated_at DESC');

        const posts = result.rows.map((row: PostRow) => ({
            id: row.id,
            name: row.name,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));

        console.log(posts);

        res.status(200).json(posts);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createPost = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    if( !name || name.length < 1){
        res.status(400).json({ error: "Name is required"});
        return;
    }

    try {
        const result = await query('INSERT INTO posts ( name, description ) VALUES ( $1, $2 ) RETURNING *',
            [ name, description]
        );

        const newPost = result.rows[0];

        res.status(201).json({
            id: newPost.id,
            name: newPost.name,
            description: newPost.description,
            createdAt: newPost.created_at,
            updatedAt: newPost.updated_at,
        })
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await query('DELETE FROM posts WHERE id = $1 RETURNING id', 
            [ id ]
        );

        if (result.rowCount === 0 ){
            res.status(404).json({ error: "Post not found"});
            return;
        }

        res.status(200).json({ message: "Post deleted successfully ", id});

    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
