import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { CreateExam } from './pages/CreateExam';
import { ExamPage } from './pages/Exam';
import { Result } from './pages/Result';
import { Login } from './pages/Login';
import { AdminManage } from './pages/AdminManage';
import { EditExam } from './pages/EditExam';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#fcfcfc] flex flex-col selection:bg-gray-900 selection:text-white">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/manage"
                element={
                  <ProtectedRoute>
                    <AdminManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditExam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateExam />
                  </ProtectedRoute>
                }
              />
              <Route path="/exam/:id" element={<ExamPage />} />
              <Route path="/result/:id" element={<Result />} />
              <Route path="/result" element={<Result />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <footer className="border-t border-gray-200 bg-white py-5 text-center text-xs text-gray-500">
            <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>JLPT Practice & Examination Platform • Minimalist Design</p>
              <p className="text-gray-400">Thi thử & Luyện tập tiếng Nhật trực tuyến</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
