import { Request, Response } from 'express';

export const getPosts = async (req: Request, res: Response) => {
    console.log('GET /api/posts called');
    res.status(200).json([]);
};

export const createPost = async (req: Request, res: Response) => {
    console.log('POST /api/posts called with body:', req.body);
    res.status(201).json({ message: 'Post created (simulation)', data: req.body });
};

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`DELETE /api/posts/${id} called`);
    res.status(200).json({ message: `Post ${id} deleted (simulation)` });
};
