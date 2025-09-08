// Database utility functions and queries
// This will be used when we connect to a real database

export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "DatabaseError"
  }
}

// Mock data for development (will be replaced with real database calls)
export const mockData = {
  schools: [
    {
      id: "1",
      name: "École Sainte-Marie",
      address: "123 Rue de la Paix, 75001 Paris",
      phone: "01 42 36 12 34",
      email: "contact@sainte-marie.fr",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  users: [
    {
      id: "1",
      school_id: "1",
      email: "admin@sainte-marie.fr",
      first_name: "Marie",
      last_name: "Dubois",
      role: "admin" as const,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      school_id: "1",
      email: "prof.martin@sainte-marie.fr",
      first_name: "Pierre",
      last_name: "Martin",
      role: "teacher" as const,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      school_id: "1",
      email: "parent.dupont@gmail.com",
      first_name: "Sophie",
      last_name: "Dupont",
      role: "parent" as const,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  classes: [
    {
      id: "1",
      school_id: "1",
      name: "CM2 A",
      level: "CM2",
      academic_year: "2024-2025",
      teacher_id: "2",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      school_id: "1",
      name: "CM1 B",
      level: "CM1",
      academic_year: "2024-2025",
      teacher_id: "2",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  students: [
    {
      id: "1",
      school_id: "1",
      class_id: "1",
      first_name: "Lucas",
      last_name: "Dupont",
      date_of_birth: "2012-05-15",
      parent_id: "3",
      student_number: "2024001",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      school_id: "1",
      class_id: "1",
      first_name: "Emma",
      last_name: "Bernard",
      date_of_birth: "2012-08-22",
      parent_id: "3",
      student_number: "2024002",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  subjects: [
    {
      id: "1",
      school_id: "1",
      name: "Mathématiques",
      code: "MATH",
      color: "#3b82f6",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      school_id: "1",
      name: "Français",
      code: "FR",
      color: "#ef4444",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      school_id: "1",
      name: "Histoire-Géographie",
      code: "HG",
      color: "#10b981",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  grades: [
    {
      id: "1",
      student_id: "1",
      subject_id: "1",
      teacher_id: "2",
      grade: 16,
      max_grade: 20,
      assignment_name: "Contrôle de géométrie",
      date: "2024-01-15",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      student_id: "1",
      subject_id: "2",
      teacher_id: "2",
      grade: 14,
      max_grade: 20,
      assignment_name: "Dictée préparée",
      date: "2024-01-18",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  absences: [
    {
      id: "1",
      student_id: "1",
      date: "2024-01-20",
      reason: "Maladie",
      is_justified: true,
      reported_by: "3",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  homework: [
    {
      id: "1",
      class_id: "1",
      subject_id: "1",
      teacher_id: "2",
      title: "Exercices de fractions",
      description: "Faire les exercices 1 à 5 page 42",
      due_date: "2024-01-25",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  messages: [
    {
      id: "1",
      sender_id: "2",
      recipient_id: "3",
      subject: "Résultats de Lucas",
      content: "Bonjour, je voulais vous informer des excellents résultats de Lucas ce trimestre.",
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  news: [
    {
      id: "1",
      school_id: "1",
      author_id: "1",
      title: "Rentrée scolaire 2024-2025",
      content: "La rentrée aura lieu le lundi 2 septembre 2024 à 8h30.",
      target_audience: "all",
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
}

// Database query functions (to be implemented with real database)
export async function getSchoolById(id: string) {
  // Mock implementation
  return mockData.schools.find((school) => school.id === id)
}

export async function getUserByEmail(email: string) {
  // Mock implementation
  return mockData.users.find((user) => user.email === email)
}

export async function getClassesBySchoolId(schoolId: string) {
  // Mock implementation
  return mockData.classes.filter((cls) => cls.school_id === schoolId)
}

export async function getStudentsByClassId(classId: string) {
  return mockData.students.filter((student) => student.class_id === classId)
}

export async function getGradesByStudentId(studentId: string) {
  return mockData.grades.filter((grade) => grade.student_id === studentId)
}

export async function getStudentsByParentId(parentId: string) {
  return mockData.students.filter((student) => student.parent_id === parentId)
}

export async function getSubjectsBySchoolId(schoolId: string) {
  return mockData.subjects.filter((subject) => subject.school_id === schoolId)
}

export async function getAbsencesByStudentId(studentId: string) {
  return mockData.absences.filter((absence) => absence.student_id === studentId)
}

export async function getHomeworkByClassId(classId: string) {
  return mockData.homework.filter((hw) => hw.class_id === classId)
}

export async function getMessagesByUserId(userId: string) {
  return mockData.messages.filter((message) => message.sender_id === userId || message.recipient_id === userId)
}

export async function getNewsBySchoolId(schoolId: string) {
  return mockData.news.filter((news) => news.school_id === schoolId && news.is_published)
}

export async function getUsersByRole(schoolId: string, role: string) {
  return mockData.users.filter((user) => user.school_id === schoolId && user.role === role)
}

// CRUD operations for creating new records
export async function createUser(userData: any) {
  const newUser = {
    id: String(mockData.users.length + 1),
    ...userData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockData.users.push(newUser)
  return newUser
}

export async function createClass(classData: any) {
  const newClass = {
    id: String(mockData.classes.length + 1),
    ...classData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockData.classes.push(newClass)
  return newClass
}

export async function createNews(newsData: any) {
  const newNews = {
    id: String(mockData.news.length + 1),
    ...newsData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockData.news.push(newNews)
  return newNews
}

export async function createMessage(messageData: any) {
  const newMessage = {
    id: String(mockData.messages.length + 1),
    ...messageData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockData.messages.push(newMessage)
  return newMessage
}

export async function createAbsence(absenceData: any) {
  const newAbsence = {
    id: String(mockData.absences.length + 1),
    ...absenceData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockData.absences.push(newAbsence)
  return newAbsence
}

// Update operations
export async function updateUser(id: string, userData: any) {
  const userIndex = mockData.users.findIndex((user) => user.id === id)
  if (userIndex !== -1) {
    mockData.users[userIndex] = {
      ...mockData.users[userIndex],
      ...userData,
      updated_at: new Date().toISOString(),
    }
    return mockData.users[userIndex]
  }
  return null
}

export async function markMessageAsRead(messageId: string) {
  const messageIndex = mockData.messages.findIndex((msg) => msg.id === messageId)
  if (messageIndex !== -1) {
    mockData.messages[messageIndex].is_read = true
    mockData.messages[messageIndex].updated_at = new Date().toISOString()
    return mockData.messages[messageIndex]
  }
  return null
}
