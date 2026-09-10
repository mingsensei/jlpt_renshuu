import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusCircle, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-gray-900 font-bold group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-sm sm:text-base transition-transform group-hover:scale-105">
            日
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-gray-900">
            JLPT Test
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-2.5">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Danh sách đề
          </Link>

          {/* Only logged in user can create exam */}
          {user ? (
            <Link
              to="/create"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-black transition-all shadow-xs active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tạo bài thi</span>
            </Link>
          ) : (
            <Link
              to="/login?redirect=/create"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-gray-400" />
              <span>Tạo bài thi (Cần đăng nhập)</span>
            </Link>
          )}

          {/* User status */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <span className="text-xs text-gray-600 truncate max-w-[120px]" title={user.email}>
                {user.email.split('@')[0]}
              </span>
              <button
                onClick={() => signOut()}
                title="Đăng xuất"
                className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </Link>
          )}
        </nav>

        {/* Mobile Compact Bar */}
        <div className="flex sm:hidden items-center gap-2">
          {user ? (
            <Link
              to="/create"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 text-white hover:bg-black active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tạo đề</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 text-white active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng nhập</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown sheet */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-gray-800 hover:text-black"
          >
            Danh sách đề thi
          </Link>

          {user ? (
            <>
              <Link
                to="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm font-medium text-gray-900"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tạo bài kiểm tra mới</span>
              </Link>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>{user.email}</span>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-600 font-semibold p-1"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-medium text-gray-900"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập tài khoản</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
