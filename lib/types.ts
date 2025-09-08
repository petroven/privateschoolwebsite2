// Database types for the educational platform

export interface School {
  id: string
  name: string
  address?: string
  phone?: string
  email?: string
  logo_url?: string
  subdomain?: string
  timezone?: string
  academic_year_start_month?: number
  academic_year_end_month?: number
  is_active?: boolean
  subscription_plan?: "basic" | "standard" | "premium"
  max_students?: number
  max_teachers?: number
  created_at: string
  updated_at: string
}

export interface SchoolSetting {
  id: string
  school_id: string
  setting_key: string
  setting_value: string
  setting_type: "string" | "number" | "boolean" | "json"
  created_at: string
  updated_at: string
}

export interface SchoolUser {
  id: string
  user_id: string
  school_id: string
  role: "admin" | "teacher" | "parent"
  is_primary: boolean
  permissions: Record<string, any>
  created_at: string
}

export interface AuditLog {
  id: string
  school_id: string
  user_id?: string
  table_name: string
  record_id?: string
  action: "INSERT" | "UPDATE" | "DELETE"
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  created_at: string
}

export interface User {
  id: string
  school_id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  role: "admin" | "teacher" | "parent"
  phone?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Class {
  id: string
  school_id: string
  name: string
  level: string
  academic_year: string
  teacher_id?: string
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  school_id: string
  class_id?: string
  first_name: string
  last_name: string
  date_of_birth: string
  student_number?: string
  parent_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Subject {
  id: string
  school_id: string
  name: string
  code?: string
  color?: string
  created_at: string
}

export interface Grade {
  id: string
  student_id: string
  subject_id: string
  teacher_id?: string
  grade: number
  max_grade: number
  grade_type: string
  description?: string
  date_given: string
  created_at: string
  updated_at: string
}

export interface Absence {
  id: string
  student_id: string
  teacher_id?: string
  date: string
  period: "morning" | "afternoon" | "full_day"
  is_justified: boolean
  reason?: string
  justification_document_url?: string
  created_at: string
  updated_at: string
}

export interface News {
  id: string
  school_id: string
  author_id?: string
  title: string
  content: string
  target_audience: "all" | "teachers" | "parents"
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  subject: string
  content: string
  is_read: boolean
  parent_message_id?: string
  created_at: string
}

// Extended types with relations
export interface StudentWithDetails extends Student {
  class?: Class
  parent?: User
}

export interface GradeWithDetails extends Grade {
  student?: Student
  subject?: Subject
  teacher?: User
}

export interface MessageWithDetails extends Message {
  sender?: User
  recipient?: User
}

export interface UserWithSchool extends User {
  school?: School
  accessible_schools?: School[]
}

export interface SchoolWithSettings extends School {
  settings?: SchoolSetting[]
}

export interface CalendarEvent {
  id: string
  school_id: string
  title: string
  description?: string
  start_date: string
  end_date: string
  event_type: "teacher" | "student" | "both"
  category: "meeting" | "exam" | "holiday" | "event" | "course" | "parent_meeting"
  location?: string
  created_by: string
  class_id?: string
  subject_id?: string
  is_recurring: boolean
  recurrence_pattern?: "daily" | "weekly" | "monthly" | "yearly"
  recurrence_end_date?: string
  color: string
  is_all_day: boolean
  created_at: string
  updated_at: string
}

export interface CalendarParticipant {
  id: string
  event_id: string
  user_id: string
  participation_status: "pending" | "accepted" | "declined"
  created_at: string
}

export interface CalendarEventWithDetails extends CalendarEvent {
  creator?: User
  class?: Class
  subject?: Subject
  participants?: CalendarParticipant[]
}

export interface CalendarParticipantWithDetails extends CalendarParticipant {
  user?: User
  event?: CalendarEvent
}
