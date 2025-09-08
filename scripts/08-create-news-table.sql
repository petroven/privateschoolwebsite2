-- Create news/announcements table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  target_audience VARCHAR(20) NOT NULL CHECK (target_audience IN ('all', 'teachers', 'parents')),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_school_id ON news(school_id);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
