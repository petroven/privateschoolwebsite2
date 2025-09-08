-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  grade DECIMAL(4,2) NOT NULL,
  max_grade DECIMAL(4,2) NOT NULL DEFAULT 20,
  grade_type VARCHAR(50) NOT NULL, -- 'devoir', 'controle', 'oral', etc.
  description TEXT,
  date_given DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_grades_student_id ON grades(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_subject_id ON grades(subject_id);
CREATE INDEX IF NOT EXISTS idx_grades_date_given ON grades(date_given);
