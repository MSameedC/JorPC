import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
            {/* 1. Header */}
            <header className="w-full px-6 py-4 flex justify-between items-center z-10 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
                <div className="flex items-center space-x-2">
          <span className="text-xl font-black tracking-tight text-white">
            Jor<span className="text-blue-500">PC</span>
          </span>
                </div>
                <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400">
                    <span className="hidden sm:inline">Karachi Verified Hardware</span>
                    <Link
                        to="/build"
                        className="px-3 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition"
                    >
                        Custom Builder
                    </Link>
                </div>
            </header>

            {/* 2. Hero Section with Animated Background */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center">
                {/* Ambient Animated Glow Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl animate-bounce duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-lg space-y-6">
                    <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-400 text-xs font-mono uppercase tracking-widest">
                        Build-to-Order Experience
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Design Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Custom Gaming PC
            </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
                        Real-time component compatibility, verified partner inventory across Karachi, and doorstep delivery.
                    </p>

                    {/* Centered Build CTA Button (from your sketch) */}
                    <div className="pt-4">
                        <Link
                            to="/build"
                            className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-lg rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            Build ➔
                        </Link>
                    </div>
                </div>
            </main>

            {/* 3. Footer */}
            <footer className="w-full px-6 py-4 border-t border-slate-900 text-center text-xs text-slate-500 z-10 bg-slate-950">
                <p>© 2026 JorPC. Built for PC enthusiasts in Karachi & beyond.</p>
            </footer>
        </div>
    );
};