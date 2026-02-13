import chromadb
from chromadb.config import Settings as ChromaSettings
from app.config import settings
import os

# Ensure directories exist
os.makedirs(settings.CHROMA_PERSIST_DIR, exist_ok=True)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

# Initialize ChromaDB client with persistence
chroma_client = chromadb.PersistentClient(
    path=settings.CHROMA_PERSIST_DIR,
    settings=ChromaSettings(
        anonymized_telemetry=False,
        allow_reset=True
    )
)

def get_or_create_collection():
    """Get or create the documents collection"""
    try:
        collection = chroma_client.get_collection(name=settings.COLLECTION_NAME)
    except:
        collection = chroma_client.create_collection(
            name=settings.COLLECTION_NAME,
            metadata={"description": "Document embeddings for Q&A"}
        )
    return collection

def get_collection():
    """Get the documents collection"""
    return get_or_create_collection()
