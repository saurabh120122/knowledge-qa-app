import google.generativeai as genai
from app.config import settings
from typing import List

genai.configure(api_key=settings.GEMINI_API_KEY)

def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """Generate embeddings using Google Gemini"""
    try:
        embeddings = []
        for text in texts:
            result = genai.embed_content(
                model="models/gemini-embedding-001", 
                content=text,
                task_type="retrieval_document"
            )
            embeddings.append(result['embedding'])
        return embeddings
    except Exception as e:
        raise Exception(f"Error generating embeddings: {str(e)}")

def generate_single_embedding(text: str) -> List[float]:
    """Generate embedding for a single text"""
    try:
        result = genai.embed_content(
            model="models/gemini-embedding-001",  
            content=text,
            task_type="retrieval_query"
        )
        return result['embedding']
    except Exception as e:
        raise Exception(f"Error generating embedding: {str(e)}")

def test_connection() -> bool:
    """Test if Gemini API is working"""
    try:
        generate_single_embedding("test")
        return True
    except:
        return False
