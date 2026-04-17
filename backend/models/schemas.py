from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime

class SmartPayloadCreate(BaseModel):
    image_uri: str
    crop_type: Optional[str] = None
    soil_type: Optional[str] = None
    weather_context: Optional[Dict[str, Any]] = None
    ai_disease_guess: Optional[str] = None
    ai_confidence: Optional[float] = Field(None, ge=0, le=100)
    resource_optimizer_metrics: Optional[Dict[str, Any]] = None

class TicketCreate(BaseModel):
    farmer_id: UUID
    escalation_tier: int = Field(1, ge=1, le=3)
    
class OfflineScanRecord(BaseModel):
    payload: SmartPayloadCreate
    ticket: TicketCreate

class OfflineSyncRequest(BaseModel):
    records: List[OfflineScanRecord]

class OfflineSyncResponse(BaseModel):
    status: str
    message: str
    processed_count: int
    matched_tickets_count: int
