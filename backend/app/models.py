from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class DocumentUploadResponse(BaseModel):
    success: bool
    doc_id: str
    filename: str
    chunks_created: int
    message: str

class DocumentInfo(BaseModel):
    doc_id: str
    filename: str
    upload_date: str
    chunk_count: int

class Source(BaseModel):
    document: str
    chunk_text: str
    relevance_score: float

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]
    question: str

class HealthResponse(BaseModel):
    status: str
    backend: str
    database: dict
    llm: dict
