import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { School, Users, ArrowLeft, Plus, Search, FileDown, Edit2, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { mockData } from '../utils/mockData';

const SchoolsStaff: React.FC = () => {
    // State
    const [schools, setSchools] = useState(mockData.schools);
    const [staff, setStaff] = useState(mockData.staff);
    const [schoolSidebarVisible, setSchoolSidebarVisible] = useState(false);
    const [staffSidebarVisible, setStaffSidebarVisible] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [editingSchool, setEditingSchool] = useState<any>(null);
    const [editingStaff, setEditingStaff] = useState<any>(null);

    // Form states
    const [schoolForm, setSchoolForm] = useState({ name: '', location: '' });
    const [staffForm, setStaffForm] = useState({ name: '', role: '', schoolId: '' });

    const toast = useRef<Toast>(null);
    const dtSchools = useRef<DataTable<any>>(null);
    const dtStaff = useRef<DataTable<any>>(null);

    // CRUD - Schools
    const handleSaveSchool = () => {
        if (!schoolForm.name || !schoolForm.location) {
            toast.current?.show({ severity: 'warn', summary: 'Validation', detail: 'Please fill all fields' });
            return;
        }

        if (editingSchool) {
            setSchools(schools.map(s => s.id === editingSchool.id ? { ...s, ...schoolForm } : s));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'School Updated' });
        } else {
            const newSchool = {
                id: `S${schools.length + 1}`,
                ...schoolForm
            };
            setSchools([...schools, newSchool]);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'School Added' });
        }
        setSchoolSidebarVisible(false);
        setSchoolForm({ name: '', location: '' });
        setEditingSchool(null);
    };

    const deleteSchool = (id: string) => {
        setSchools(schools.filter(s => s.id !== id));
        toast.current?.show({ severity: 'info', summary: 'Deleted', detail: 'School Removed' });
    };

    // CRUD - Staff
    const handleSaveStaff = () => {
        if (!staffForm.name || !staffForm.role || !staffForm.schoolId) {
            toast.current?.show({ severity: 'warn', summary: 'Validation', detail: 'Please fill all fields' });
            return;
        }

        if (editingStaff) {
            setStaff(staff.map(s => s.id === editingStaff.id ? { ...s, ...staffForm } : s));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Staff Updated' });
        } else {
            const newStaff = {
                id: `ST${staff.length + 1}`,
                ...staffForm
            };
            setStaff([...staff, newStaff]);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Staff Added' });
        }
        setStaffSidebarVisible(false);
        setStaffForm({ name: '', role: '', schoolId: '' });
        setEditingStaff(null);
    };

    const deleteStaff = (id: string) => {
        setStaff(staff.filter(s => s.id !== id));
        toast.current?.show({ severity: 'info', summary: 'Deleted', detail: 'Staff Removed' });
    };

    // Export
    const exportCSV = (selection: 'school' | 'staff') => {
        if (selection === 'school') dtSchools.current?.exportCSV();
        else dtStaff.current?.exportCSV();
    };

    // Templates
    const actionTemplate = (rowData: any, type: 'school' | 'staff') => {
        return (
            <div className="flex gap-2">
                <Button 
                    icon={<Edit2 size={14} />} 
                    rounded 
                    text 
                    severity="info" 
                    onClick={() => {
                        if (type === 'school') {
                            setEditingSchool(rowData);
                            setSchoolForm({ name: rowData.name, location: rowData.location });
                            setSchoolSidebarVisible(true);
                        } else {
                            setEditingStaff(rowData);
                            setStaffForm({ name: rowData.name, role: rowData.role, schoolId: rowData.schoolId });
                            setStaffSidebarVisible(true);
                        }
                    }} 
                />
                <Button 
                    icon={<Trash2 size={14} />} 
                    rounded 
                    text 
                    severity="danger" 
                    onClick={() => type === 'school' ? deleteSchool(rowData.id) : deleteStaff(rowData.id)} 
                />
            </div>
        );
    };

    const schoolNameTemplate = (rowData: any) => {
        const school = schools.find(s => s.id === rowData.schoolId);
        return school ? school.name : 'Unknown';
    };

    const header = (title: string, onAdd: () => void, onExport: () => void) => (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-2">
            <span className="text-xl text-900 font-bold">{title}</span>
            <div className="flex gap-2">
                <span className="p-input-icon-left">
                    <Search size={18} className="absolute left-3 top-50 translate-y-n50 text-400" />
                    <InputText 
                        type="search" 
                        onInput={(e: any) => setGlobalFilter(e.target.value)} 
                        placeholder="Search..." 
                        className="pl-5"
                    />
                </span>
                <Button label="Export" icon={<FileDown size={18} className="mr-2" />} severity="secondary" onClick={onExport} />
                <Button label="Add New" icon={<Plus size={18} className="mr-2" />} onClick={onAdd} />
            </div>
        </div>
    );

    return (
        <MainLayout>
            <Toast ref={toast} />
            
            <div className="p-5">
                <div className="mb-6 flex align-items-center justify-content-between">
                    <div>
                        <Link to="/" className="flex align-items-center gap-2 text-gray-600 no-underline hover:text-gray-900 transition-colors mb-2">
                            <ArrowLeft size={18} />
                            <span className="font-semibold">Back to Control Panel</span>
                        </Link>
                        <h1 className="text-3xl font-bold m-0 text-gray-900">Schools & Staffs Management</h1>
                    </div>
                </div>

                <div className="grid">
                    {/* Schools Table */}
                    <div className="col-12 mb-5">
                        <div className="surface-card p-4 shadow-2 border-round">
                            <DataTable 
                                ref={dtSchools}
                                value={schools} 
                                dataKey="id" 
                                paginator 
                                rows={5} 
                                globalFilter={globalFilter}
                                header={header("Anganwadi Centers", () => setSchoolSidebarVisible(true), () => exportCSV('school'))}
                                responsiveLayout="scroll"
                                className="p-datatable-sm"
                            >
                                <Column field="id" header="ID" sortable style={{ width: '10%' }}></Column>
                                <Column field="name" header="Name" sortable style={{ width: '40%' }}></Column>
                                <Column field="location" header="Location" sortable style={{ width: '35%' }}></Column>
                                <Column body={(rowData) => actionTemplate(rowData, 'school')} header="Actions" style={{ width: '15%' }}></Column>
                            </DataTable>
                        </div>
                    </div>

                    {/* Staff Table */}
                    <div className="col-12">
                        <div className="surface-card p-4 shadow-2 border-round">
                            <DataTable 
                                ref={dtStaff}
                                value={staff} 
                                dataKey="id" 
                                paginator 
                                rows={5} 
                                globalFilter={globalFilter}
                                header={header("Staff Directory", () => setStaffSidebarVisible(true), () => exportCSV('staff'))}
                                responsiveLayout="scroll"
                                className="p-datatable-sm"
                            >
                                <Column field="id" header="ID" sortable style={{ width: '10%' }}></Column>
                                <Column field="name" header="Name" sortable style={{ width: '30%' }}></Column>
                                <Column field="role" header="Role" sortable style={{ width: '25%' }}></Column>
                                <Column body={schoolNameTemplate} header="Assigned Center" sortable style={{ width: '20%' }}></Column>
                                <Column body={(rowData) => actionTemplate(rowData, 'staff')} header="Actions" style={{ width: '15%' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>

                {/* School Onboarding Sidebar */}
                <Sidebar 
                    visible={schoolSidebarVisible} 
                    onHide={() => {
                        setSchoolSidebarVisible(false);
                        setEditingSchool(null);
                        setSchoolForm({ name: '', location: '' });
                    }} 
                    position="right" 
                    className="w-full md:w-30rem"
                    header={editingSchool ? "Edit School" : "Onboard New School"}
                >
                    <div className="flex flex-column gap-4 p-2">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="schoolName" className="font-bold">Center Name</label>
                            <InputText 
                                id="schoolName" 
                                value={schoolForm.name} 
                                onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })} 
                                placeholder="e.g. Greenfield South Anganwadi"
                            />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="location" className="font-bold">Location</label>
                            <InputText 
                                id="location" 
                                value={schoolForm.location} 
                                onChange={(e) => setSchoolForm({ ...schoolForm, location: e.target.value })} 
                                placeholder="e.g. Greenfield North"
                            />
                        </div>
                        <Button label={editingSchool ? "Update Center" : "Onboard Center"} icon={<Plus size={18} className="mr-2" />} onClick={handleSaveSchool} className="mt-4" />
                    </div>
                </Sidebar>

                {/* Staff Onboarding Sidebar */}
                <Sidebar 
                    visible={staffSidebarVisible} 
                    onHide={() => {
                        setStaffSidebarVisible(false);
                        setEditingStaff(null);
                        setStaffForm({ name: '', role: '', schoolId: '' });
                    }} 
                    position="right" 
                    className="w-full md:w-30rem"
                    header={editingStaff ? "Edit Staff Member" : "Add New Staff"}
                >
                    <div className="flex flex-column gap-4 p-2">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="staffName" className="font-bold">Full Name</label>
                            <InputText 
                                id="staffName" 
                                value={staffForm.name} 
                                onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} 
                                placeholder="e.g. Priya Sharma"
                            />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="role" className="font-bold">Role</label>
                            <Dropdown 
                                id="role" 
                                value={staffForm.role} 
                                options={['Head Worker', 'Assistant', 'Health Supervisor', 'Cook']} 
                                onChange={(e) => setStaffForm({ ...staffForm, role: e.value })} 
                                placeholder="Select Role"
                            />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="assignedSchool" className="font-bold">Assigned Center</label>
                            <Dropdown 
                                id="assignedSchool" 
                                value={staffForm.schoolId} 
                                options={schools.map(s => ({ label: s.name, value: s.id }))} 
                                onChange={(e) => setStaffForm({ ...staffForm, schoolId: e.value })} 
                                placeholder="Select Center"
                            />
                        </div>
                        <Button label={editingStaff ? "Update Staff" : "Add Staff"} icon={<Plus size={18} className="mr-2" />} onClick={handleSaveStaff} className="mt-4" />
                    </div>
                </Sidebar>
            </div>
        </MainLayout>
    );
};

export default SchoolsStaff;
