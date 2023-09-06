import { type Internship } from 'src/models/student'

export const allGenders = [
    'Male',
    'Female',
    'NA',
]

export const allProgrammes = [
    'RSW',
    'RSD',
    'RIS',
    'RIT',
    'REI',
    'RDS',
    'RST',
    'RMM',
]

/*
Programmes

- RSW : Bachelor of Software Engineering
- RSD : Bachelor of Information Technology (Software Systems Development)
- RIS : Bachelor of Information Technology (Information Security)
- RIT : Bachelor of Information Technology (Internet Technology)
- REI : Bachelor of Information Systems (Enterprise Information Systems)
- RDS : Bachelor of Computer Science (Data Science)
- RST : Bachelor of Computer Science (Interactive Software Technology)
- RMM : Bachelor of Science (Management Mathematics with Computing)
*/

export const internships: readonly Internship[] = [
    {
        // students here
        name: 'hahaha',
        studentId: '22WMR01234',
        password: 'hahaha',
        icNo: '021111-00-1234',
        gender: ['Male'],
        programme: ['RSW'],
        studentEmail: 'hahaha-wm20@student.tarc.edu.my',
        personalEmail: 'hahaha@example.com',
        mobileNumber: '011-1111111',
    }
]