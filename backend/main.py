import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from api.endpoints import router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API handling offline-first payload synchronizations and ticket routing.",
    version="1.0.0"
)

# CORS middleware for the local React Native / Vite web interface to hit the endpoints smoothly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix=settings.API_V1_STR)

@app.get("/health")
def health_check():
    """Simple status endpoint for the mobile app to probe API availability."""
    return {"status": "ok", "message": "Fasal-Neeti Edge Sync API is running."}

if __name__ == "__main__":
    # Start the local development server 
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
