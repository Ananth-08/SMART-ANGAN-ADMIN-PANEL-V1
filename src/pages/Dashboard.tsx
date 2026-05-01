import React from 'react';
import { Button } from 'primereact/button';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { logout, user } = useAuth();

    return (
        <div className="p-6">
            <div className="flex justify-content-between align-items-center mb-6">
                <div className="flex align-items-center gap-2">
                    <LayoutDashboard size={24} className="text-primary" />
                    <h1 className="text-2xl font-bold m-0">Dashboard</h1>
                </div>
                <Button 
                    label="Logout" 
                    icon={<LogOut size={18} className="mr-2" />} 
                    severity="danger" 
                    text 
                    onClick={logout} 
                />
            </div>
            
            <div className="surface-card p-4 shadow-2 border-round">
                <h2 className="mt-0">Welcome, {user?.email}!</h2>
                <p className="text-600">You are successfully logged into the Smart Angan Admin Panel.</p>
            </div>
        </div>
    );
};

export default Dashboard;
