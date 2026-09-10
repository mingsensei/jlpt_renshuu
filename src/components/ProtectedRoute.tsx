import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Lock, LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="w-8 h-8 border-3 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-900">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Yêu cầu đăng nhập</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
          Khách (Guest) có thể làm bài thi thoải mái. Để <strong>tạo bài kiểm tra mới</strong> bằng JSON, bạn cần đăng nhập tài khoản.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition-colors shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập ngay</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xem danh sách đề</span>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
