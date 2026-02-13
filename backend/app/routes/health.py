from fastapi import APIRouter, HTTPException
from app.models import HealthResponse
from app.database import get_collection
from app.services.embedding_service import test_connection

router = APIRouter(prefix="/api/health", tags=["health"])

@router.get("/", response_model=HealthResponse)
async def health_check():
    """Check health of all services"""
    try:
        # Check ChromaDB
        collection = get_collection()
        all_data = collection.get()
        doc_count = len(set([m['doc_id'] for m in all_data['metadatas']])) if all_data['metadatas'] else 0
        chunk_count = len(all_data['ids']) if all_data['ids'] else 0
        
        db_status = {
            "status": "healthy",
            "total_documents": doc_count,
            "total_chunks": chunk_count
        }
        
        # Check LLM connection
        llm_connected = test_connection()
        llm_status = {
            "status": "healthy" if llm_connected else "error",
            "provider": "Google Gemini",
            "model": "Gemini 3.0 Flash (Preview)"
        }
        
        overall_status = "healthy" if llm_connected else "degraded"
        
        return {
            "status": overall_status,
            "backend": "healthy",
            "database": db_status,
            "llm": llm_status
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
