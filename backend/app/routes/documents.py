from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.models import DocumentUploadResponse, DocumentInfo
from app.services.document_service import upload_document, get_all_documents, delete_document

router = APIRouter(prefix="/api/documents", tags=["documents"])

@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document_endpoint(file: UploadFile = File(...)):
    """Upload a document"""
    # Validate file type
    allowed_extensions = ['txt', 'pdf', 'md']
    file_ext = file.filename.split('.')[-1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"File type not supported. Allowed: {', '.join(allowed_extensions)}"
        )
    
    try:
        result = await upload_document(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[DocumentInfo])
async def list_documents():
    """Get list of all uploaded documents"""
    try:
        documents = get_all_documents()
        return documents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{doc_id}")
async def delete_document_endpoint(doc_id: str):
    """Delete a document"""
    try:
        success = delete_document(doc_id)
        if not success:
            raise HTTPException(status_code=404, detail="Document not found")
        return {"success": True, "message": "Document deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
