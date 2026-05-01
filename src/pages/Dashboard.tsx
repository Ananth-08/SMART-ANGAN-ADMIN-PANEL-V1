import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    LayoutDashboard, 
    School, 
    Users, 
    Settings, 
    BarChart3, 
    Bell, 
    User, 
    LogOut 
} from 'lucide-react';
import '../styles/ControlPanel.css';

const Dashboard: React.FC = () => {
    const { logout, user } = useAuth();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={32} />, path: '/' },
        { id: 'onboard', label: 'Onboard Schools & Staffs', icon: <School size={32} />, path: '/onboard' },
        { id: 'students', label: 'Student List', icon: <Users size={32} />, path: '/students' },
        { id: 'settings', label: 'Settings', icon: <Settings size={32} />, path: '/settings' },
        { id: 'reports', label: 'Reports', icon: <BarChart3 size={32} />, path: '/reports' }
    ];

    return (
        <div className="control-panel-wrapper">
            <header className="top-bar">
                <div className="top-bar-left">
                    <img src="/logo.png" alt="Smart Angan" className="logo" />
                </div>
                
                <div className="top-bar-right">
                    <div className="user-info">
                        <span>{user?.email}</span>
                        <button className="icon-button">
                            <Bell size={20} />
                        </button>
                        <button className="icon-button">
                            <User size={20} />
                        </button>
                        <button className="icon-button logout" onClick={logout} title="Logout">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="menu-grid-container">
                <div className="menu-grid">
                    {menuItems.map((item) => (
                        <div key={item.id} className="menu-card">
                            <div className="card-icon-container">
                                {item.icon}
                            </div>
                            <div className="card-label">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
