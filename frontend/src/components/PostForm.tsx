import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { createPost } from '../store/postSlice';
import { Send } from 'lucide-react';

export const PostForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        await dispatch(createPost({ name, description }));
        setName('');
        setDescription('');
        setIsSubmitting(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full md:w-1/4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border-2 border-black focus:border-blue-500 focus:ring-0 transition-all outline-none text-sm font-medium"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex-1 w-full md:w-2/4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border-2 border-black focus:border-blue-500 focus:ring-0 transition-all outline-none text-sm font-medium"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="w-full md:w-auto">
                    <button
                        type="submit"
                        disabled={!name.trim() || isSubmitting}
                        className="w-full md:w-auto px-6 py-2 bg-white border-2 border-black text-black hover:bg-gray-50 rounded-lg transition-all focus:outline-none font-bold text-sm flex items-center justify-center gap-2 h-[42px]"
                    >
                        {isSubmitting ? (
                            <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                        ) : (
                            <span>Crear</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
