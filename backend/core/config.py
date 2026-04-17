import os

class Settings:
    PROJECT_NAME: str = "Fasal-Neeti Backend API"
    API_V1_STR: str = "/api/v1"
    
    # In a real deployed environment, this comes from the environment variable.
    # Currently pointing to the local Docker PostgreSQL container based on the hackathon stack.
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://postgres:postgres@localhost:5432/fasalneeti"
    )

settings = Settings()
