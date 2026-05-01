import React, { useState, useRef } from 'react';
import MainLayout from '../components/MainLayout';
import { 
    Users, 
    ArrowLeft, 
    Search, 
    FileDown, 
    Baby, 
    Scale, 
    Ruler, 
    Syringe, 
    Utensils, 
    Activity,
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Chart } from 'primereact/chart';
import { Tag } from 'primereact/tag';
import { mockData } from '../utils/mockData';

const Students: React.FC = () => {
    const [students, setStudents] = useState(mockData.students);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef<DataTable<any>>(null);

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const onStudentSelect = (student: any) => {
        setSelectedStudent(student);
        setSidebarVisible(true);
    };

    const idTemplate = (rowData: any) => {
        return (
            <button 
                onClick={() => onStudentSelect(rowData)}
                className="p-link font-bold text-blue-600 hover:underline flex align-items-center gap-1"
            >
                {rowData.id}
                <ExternalLink size={12} />
            </button>
        );
    };

    const schoolNameTemplate = (rowData: any) => {
        const school = mockData.schools.find(s => s.id === rowData.schoolId);
        return school ? school.name : 'Unknown';
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-2">
            <span className="text-xl text-900 font-bold">Student Directory</span>
            <div className="flex gap-2">
                <span className="p-input-icon-left">
                    <Search size={18} className="absolute left-3 top-50 translate-y-n50 text-400" />
                    <InputText 
                        type="search" 
                        onInput={(e: any) => setGlobalFilter(e.target.value)} 
                        placeholder="Search Students..." 
                        className="pl-5"
                    />
                </span>
                <Button label="Export" icon={<FileDown size={18} className="mr-2" />} severity="secondary" onClick={exportCSV} />
            </div>
        </div>
    );

    // Chart Data and Options
    const chartData = selectedStudent ? {
        labels: selectedStudent.healthHistory.months,
        datasets: [
            {
                label: 'Weight (kg)',
                data: selectedStudent.healthHistory.weight,
                fill: false,
                borderColor: '#3b82f6',
                tension: 0.4
            },
            {
                label: 'Height (cm)',
                data: selectedStudent.healthHistory.height,
                fill: false,
                borderColor: '#ef4444',
                tension: 0.4
            }
        ]
    } : null;

    const chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    return (
        <MainLayout>
            <div className="p-5">
                <div className="mb-6">
                    <Link to="/" className="flex align-items-center gap-2 text-gray-600 no-underline hover:text-gray-900 transition-colors mb-2">
                        <ArrowLeft size={18} />
                        <span className="font-semibold">Back to Control Panel</span>
                    </Link>
                    <div className="flex align-items-center gap-3">
                        <Users size={32} className="text-primary" />
                        <h1 className="text-3xl font-bold m-0 text-gray-900">Student Management</h1>
                    </div>
                </div>

                <div className="surface-card p-4 shadow-2 border-round">
                    <DataTable 
                        ref={dt}
                        value={students} 
                        dataKey="id" 
                        paginator 
                        rows={10} 
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        globalFilter={globalFilter}
                        header={header}
                        responsiveLayout="scroll"
                        className="p-datatable-sm"
                    >
                        <Column body={idTemplate} header="ID" sortable style={{ width: '12%' }}></Column>
                        <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
                        <Column field="age" header="Age" sortable style={{ width: '10%' }}></Column>
                        <Column field="gender" header="Gender" sortable style={{ width: '12%' }}></Column>
                        <Column body={schoolNameTemplate} header="Assigned Center" sortable style={{ width: '25%' }}></Column>
                        <Column field="parentMobile" header="Parent Contact" style={{ width: '16%' }}></Column>
                    </DataTable>
                </div>

                {/* Student Details Sidebar */}
                <Sidebar 
                    visible={sidebarVisible} 
                    onHide={() => setSidebarVisible(false)} 
                    position="right" 
                    style={{ width: '80vw' }}
                    header={
                        <div className="flex align-items-center gap-3">
                            <Baby size={24} className="text-blue-500" />
                            <div>
                                <h2 className="m-0 text-xl font-bold">{selectedStudent?.name}</h2>
                                <span className="text-sm text-500">ID: {selectedStudent?.id}</span>
                            </div>
                        </div>
                    }
                >
                    {selectedStudent && (
                        <div className="grid p-3">
                            {/* Vital Stats */}
                            <div className="col-12 lg:col-6 mb-4">
                                <div className="p-4 border-round bg-blue-50 flex align-items-center gap-4 h-full">
                                    <div className="p-4 bg-white border-round shadow-1 text-blue-500">
                                        <Scale size={32} />
                                    </div>
                                    <div>
                                        <span className="block text-blue-600 font-bold text-lg mb-1">Current Weight</span>
                                        <span className="text-4xl font-extrabold text-blue-900">{selectedStudent.weight} kg</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 lg:col-6 mb-4">
                                <div className="p-4 border-round bg-red-50 flex align-items-center gap-4 h-full">
                                    <div className="p-4 bg-white border-round shadow-1 text-red-500">
                                        <Ruler size={32} />
                                    </div>
                                    <div>
                                        <span className="block text-red-600 font-bold text-lg mb-1">Current Height</span>
                                        <span className="text-4xl font-extrabold text-red-900">{selectedStudent.height} cm</span>
                                    </div>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="col-12 mb-4">
                                <div className="surface-card p-4 border-round border-1 border-200">
                                    <div className="flex align-items-center gap-2 mb-4">
                                        <Activity size={20} className="text-green-600" />
                                        <h3 className="m-0">Health Analysis Chart</h3>
                                    </div>
                                    <div style={{ height: '400px' }}>
                                        <Chart type="line" data={chartData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>

                            {/* Vaccinations */}
                            <div className="col-12 md:col-6 mb-4">
                                <div className="surface-card p-4 border-round border-1 border-200 h-full">
                                    <div className="flex align-items-center gap-2 mb-4">
                                        <Syringe size={20} className="text-purple-600" />
                                        <h3 className="m-0">Vaccination Records</h3>
                                    </div>
                                    <div className="flex flex-column gap-3">
                                        {selectedStudent.vaccinations.map((v: any, i: number) => (
                                            <div key={i} className="flex align-items-center justify-content-between p-2 bg-gray-50 border-round">
                                                <span className="font-medium">{v.name}</span>
                                                <Tag value={v.status} severity={v.status === 'Completed' ? 'success' : 'warning'} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Meals */}
                            <div className="col-12 md:col-6 mb-4">
                                <div className="surface-card p-4 border-round border-1 border-200 h-full">
                                    <div className="flex align-items-center gap-2 mb-4">
                                        <Utensils size={20} className="text-orange-600" />
                                        <h3 className="m-0">Recent Meals</h3>
                                    </div>
                                    <div className="flex flex-column gap-3">
                                        {selectedStudent.meals.map((m: any, i: number) => (
                                            <div key={i} className="flex align-items-center justify-content-between p-2 bg-gray-50 border-round">
                                                <div>
                                                    <span className="block font-medium">{m.type}</span>
                                                    <span className="text-xs text-500">{m.date}</span>
                                                </div>
                                                <span className="text-gray-700">{m.menu}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Sidebar>
            </div>
        </MainLayout>
    );
};

export default Students;
