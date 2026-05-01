import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Mail, Lock, LogIn } from 'lucide-react';
import '../styles/Login.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            
            <Card className="login-card shadow-8">
                <div className="login-header">
                    <div className="logo-container">
                        <img src="/logo.png" alt="Smart Angan Logo" className="login-logo" onError={(e) => (e.currentTarget.src = 'https://primefaces.org/cdn/primereact/images/logo.png')} />
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Enter your credentials to access the admin panel</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="field">
                        <span className="p-input-icon-left w-full">
                            <Mail size={18} className="input-icon" />
                            <InputText 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email Address" 
                                className="w-full"
                                required
                            />
                        </span>
                    </div>

                    <div className="field mt-4">
                        <span className="p-input-icon-left w-full">
                            <Lock size={18} className="input-icon" />
                            <Password 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password" 
                                className="w-full"
                                feedback={false}
                                toggleMask
                                required
                            />
                        </span>
                    </div>

                    <div className="flex align-items-center justify-content-between mt-4">
                        <div className="flex align-items-center">
                            <input type="checkbox" id="remember-me" className="mr-2" />
                            <label htmlFor="remember-me" className="text-sm cursor-pointer">Remember me</label>
                        </div>
                        <a href="#" className="text-sm forgot-password">Forgot password?</a>
                    </div>

                    <Button 
                        type="submit" 
                        label="Login" 
                        icon={<LogIn size={18} className="mr-2" />} 
                        loading={loading}
                        className="w-full mt-5 login-button"
                    />
                </form>

                <div className="login-footer mt-5">
                    <p>Don't have an account? <a href="#">Contact Support</a></p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
