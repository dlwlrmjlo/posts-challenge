import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectFilteredPosts, deletePost, fetchPosts } from '../store/postSlice';
import { Trash2, FileText } from 'lucide-react';

export const PostList: React.FC = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectFilteredPosts);
    const status = useAppSelector((state) => state.posts.status);
    const error = useAppSelector((state) => state.posts.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-sm text-red-700">Error: {error}</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                <FileText className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No posts</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new post below.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-base font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-base font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{post.name}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">{post.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => dispatch(deletePost(post.id))}
                                    className="text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors font-medium"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
