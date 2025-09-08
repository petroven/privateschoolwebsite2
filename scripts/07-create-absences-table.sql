-- Create absences table
CREATE TABLE IF NOT EXISTS absences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  period VARCHAR(20) NOT NULL, -- 'morning', 'afternoon', 'full_day'
  is_justified BOOLEAN DEFAULT false,
  reason TEXT,
  justification_document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_absences_student_id ON absences(student_id);
CREATE INDEX IF NOT EXISTS idx_absences_date ON absences(date);
