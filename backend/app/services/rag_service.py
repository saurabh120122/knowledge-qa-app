import google.generativeai as genai
from typing import List, Dict
from app.config import settings
from app.database import get_collection
from app.services.embedding_service import generate_single_embedding

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-3-flash-preview')

def retrieve_relevant_chunks(question: str, top_k: int = None) -> List[Dict]:
    """Retrieve relevant document chunks for a question"""
    if top_k is None:
        top_k = settings.TOP_K_RESULTS
    
    try:
        question_embedding = generate_single_embedding(question)
        collection = get_collection()
        results = collection.query(
            query_embeddings=[question_embedding],
            n_results=top_k
        )
        
        if not results['ids'][0]:
            return []
        
        chunks = []
        for i in range(len(results['ids'][0])):
            chunks.append({
                "document": results['metadatas'][0][i]['filename'],
                "chunk_text": results['documents'][0][i],
                "relevance_score": float(1 - results['distances'][0][i])
            })
        
        return chunks
    except Exception as e:
        raise Exception(f"Error retrieving chunks: {str(e)}")

def generate_answer(question: str, context_chunks: List[Dict]) -> str:
    """Generate answer using Gemini based on retrieved context"""
    if not context_chunks:
        return "I couldn't find any relevant information in your documents to answer this question."
    
    context = "\n\n".join([
        f"From {chunk['document']}:\n{chunk['chunk_text']}"
        for chunk in context_chunks
    ])
    
    prompt = f"""Based on the following document excerpts, answer the user's question. If the answer is not in the documents, say so clearly.

Document Excerpts:
{context}

Question: {question}

Answer:"""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise Exception(f"Error generating answer: {str(e)}")

def answer_question(question: str) -> dict:
    """Complete RAG pipeline: retrieve + generate"""
    try:
        chunks = retrieve_relevant_chunks(question)
        answer = generate_answer(question, chunks)
        return {
            "answer": answer,
            "sources": chunks,
            "question": question
        }
    except Exception as e:
        raise Exception(f"Error in RAG pipeline: {str(e)}")
