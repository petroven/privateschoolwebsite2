-- Create media gallery tables with secure permissions
CREATE TABLE IF NOT EXISTS media_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  album_type VARCHAR(20) DEFAULT 'class_activity' CHECK (album_type IN ('class_activity', 'school_event', 'project', 'outing')),
  is_published BOOLEAN DEFAULT false,
  requires_consent BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES media_albums(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video')),
  thumbnail_path VARCHAR(500),
  caption TEXT,
  taken_at TIMESTAMP WITH TIME ZONE,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_file_id UUID REFERENCES media_files(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permission_status VARCHAR(20) DEFAULT 'pending' CHECK (permission_status IN ('pending', 'granted', 'denied')),
  consent_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(media_file_id, student_id)
);

CREATE TABLE IF NOT EXISTS media_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_file_id UUID REFERENCES media_files(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  access_type VARCHAR(20) NOT NULL CHECK (access_type IN ('view', 'download', 'share')),
  ip_address INET,
  user_agent TEXT,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_albums_school_id ON media_albums(school_id);
CREATE INDEX IF NOT EXISTS idx_media_albums_class_id ON media_albums(class_id);
CREATE INDEX IF NOT EXISTS idx_media_files_album_id ON media_files(album_id);
CREATE INDEX IF NOT EXISTS idx_media_permissions_student_id ON media_permissions(student_id);
CREATE INDEX IF NOT EXISTS idx_media_permissions_parent_id ON media_permissions(parent_id);
CREATE INDEX IF NOT EXISTS idx_media_access_log_media_file_id ON media_access_log(media_file_id);
