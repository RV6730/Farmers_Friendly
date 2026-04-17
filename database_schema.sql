-- Fasal-Neeti PostgreSQL Database Schema

CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    region VARCHAR(100),
    preferred_language VARCHAR(50) DEFAULT 'hi-IN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE experts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    tier INT NOT NULL CHECK (tier IN (1, 2, 3)), -- 1: Gov/Free, 2: University/Micro-fee, 3: Private/Premium
    rating NUMERIC(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE smart_payloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_uri TEXT NOT NULL, -- S3/Cloud Storage link to the crop image
    crop_type VARCHAR(100),
    soil_type VARCHAR(100),
    weather_context JSONB, -- Storing cached weather info
    ai_disease_guess VARCHAR(100),
    ai_confidence NUMERIC(5, 2) CHECK (ai_confidence >= 0 AND ai_confidence <= 100),
    resource_optimizer_metrics JSONB, -- E.g., {"water_needed_liters": 5, "fertilizer_npk": "10-20-10"}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
    payload_id UUID REFERENCES smart_payloads(id) ON DELETE CASCADE,
    expert_id UUID REFERENCES experts(id) ON DELETE SET NULL, -- Null if unassigned
    status VARCHAR(50) DEFAULT 'pending_sync' CHECK (status IN ('pending_sync', 'open', 'assigned', 'resolved', 'closed')),
    escalation_tier INT DEFAULT 1 CHECK (escalation_tier IN (1, 2, 3)),
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE micro_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
    expert_id UUID REFERENCES experts(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance on commonly queried fields
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_farmer_id ON tickets(farmer_id);
CREATE INDEX idx_tickets_expert_id ON tickets(expert_id);
CREATE INDEX idx_transactions_status ON micro_transactions(status);
