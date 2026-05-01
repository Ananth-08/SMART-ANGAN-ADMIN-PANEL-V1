import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
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
    const toast = useRef<Toast>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const success = await login({ email, password });
            if (success) {
                navigate('/');
            } else {
                toast.current?.show({ 
                    severity: 'error', 
                    summary: 'Login Failed', 
                    detail: 'Invalid credentials. Please try again.', 
                    life: 3000 
                });
            }
        } catch (error) {
            console.error('Login error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <Toast ref={toast} />
            <div className="login-side-image">
                <div className="image-overlay">
                    <div className="overlay-content">
                        <h1>Empowering the Future</h1>
                        <p>Smart Angan: Revolutionizing early childhood education through technology and care.</p>
                    </div>
                </div>
                <img src="/login-cover.png" alt="Login Cover" className="cover-img" />
            </div>

            <div className="login-side-form">
                <div className="login-form-container">
                    <div className="login-header">
                        <div className="logo-container">
                            <img src="/logo.png" alt="Smart Angan Logo" className="login-logo" onError={(e) => (e.currentTarget.src = 'https://primefaces.org/cdn/primereact/images/logo.png')} />
                        </div>
                        <h2>Admin Portal</h2>
                        <p>Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="field">
                            <label htmlFor="email">Email Address</label>
                            <div className="p-inputgroup flex-1 mt-2">
                                <span className="p-inputgroup-addon">
                                    <Mail size={18} />
                                </span>
                                <InputText 
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Enter your email" 
                                    className="w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div className="field mt-4">
                            <label htmlFor="password">Password</label>
                            <div className="p-inputgroup flex-1 mt-2">
                                <span className="p-inputgroup-addon">
                                    <Lock size={18} />
                                </span>
                                <Password 
                                    id="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="••••••••" 
                                    className="w-full"
                                    feedback={false}
                                    toggleMask
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex align-items-center justify-content-end mt-4">
                            <a href="#" className="text-sm forgot-password">Forgot password?</a>
                        </div>

                        <Button 
                            type="submit" 
                            label="Sign in" 
                            icon={<LogIn size={18} className="mr-2" />} 
                            loading={loading}
                            className="w-full mt-5 login-button"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
