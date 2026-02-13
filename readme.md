# Private Knowledge Q&A

A web application to upload documents and ask questions with AI-powered answers.

## Features
- Upload text documents (txt, pdf, md)
- View list of uploaded documents
- Ask questions about your documents
- Get answers with source attribution
- Health status monitoring

## Tech Stack
**Backend:** FastAPI, ChromaDB, LangChain, OpenAI
**Frontend:** React, Vite, Axios, React Router

## How to Run

### Backend
1. cd backend
2. pip install -r requirements.txt
3. cp .env.example .env (add your OpenAI API key)
4. uvicorn app.main:app --reload
5. Backend runs at http://localhost:8000

### Frontend
1. cd frontend
2. npm install
3. npm run dev
4. Frontend runs at http://localhost:5173

## Environment Variables
See `.env.example` files in backend and frontend folders.

## What's Done
- [x] Document upload and storage
- [x] Document listing and deletion
- [x] RAG-based question answering
- [x] Source attribution
- [x] Health status endpoint
- [x] Clean UI with React

## What's Not Done
- [ ] User authentication
- [ ] Conversation history persistence
- [ ] Multi-language support
