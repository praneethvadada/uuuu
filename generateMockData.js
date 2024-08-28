import fs from 'fs';
import faker from 'faker';

const batchNames = ['CODING_MASTERS', 'WEB_DEV', 'MOBILE_DEV', 'DATA_SCIENCE', 'AI_EXPERTS'];
const branches = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'];

const generateMockStudents = (numStudents) => {
  const students = [];
  for (let i = 1; i <= numStudents; i++) {
    const batch = batchNames[Math.floor(Math.random() * batchNames.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const roll_number = `ROLL${i.toString().padStart(4, '0')}`;
    students.push({
      roll_number,
      name: faker.name.findName(),
      password: 'password123',
      college_name: faker.company.companyName(),
      batch,
      branch,
      added_by: 1
    });
  }
  return students;
};

const mockStudents = generateMockStudents(50);

// Save to a file
fs.writeFileSync('mockStudents.json', JSON.stringify(mockStudents, null, 2));

console.log('Mock data saved to mockStudents.json');
