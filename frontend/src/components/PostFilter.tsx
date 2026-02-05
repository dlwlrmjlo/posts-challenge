import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter, selectFilter } from '../store/postSlice';

export const PostFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectFilter);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="w-full sm:max-w-md">
                <div className="relative">
                    <div className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-gray-900 z-10">
                        Filtro de Nombre
                    </div>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 border-2 border-black rounded-lg leading-5 bg-white focus:outline-none focus:border-blue-600 transition-colors"
                        value={filter}
                        onChange={(e) => dispatch(setFilter(e.target.value))}
                    />
                </div>
            </div>
            <button className="px-8 py-2 bg-white border-2 border-black text-black font-bold rounded-lg hover:bg-gray-50 transition-colors">
                Buscar
            </button>
        </div>
    );
};
