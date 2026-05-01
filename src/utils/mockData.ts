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
        parentMobile: `98765432${i.toString().padStart(2, '0')}`,
        height: Math.floor(Math.random() * 20) + 90, // 90-110 cm
        weight: Math.floor(Math.random() * 10) + 12, // 12-22 kg
        vaccinations: [
            { name: 'BCG', status: 'Completed', date: '2026-01-10' },
            { name: 'Polio', status: 'Completed', date: '2026-02-15' },
            { name: 'MMR', status: 'Pending', date: '-' }
        ],
        meals: [
            { date: '2026-05-01', type: 'Breakfast', menu: 'Poha' },
            { date: '2026-05-01', type: 'Lunch', menu: 'Dal Rice' }
        ],
        healthHistory: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            weight: [14.2, 14.5, 14.8, 15.2, 15.5],
            height: [95, 95.5, 96, 96.8, 97.5]
        },
        attendance: Array.from({ length: 30 }, () => Math.random() > 0.2) // Last 30 days attendance
    }))
};
