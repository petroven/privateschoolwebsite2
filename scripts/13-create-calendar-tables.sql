-- Création des tables pour le système de calendrier
-- Table pour les événements du calendrier
CREATE TABLE IF NOT EXISTS calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('teacher', 'student', 'both')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('meeting', 'exam', 'holiday', 'event', 'course', 'parent_meeting')),
    location VARCHAR(255),
    created_by UUID NOT NULL REFERENCES users(id),
    class_id UUID REFERENCES classes(id),
    subject_id UUID REFERENCES subjects(id),
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_pattern VARCHAR(50), -- 'daily', 'weekly', 'monthly', 'yearly'
    recurrence_end_date TIMESTAMP WITH TIME ZONE,
    color VARCHAR(7) DEFAULT '#3b82f6', -- Couleur hexadécimale pour l'événement
    is_all_day BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les participants aux événements
CREATE TABLE IF NOT EXISTS calendar_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES calendar_events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    participation_status VARCHAR(20) DEFAULT 'pending' CHECK (participation_status IN ('pending', 'accepted', 'declined')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_calendar_events_school_date ON calendar_events(school_id, start_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_type ON calendar_events(event_type);
CREATE INDEX IF NOT EXISTS idx_calendar_events_class ON calendar_events(class_id);
CREATE INDEX IF NOT EXISTS idx_calendar_participants_user ON calendar_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_participants_event ON calendar_participants(event_id);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_calendar_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER trigger_update_calendar_events_updated_at
    BEFORE UPDATE ON calendar_events
    FOR EACH ROW
    EXECUTE FUNCTION update_calendar_events_updated_at();

-- Politiques RLS pour la sécurité
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_participants ENABLE ROW LEVEL SECURITY;

-- Politique pour les événements du calendrier
CREATE POLICY calendar_events_school_isolation ON calendar_events
    FOR ALL USING (school_id = current_setting('app.current_school_id')::UUID);

-- Politique pour les participants
CREATE POLICY calendar_participants_school_isolation ON calendar_participants
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM calendar_events ce 
            WHERE ce.id = event_id 
            AND ce.school_id = current_setting('app.current_school_id')::UUID
        )
    );
