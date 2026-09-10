import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, UserPlus, Lock, Mail, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/create';

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in
  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-900 font-bold text-xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bạn đã đăng nhập</h2>
        <p className="text-gray-500 text-sm mb-6">Tài khoản: <strong>{user.email}</strong></p>
        <div className="flex flex-col gap-3">
          <Link
            to="/create"
            className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
          >
            Đi đến Tạo bài kiểm tra
          </Link>
          <Link
            to="/"
            className="w-full py-3 px-4 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Về danh sách bài thi
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Vui lòng điền đầy đủ email và mật khẩu.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = isRegister
        ? await signUp(email.trim(), password)
        : await signIn(email.trim(), password);

      if (res.error) {
        setError(res.error);
      } else {
        navigate(redirectUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn('teacher@jlpt.vn', '123456');
      navigate(redirectUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-16">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </button>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
            日
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isRegister ? 'Tạo tài khoản giáo viên' : 'Đăng nhập hệ thống'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isRegister
              ? 'Đăng ký để có quyền tạo và quản lý bài thi JLPT'
              : 'Chỉ tài khoản đã đăng nhập mới có quyền tạo đề thi'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-rose-700 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenban@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-black transition-all shadow-sm active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isRegister ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Đăng ký</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-dashed border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Đăng nhập nhanh tài khoản mẫu (1-Click)</span>
          </button>
        </div>

        {/* Toggle between Login and Register */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            {isRegister
              ? 'Đã có tài khoản? Bấm vào đây để đăng nhập'
              : 'Chưa có tài khoản? Bấm vào đây để đăng ký'}
          </button>
        </div>
      </div>
    </div>
  );
};
