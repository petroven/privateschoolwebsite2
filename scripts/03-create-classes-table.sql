-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL, -- CP, CE1, CE2, CM1, CM2, 6ème, etc.
  academic_year VARCHAR(9) NOT NULL, -- 2024-2025
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_classes_school_id ON classes(school_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
