-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20),
  color VARCHAR(7), -- Hex color code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subjects_school_id ON subjects(school_id);
