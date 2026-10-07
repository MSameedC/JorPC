import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
            {/* 1. Header */}
            <Header />

            {/* 2. Hero Section with Animated Background */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center">
                {/* Ambient Animated Glow Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl animate-bounce duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-lg space-y-6">
                    <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30
                        bg-slate-950 text-white font-bold">Welcome to JorPC</div>
                    <h2 className="text-4xl font-black tracking-tight text-white">
                        Build your dream PC with confidence.
                    </h2>
                    <p className="max-w-md mx-auto text-xl font-semibold text-slate-100">
                        Discover the latest hardware and build your perfect PC today.
                    </p>
                    <Link
                        to="/build"
                        className="button"
                    >
                        Get Started
                    </Link>
                </div>
            </main>

            {/* 3. Footer */}
            <Footer />
        </div>
    );
};