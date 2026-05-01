import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import ControlPanel from '../pages/ControlPanel';
import Dashboard from '../pages/Dashboard';
import SchoolsStaff from '../pages/SchoolsStaff';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <ControlPanel />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/schools-staff" 
                    element={
                        <ProtectedRoute>
                            <SchoolsStaff />
                        </ProtectedRoute>
                    } 
                />
                {/* Fallback for other routes */}
                <Route 
                    path="/students" 
                    element={
                        <ProtectedRoute>
                            <div className="p-6"><h1>Students Page Placeholder</h1></div>
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/settings" 
                    element={
                        <ProtectedRoute>
                            <div className="p-6"><h1>Settings Page Placeholder</h1></div>
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/reports" 
                    element={
                        <ProtectedRoute>
                            <div className="p-6"><h1>Reports Page Placeholder</h1></div>
                        </ProtectedRoute>
                    } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
