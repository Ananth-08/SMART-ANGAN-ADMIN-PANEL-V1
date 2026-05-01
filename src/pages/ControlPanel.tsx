import React from 'react';
import { 
    LayoutDashboard, 
    School, 
    Users, 
    Settings, 
    BarChart3 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import '../styles/ControlPanel.css';

const ControlPanel: React.FC = () => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={24} />, path: '/dashboard' },
        { id: 'onboard', label: 'Schools & Staffs', icon: <School size={24} />, path: '/schools-staff' },
        { id: 'students', label: 'Student List', icon: <Users size={24} />, path: '/students' },
        { id: 'reports', label: 'Reports', icon: <BarChart3 size={24} />, path: '/reports' }
    ];

    return (
        <MainLayout>
            <nav className="menu-grid-container">
                <div className="menu-grid">
                    {menuItems.map((item) => (
                        <Link key={item.id} to={item.path} className="menu-card">
                            <div className="card-icon-container">
                                {item.icon}
                            </div>
                            <div className="card-label">
                                {item.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
        </MainLayout>
    );
};

export default ControlPanel;
