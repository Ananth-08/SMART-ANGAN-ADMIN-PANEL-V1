export const mockData = {
    schools: [
        { id: 'S1', name: 'Anganwadi Center - Greenfield', location: 'Greenfield South' },
        { id: 'S2', name: 'Anganwadi Center - Blue Valley', location: 'Blue Valley North' },
        { id: 'S3', name: 'Anganwadi Center - Sunshine', location: 'Sunshine Heights' },
        { id: 'S4', name: 'Anganwadi Center - Riverdale', location: 'Riverdale East' },
    ],
    staff: [
        { id: 'ST1', name: 'Priya Sharma', role: 'Head Worker', schoolId: 'S1' },
        { id: 'ST2', name: 'Anita Devi', role: 'Assistant', schoolId: 'S1' },
        { id: 'ST3', name: 'Sunita Verma', role: 'Head Worker', schoolId: 'S2' },
        { id: 'ST4', name: 'Meena Kumari', role: 'Assistant', schoolId: 'S2' },
        { id: 'ST5', name: 'Rekha Singh', role: 'Head Worker', schoolId: 'S3' },
        { id: 'ST6', name: 'Gita Rani', role: 'Assistant', schoolId: 'S3' },
        { id: 'ST7', name: 'Suman Lata', role: 'Head Worker', schoolId: 'S4' },
        { id: 'ST8', name: 'Pooja Bhatt', role: 'Assistant', schoolId: 'S4' },
    ],
    students: Array.from({ length: 200 }, (_, i) => ({
        id: `STD${i + 1}`,
        name: `Student ${i + 1}`,
        age: Math.floor(Math.random() * 3) + 3, // 3-5 years
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        schoolId: `S${(i % 4) + 1}`,
        attendance: Array.from({ length: 30 }, () => Math.random() > 0.2) // Last 30 days attendance
    }))
};
