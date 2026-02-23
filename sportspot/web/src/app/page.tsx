'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/constants';
import { authService } from '@/lib/auth';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    if (authenticated) {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">🏆 SportSpot</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name}!
                  </span>
                  <Link
                    href={ROUTES.DASHBOARD}
                    className="btn btn-primary"
                  >
                    Dashboard
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link
                      href={ROUTES.ADMIN}
                      className="btn btn-secondary"
                    >
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-700">
                    Log In
                  </Link>
                  <Link href={ROUTES.REGISTER} className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect Match
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with sports enthusiasts in Al Ain. Create matches, book venues, and play your favorite sports with people who share your passion.
          </p>
          {!isAuthenticated && (
            <div className="flex gap-4 justify-center">
              <Link href={ROUTES.REGISTER} className="btn btn-primary px-8 py-3 text-lg">
                Get Started
              </Link>
              <Link href={ROUTES.LOGIN} className="btn btn-outline px-8 py-3 text-lg">
                Already have an account?
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Why SportSpot?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="font-bold mb-2">Find Players</h4>
              <p>Discover players in your area matching your skill level and gender preferences</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">📍</div>
              <h4 className="font-bold mb-2">Book Venues</h4>
              <p>Reserve your favorite sports venues with flexible gender-specific and mixed slots</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">⚽</div>
              <h4 className="font-bold mb-2">Multiple Sports</h4>
              <p>Football, Padel, and more. Find matches for your favorite sports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      {isAuthenticated && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center mb-12">Ready to Play?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Link
                href={ROUTES.MATCHES}
                className="card hover:shadow-lg cursor-pointer text-center"
              >
                <div className="text-5xl mb-4">⚽</div>
                <h4 className="text-2xl font-bold mb-2">Find Matches</h4>
                <p className="text-gray-600">Browse and join upcoming matches in your area</p>
              </Link>
              <Link
                href={ROUTES.VENUES}
                className="card hover:shadow-lg cursor-pointer text-center"
              >
                <div className="text-5xl mb-4">🎾</div>
                <h4 className="text-2xl font-bold mb-2">Book Venues</h4>
                <p className="text-gray-600">Reserve quality sports venues at affordable prices</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 SportSpot. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Connecting sports enthusiasts in Al Ain</p>
        </div>
      </footer>
    </div>
  );
}
