import React from 'react';
import MainLayout from '../components/MainLayout';
import { School, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SchoolsStaff: React.FC = () => {
    return (
        <MainLayout>
            <div className="p-6">
                <div className="mb-6">
                    <Link to="/" className="flex align-items-center gap-2 text-gray-600 no-underline hover:text-gray-900 transition-colors">
                        <ArrowLeft size={18} />
                        <span className="font-semibold">Back to Control Panel</span>
                    </Link>
                </div>

                <div className="flex align-items-center gap-3 mb-6">
                    <School size={32} className="text-primary" />
                    <h1 className="text-3xl font-bold m-0 text-gray-900">Schools & Staffs Management</h1>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-6">
                        <div className="surface-card p-4 shadow-2 border-round">
                            <div className="flex align-items-center gap-3 mb-4">
                                <School size={24} className="text-blue-600" />
                                <h2 className="text-xl font-bold m-0">Schools Onboarding</h2>
                            </div>
                            <p className="text-600 mb-4">Register and manage Anganwadi centers across different regions.</p>
                            <div className="flex flex-column gap-2">
                                <div className="p-3 bg-gray-50 border-round">Greenfield South Center - Active</div>
                                <div className="p-3 bg-gray-50 border-round">Blue Valley North Center - Active</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="surface-card p-4 shadow-2 border-round">
                            <div className="flex align-items-center gap-3 mb-4">
                                <Users size={24} className="text-green-600" />
                                <h2 className="text-xl font-bold m-0">Staff Management</h2>
                            </div>
                            <p className="text-600 mb-4">Assign and track workers and assistants for each center.</p>
                            <div className="flex flex-column gap-2">
                                <div className="p-3 bg-gray-50 border-round">Priya Sharma - Head Worker</div>
                                <div className="p-3 bg-gray-50 border-round">Anita Devi - Assistant</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default SchoolsStaff;
