from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import documents, chat, health
from app.config import settings

# Create FastAPI app
app = FastAPI(
    title="Knowledge Q&A API",
    description="Upload documents and ask questions",
    version="1.0.0"
)

# CORS middleware - allows frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(documents.router)
app.include_router(chat.router)
app.include_router(health.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Knowledge Q&A API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api")
async def api_root():
    """API root"""
    return {
        "message": "API is running",
        "endpoints": {
            "documents": "/api/documents",
            "chat": "/api/chat/ask",
            "health": "/api/health"
        }
    }
