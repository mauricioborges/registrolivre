BEGIN;
LOCK documents;
ALTER TABLE documents ADD COLUMN issue_date DATE DEFAULT NULL;
END;