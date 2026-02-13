import os
import uuid
from datetime import datetime
from typing import List
from fastapi import UploadFile
from langchain.text_splitter import RecursiveCharacterTextSplitter
import PyPDF2

from app.config import settings
from app.database import get_collection
from app.services.embedding_service import generate_embeddings

def chunk_text(text: str) -> List[str]:
    """Split text into chunks"""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        length_function=len,
    )
    chunks = text_splitter.split_text(text)
    return chunks

def extract_text_from_file(file_path: str, filename: str) -> str:
    """Extract text from uploaded file"""
    ext = filename.lower().split('.')[-1]
    
    if ext == 'txt' or ext == 'md':
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    
    elif ext == 'pdf':
        text = ""
        with open(file_path, 'rb') as f:
            pdf_reader = PyPDF2.PdfReader(f)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    
    else:
        raise ValueError(f"Unsupported file type: {ext}")

async def upload_document(file: UploadFile) -> dict:
    """Upload and process a document with automatic cleanup on failure"""
    doc_id = str(uuid.uuid4())
    file_path = os.path.join(settings.UPLOAD_DIR, f"{doc_id}_{file.filename}")
    
    try:
        # Step 1: Save file to disk
        with open(file_path, 'wb') as f:
            content = await file.read()
            f.write(content)
        
        # Step 2: Extract text
        text = extract_text_from_file(file_path, file.filename)
        
        if not text.strip():
            raise ValueError("Document appears to be empty")
        
        # Step 3: Chunk the text
        chunks = chunk_text(text)
        
        # Step 4: Generate embeddings (might fail if API issue)
        embeddings = generate_embeddings(chunks)
        
        # Step 5: Store in ChromaDB
        collection = get_collection()
        
        ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]
        metadatas = [
            {
                "doc_id": doc_id,
                "filename": file.filename,
                "chunk_index": i,
                "upload_date": datetime.now().isoformat()
            }
            for i in range(len(chunks))
        ]
        
        collection.add(
            ids=ids,
            embeddings=embeddings,
            documents=chunks,
            metadatas=metadatas
        )
        
        return {
            "success": True,
            "doc_id": doc_id,
            "filename": file.filename,
            "chunks_created": len(chunks),
            "message": "Document uploaded successfully"
        }
    
    except Exception as e:
        # CLEANUP: Delete file if anything failed
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                print(f"Cleaned up file: {file_path}")
            except:
                pass
        
        # Re-raise with clear error message
        raise Exception(f"Upload failed: {str(e)}")

def get_all_documents() -> List[dict]:
    """Get list of all uploaded documents"""
    try:
        collection = get_collection()
        all_data = collection.get()
        
        if not all_data['ids']:
            return []
        
        doc_dict = {}
        for metadata in all_data['metadatas']:
            doc_id = metadata['doc_id']
            if doc_id not in doc_dict:
                doc_dict[doc_id] = {
                    "doc_id": doc_id,
                    "filename": metadata['filename'],
                    "upload_date": metadata['upload_date'],
                    "chunk_count": 0
                }
            doc_dict[doc_id]['chunk_count'] += 1
        
        return list(doc_dict.values())
    
    except Exception as e:
        raise Exception(f"Error getting documents: {str(e)}")

def delete_document(doc_id: str) -> bool:
    """Delete a document and all its chunks"""
    try:
        collection = get_collection()
        
        results = collection.get(where={"doc_id": doc_id})
        
        if not results['ids']:
            return False
        
        collection.delete(ids=results['ids'])
        
        # Delete file from disk
        for filename in os.listdir(settings.UPLOAD_DIR):
            if filename.startswith(doc_id):
                os.remove(os.path.join(settings.UPLOAD_DIR, filename))
        
        return True
    
    except Exception as e:
        raise Exception(f"Error deleting document: {str(e)}")
