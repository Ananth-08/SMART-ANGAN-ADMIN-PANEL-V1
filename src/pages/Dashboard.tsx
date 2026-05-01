import React, { useState, useMemo } from 'react';
import { 
    School, 
    BarChart3, 
    TrendingUp, 
    TrendingDown, 
    Calendar as CalendarIcon, 
    Filter,
    ArrowLeft
} from 'lucide-react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { mockData } from '../utils/mockData';
import MainLayout from '../components/MainLayout';
import { Link } from 'react-router-dom';
import '../styles/ControlPanel.css';

const Dashboard: React.FC = () => {
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<Date | Date[] | null>(new Date());

    const schoolOptions = [
        { label: 'All Schools', value: null },
        ...mockData.schools.map(s => ({ label: s.name, value: s.id }))
    ];

    const stats = useMemo(() => {
        const filteredStudents = selectedSchool 
            ? mockData.students.filter(s => s.schoolId === selectedSchool)
            : mockData.students;
        
        const filteredStaff = selectedSchool
            ? mockData.staff.filter(s => s.schoolId === selectedSchool)
            : mockData.staff;

        const avgAttendance = Math.round(
            filteredStudents.reduce((acc, s) => {
                const presentDays = s.attendance.filter(a => a).length;
                return acc + (presentDays / s.attendance.length);
            }, 0) / filteredStudents.length * 100
        );

        return [
            { label: 'Total Schools', value: selectedSchool ? 1 : mockData.schools.length, trend: '+0%', up: true },
            { label: 'Total Students', value: filteredStudents.length, trend: '+12%', up: true },
            { label: 'Total Staff', value: filteredStaff.length, trend: '+2', up: true },
            { label: 'Avg Attendance', value: `${avgAttendance}%`, trend: '-2.4%', up: false },
        ];
    }, [selectedSchool]);

    return (
        <MainLayout>
            <div className="dashboard-content">
                <div className="mb-4">
                    <Link to="/" className="flex align-items-center gap-2 text-gray-600 no-underline hover:text-gray-900 transition-colors">
                        <ArrowLeft size={18} />
                        <span className="font-semibold">Back to Control Panel</span>
                    </Link>
                </div>

                <div className="dashboard-header">
                    <h2>Dashboard Overview</h2>
                    <div className="dashboard-filters">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon bg-white">
                                <School size={16} />
                            </span>
                            <Dropdown 
                                value={selectedSchool} 
                                options={schoolOptions} 
                                onChange={(e) => setSelectedSchool(e.value)} 
                                placeholder="Select School"
                                className="w-full md:w-14rem"
                            />
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon bg-white">
                                <CalendarIcon size={16} />
                            </span>
                            <Calendar 
                                value={dateRange as Date} 
                                onChange={(e) => setDateRange(e.value)} 
                                placeholder="Select Date"
                                dateFormat="dd/mm/yy"
                                className="w-full"
                                inputClassName="border-none"
                                showIcon={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-card">
                            <span className="label">{stat.label}</span>
                            <span className="value">{stat.value}</span>
                            <div className={`trend ${stat.up ? 'up' : 'down'}`}>
                                {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                <span>{stat.trend} from last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-main-grid">
                    <div className="chart-container">
                        <div className="chart-header">
                            <h3>Attendance Trends</h3>
                            <button className="icon-button">
                                <Filter size={16} />
                            </button>
                        </div>
                        <div className="flex flex-column align-items-center justify-content-center h-full text-gray-400">
                            <BarChart3 size={48} className="mb-2" />
                            <p>Attendance visualization will be displayed here</p>
                        </div>
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">
                            <h3>Quick Actions</h3>
                        </div>
                        <div className="flex flex-column gap-3">
                            <button className="p-3 border-round border-1 border-gray-200 bg-white text-left hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="font-bold text-gray-800">Add New Student</div>
                                <div className="text-xs text-gray-500">Register a child to a center</div>
                            </button>
                            <button className="p-3 border-round border-1 border-gray-200 bg-white text-left hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="font-bold text-gray-800">Generate Report</div>
                                <div className="text-xs text-gray-500">Download monthly attendance PDF</div>
                            </button>
                            <button className="p-3 border-round border-1 border-gray-200 bg-white text-left hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="font-bold text-gray-800">Manage Staff</div>
                                <div className="text-xs text-gray-500">Assign workers to centers</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
