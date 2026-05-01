import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    Bell, 
    User, 
    LogOut 
} from 'lucide-react';
import '../styles/ControlPanel.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { logout, user } = useAuth();

    return (
        <div className="control-panel-wrapper">
            <header className="top-bar">
                <div className="top-bar-left">
                    <img src="/logo.png" alt="Smart Angan" className="logo" />
                    <h1 className="panel-title">CONTROL PANEL</h1>
                </div>
                
                <div className="top-bar-right">
                    <div className="user-info">
                        <button className="icon-button">
                            <Bell size={20} />
                        </button>
                        <button className="icon-button">
                            <User size={20} />
                        </button>
                        <span className="ml-2 font-semibold text-gray-700">{user?.email}</span>
                        <button className="icon-button logout" onClick={logout} title="Logout">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
