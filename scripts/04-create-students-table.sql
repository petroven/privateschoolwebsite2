-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  student_number VARCHAR(50) UNIQUE,
  parent_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_school_id ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_class_id ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_parent_id ON students(parent_id);
