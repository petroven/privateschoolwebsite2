-- Row Level Security policies for multi-school data isolation

-- Schools table policies
CREATE POLICY "Users can view their accessible schools" ON schools
  FOR SELECT USING (
    id IN (
      SELECT school_id FROM school_users WHERE user_id = auth.uid()
      UNION
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage schools" ON schools
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND (
        school_id = schools.id 
        OR EXISTS (
          SELECT 1 FROM school_users 
          WHERE user_id = auth.uid() 
          AND school_id = schools.id 
          AND role = 'admin'
        )
      )
    )
  );

-- Users table policies
CREATE POLICY "Users can view users from their schools" ON users
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM school_users WHERE user_id = auth.uid()
      UNION
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can manage users in their schools" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() 
      AND u.role = 'admin'
      AND (
        u.school_id = users.school_id
        OR EXISTS (
          SELECT 1 FROM school_users su
          WHERE su.user_id = auth.uid() 
          AND su.school_id = users.school_id 
          AND su.role = 'admin'
        )
      )
    )
  );

-- Classes table policies
CREATE POLICY "Users can view classes from their school" ON classes
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM school_users WHERE user_id = auth.uid()
      UNION
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Teachers and admins can manage classes" ON classes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND school_id = classes.school_id
      AND role IN ('admin', 'teacher')
    )
  );

-- Students table policies
CREATE POLICY "Users can view students from their school" ON students
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM school_users WHERE user_id = auth.uid()
      UNION
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Parents can only see their children" ON students
  FOR SELECT USING (
    parent_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND school_id = students.school_id
      AND role IN ('admin', 'teacher')
    )
  );

-- Grades table policies
CREATE POLICY "Users can view grades from their school context" ON grades
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s
      JOIN users u ON u.id = auth.uid()
      WHERE s.id = grades.student_id
      AND (
        s.school_id = u.school_id
        OR s.parent_id = auth.uid()
      )
    )
  );

-- News table policies
CREATE POLICY "Users can view news from their schools" ON news
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM school_users WHERE user_id = auth.uid()
      UNION
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

-- School settings policies
CREATE POLICY "Users can view settings from their schools" ON school_settings
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM school_users WHERE user_id = auth.uid()
      UNION
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage school settings" ON school_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND (
        school_id = school_settings.school_id
        OR EXISTS (
          SELECT 1 FROM school_users 
          WHERE user_id = auth.uid() 
          AND school_id = school_settings.school_id 
          AND role = 'admin'
        )
      )
    )
  );
