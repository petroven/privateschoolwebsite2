-- Insert sample data for multi-school setup

-- Insert sample schools
INSERT INTO schools (id, name, address, phone, email, subdomain, is_active, subscription_plan) VALUES
('1', 'École Sainte-Marie', '123 Rue de la Paix, 75001 Paris', '01 42 36 12 34', 'contact@sainte-marie.fr', 'sainte-marie', true, 'premium'),
('2', 'Institut Saint-Joseph', '456 Avenue des Champs, 69001 Lyon', '04 78 25 67 89', 'info@saint-joseph.fr', 'saint-joseph', true, 'standard'),
('3', 'Collège Notre-Dame', '789 Boulevard Victor Hugo, 13001 Marseille', '04 91 54 32 10', 'secretariat@notre-dame.fr', 'notre-dame', true, 'basic')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  subdomain = EXCLUDED.subdomain,
  updated_at = NOW();

-- Insert sample school settings
INSERT INTO school_settings (school_id, setting_key, setting_value, setting_type) VALUES
('1', 'grading_scale', '20', 'number'),
('1', 'allow_parent_messaging', 'true', 'boolean'),
('1', 'academic_year', '2024-2025', 'string'),
('2', 'grading_scale', '20', 'number'),
('2', 'allow_parent_messaging', 'true', 'boolean'),
('2', 'academic_year', '2024-2025', 'string'),
('3', 'grading_scale', '20', 'number'),
('3', 'allow_parent_messaging', 'false', 'boolean'),
('3', 'academic_year', '2024-2025', 'string')
ON CONFLICT (school_id, setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  updated_at = NOW();

-- Insert multi-school access for super admin
INSERT INTO school_users (user_id, school_id, role, is_primary) VALUES
('0', '1', 'admin', true),
('0', '2', 'admin', false),
('0', '3', 'admin', false)
ON CONFLICT (user_id, school_id) DO UPDATE SET
  role = EXCLUDED.role,
  is_primary = EXCLUDED.is_primary;

-- Insert sample subjects for each school
INSERT INTO subjects (school_id, name, code, color) VALUES
('1', 'Mathématiques', 'MATH', '#3B82F6'),
('1', 'Français', 'FR', '#EF4444'),
('1', 'Histoire-Géographie', 'HG', '#10B981'),
('1', 'Sciences', 'SCI', '#8B5CF6'),
('2', 'Mathématiques', 'MATH', '#3B82F6'),
('2', 'Français', 'FR', '#EF4444'),
('2', 'Anglais', 'EN', '#F59E0B'),
('2', 'Sciences', 'SCI', '#8B5CF6'),
('3', 'Mathématiques', 'MATH', '#3B82F6'),
('3', 'Français', 'FR', '#EF4444'),
('3', 'Histoire', 'HIST', '#10B981'),
('3', 'Physique-Chimie', 'PC', '#8B5CF6')
ON CONFLICT DO NOTHING;
