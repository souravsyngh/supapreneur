-- Create companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    upvotes BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create votes table
CREATE TABLE votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, company_id)
);

-- Create function to handle votes
CREATE OR REPLACE FUNCTION handle_vote(p_user_id UUID, p_company_id UUID)
RETURNS TABLE (action TEXT, vote_count BIGINT) AS $$
DECLARE
    v_exists BOOLEAN;
BEGIN
    -- Check if the vote exists
    SELECT EXISTS (
        SELECT 1 FROM votes
        WHERE user_id = p_user_id AND company_id = p_company_id
    ) INTO v_exists;

    IF v_exists THEN
        -- Remove vote
        DELETE FROM votes
        WHERE user_id = p_user_id AND company_id = p_company_id;
        action := 'removed';
        
        -- Decrease upvotes count
        UPDATE companies
        SET upvotes = upvotes - 1
        WHERE id = p_company_id;
    ELSE
        -- Add vote
        INSERT INTO votes (user_id, company_id)
        VALUES (p_user_id, p_company_id);
        action := 'added';
        
        -- Increase upvotes count
        UPDATE companies
        SET upvotes = upvotes + 1
        WHERE id = p_company_id;
    END IF;

    -- Get the new vote count
    SELECT upvotes INTO vote_count
    FROM companies
    WHERE id = p_company_id;

    RETURN NEXT;
END;
$$ LANGUAGE plpgsql;
