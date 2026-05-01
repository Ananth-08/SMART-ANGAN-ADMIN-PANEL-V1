import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import ControlPanel from '../pages/ControlPanel';
import Dashboard from '../pages/Dashboard';
import SchoolsStaff from '../pages/SchoolsStaff';
import Students from '../pages/Students';
import Reports from '../pages/Reports';
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
                <Route 
                    path="/students" 
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/reports" 
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
