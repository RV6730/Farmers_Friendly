from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, ConfigDict, Field
from models.schemas import OfflineSyncRequest, OfflineSyncResponse
from services.matching_service import MatchingService
from services.ml_prediction_service import ml_predictor
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class FertilizerPredictionRequest(BaseModel):
    nitrogen: float = Field(..., ge=0, le=100)
    phosphorus: float = Field(..., ge=0, le=100)
    potassium: float = Field(..., ge=0, le=100)
    temperature: float = Field(..., description="Temperature in Celsius")
    moisture: float = Field(..., ge=0, le=100)
    use_deep_learning: bool = True

class FertilizerPredictionResponse(BaseModel):
    recommended_fertilizer_kg: float
    model_used: str

async def run_matching_engine_background():
    """Runs the ticket-to-expert router asynchronously after data sync."""
    try:
        matched_count = await MatchingService.auto_assign_experts()
        logger.info(f"Background matching complete. Assigned {matched_count} tickets.")
    except Exception as e:
        logger.error(f"Error during background expert matching: {e}")

@router.post("/sync", response_model=OfflineSyncResponse)
async def sync_offline_records(request: OfflineSyncRequest, background_tasks: BackgroundTasks):
    """
    Consumer Endpoint for the Store-and-Forward architecture.
    Receives an array of payloads the mobile app collected while offline.
    """
    if not request.records:
        raise HTTPException(status_code=400, detail="Empty sync payload provided.")
        
    try:
        # 1. Process the queued records into DB
        processed_count = await MatchingService.process_sync_payload(request.records)
        
        # 2. Trigger the Matching Engine in the background so the Farmer 
        #    gets an immediate fast 200 OK response on their shaky 2G connection
        background_tasks.add_task(run_matching_engine_background)
        
        return OfflineSyncResponse(
            status="success",
            message="Offline payload synchronized. Matching engine triggered.",
            processed_count=processed_count,
            matched_tickets_count=0 # Updated asynchronously
        )
        
    except Exception as e:
        logger.error(f"Sync failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during DB synchronization.")

@router.post("/predict-fertilizer", response_model=FertilizerPredictionResponse)
def predict_fertilizer_req(request: FertilizerPredictionRequest):
    """
    ML Prediction Endpoint:
    Uses trained Scikit-Learn Regression & TensorFlow DNN models 
    to return optimal crop yields or fertilizer inputs.
    """
    try:
        prediction = ml_predictor.predict_fertilizer(
            n=request.nitrogen,
            p=request.phosphorus,
            k=request.potassium,
            temp=request.temperature,
            moisture=request.moisture,
            use_tf=request.use_deep_learning
        )
        
        return FertilizerPredictionResponse(
            recommended_fertilizer_kg=prediction["recommended_fertilizer_kg"],
            model_used=prediction["model_used"]
        )
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail="Error generating ML prediction.")
