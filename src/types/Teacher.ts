import { TeacherInstitution } from "./TeacherInstitution"

export type Teacher = {
    id: string,
    email: string,
    fullName: string,
    role: string,
    avatarId: string | null 
    // teacherInstitution: TeacherInstitution
}