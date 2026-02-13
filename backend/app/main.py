from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import documents, chat, health

app = FastAPI(
    title="Knowledge Q&A API",
    description="Upload documents and ask questions",
    version="1.0.0"
)

# CORS - Updated for Render + Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://*.vercel.app",
        "https://*.onrender.com",
        "*"  # Remove this in production if you want strict CORS
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router)
app.include_router(chat.router)
app.include_router(health.router)

@app.get("/")
async def root():
    return {
        "message": "Knowledge Q&A API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api")
async def api_root():
    return {
        "message": "API is running",
        "endpoints": {
            "documents": "/api/documents",
            "chat": "/api/chat/ask",
            "health": "/api/health"
        }
    }
