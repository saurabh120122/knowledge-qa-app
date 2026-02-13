from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Google Gemini Configuration
    GEMINI_API_KEY: str
    
    # Database Configuration
    CHROMA_PERSIST_DIR: str = "./chroma_db"
    UPLOAD_DIR: str = "./uploads"
    COLLECTION_NAME: str = "documents"
    
    # Chunking Configuration
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    
    # Retrieval Configuration
    TOP_K_RESULTS: int = 3
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
