import React from 'react';
import { Link } from 'react-router-dom';
export const Header: React.FC = () => {
    return (
        <header className="w-full px-6 py-4 flex justify-between items-center z-10 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
            <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-white">
                    Jor<span className="text-blue-500">PC</span>
                </span>
            </div>
            <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400">
                <span className="hidden sm:inline">Karachi Verified Hardware</span>
                <Link
                    to="/"
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition"
                >
                    Home
                </Link>
                <Link
                    to="/build"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
                >
                    Build
                </Link>
            </div>
        </header>
    );
};