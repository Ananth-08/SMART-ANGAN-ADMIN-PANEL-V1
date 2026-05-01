import React, { useState, useRef } from 'react';
import MainLayout from '../components/MainLayout';
import { 
    BarChart3, 
    ArrowLeft, 
    FileDown, 
    Search, 
    Activity 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { mockData } from '../utils/mockData';

const Reports: React.FC = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef<DataTable<any>>(null);

    // Prepare health-record-wise data
    const healthData = mockData.students.map(s => ({
        id: s.id,
        name: s.name,
        school: mockData.schools.find(sc => sc.id === s.schoolId)?.name || 'Unknown',
        height: s.height,
        weight: s.weight,
        bmi: (s.weight / ((s.height / 100) ** 2)).toFixed(1),
        lastVaccination: s.vaccinations.filter(v => v.status === 'Completed').pop()?.name || 'None',
        pendingVaccinations: s.vaccinations.filter(v => v.status === 'Pending').length
    }));

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-2">
            <div>
                <span className="text-xl text-900 font-bold block">Health Metrics Report</span>
                <span className="text-sm text-500">Comprehensive health and nutritional data for all students</span>
            </div>
            <div className="flex gap-2">
                <span className="p-input-icon-left">
                    <Search size={18} className="absolute left-3 top-50 translate-y-n50 text-400" />
                    <InputText 
                        type="search" 
                        onInput={(e: any) => setGlobalFilter(e.target.value)} 
                        placeholder="Search Records..." 
                        className="pl-5"
                    />
                </span>
                <Button label="Export Health Data" icon={<FileDown size={18} className="mr-2" />} severity="success" onClick={exportCSV} />
            </div>
        </div>
    );

    return (
        <MainLayout>
            <div className="p-5">
                <div className="mb-6">
                    <Link to="/" className="flex align-items-center gap-2 text-gray-600 no-underline hover:text-gray-900 transition-colors mb-2">
                        <ArrowLeft size={18} />
                        <span className="font-semibold">Back to Control Panel</span>
                    </Link>
                    <div className="flex align-items-center gap-3">
                        <BarChart3 size={32} className="text-primary" />
                        <h1 className="text-3xl font-bold m-0 text-gray-900">System Reports</h1>
                    </div>
                </div>

                <div className="surface-card p-4 shadow-2 border-round">
                    <div className="flex align-items-center gap-2 mb-4 text-green-600">
                        <Activity size={20} />
                        <h3 className="m-0">Student Health Analytics Report</h3>
                    </div>
                    
                    <DataTable 
                        ref={dt}
                        value={healthData} 
                        dataKey="id" 
                        paginator 
                        rows={10} 
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        globalFilter={globalFilter}
                        header={header}
                        responsiveLayout="scroll"
                        className="p-datatable-sm"
                        stripedRows
                    >
                        <Column field="id" header="Student ID" sortable style={{ width: '10%' }}></Column>
                        <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                        <Column field="school" header="Anganwadi Center" sortable style={{ width: '20%' }}></Column>
                        <Column field="height" header="Height (cm)" sortable style={{ width: '10%' }}></Column>
                        <Column field="weight" header="Weight (kg)" sortable style={{ width: '10%' }}></Column>
                        <Column field="bmi" header="BMI" sortable style={{ width: '10%' }}></Column>
                        <Column field="lastVaccination" header="Last Vaccine" style={{ width: '10%' }}></Column>
                        <Column field="pendingVaccinations" header="Pending" sortable style={{ width: '10%' }}></Column>
                    </DataTable>
                </div>
            </div>
        </MainLayout>
    );
};

export default Reports;
