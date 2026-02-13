from fastapi import APIRouter, HTTPException
from app.models import ChatRequest, ChatResponse
from app.services.rag_service import answer_question

router = APIRouter(prefix="/api/chat", tags=["chat"])

@router.post("/ask", response_model=ChatResponse)
async def ask_question(request: ChatRequest):
    """Ask a question and get an answer based on uploaded documents"""
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    try:
        result = answer_question(request.question)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
