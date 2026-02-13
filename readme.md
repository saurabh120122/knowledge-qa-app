# Private Knowledge Q&A - RAG Application

A full-stack web application that allows users to upload documents and ask questions using AI-powered semantic search and natural language generation.

---

## 🌐 Live Demo

- **Frontend:** https://knowledge-qa-app-tan.vercel.app/ 
- **Backend API:** https://knowledge-qa-app-bazh.onrender.com 
---

## ✨ Features

- Document upload (.txt, .pdf, .md)
- Semantic search using vector embeddings
- AI-generated grounded answers
- Source attribution with relevance scores
- Real-time system health monitoring
- Clean and responsive React UI

---

## 🛠️ Tech Stack

### Backend
- FastAPI (Python 3.11)
- ChromaDB
- Google Gemini embeddings
- Google Gemini 3 Flash (Preview)
- LangChain (text chunking)
- PyPDF2

### Frontend
- React 18 + Vite
- React Router v6
- Axios
- Tailwind CSS (CDN)
- Lucide React

### Deployment
- Render (Backend)
- Vercel (Frontend)
- Temporary file storage (demo)

---

## 📋 RAG Pipeline

### 1️⃣ Document Upload
- Extract text
- Chunk into ~1000 characters
- Generate 768‑dimensional embeddings
- Store vectors in ChromaDB

### 2️⃣ Question Answering
- Convert question → embedding
- Retrieve top‑K similar chunks
- Send context to Gemini
- Generate grounded answer
- Return answer + sources

### 3️⃣ Why RAG
- Semantic understanding
- Reduced hallucinations
- Full source transparency

---

## 🚀 Local Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## 📁 Project Structure

```
knowledge-qa-app/
├── backend/
├── frontend/
├── README.md
├── AI_NOTES.md
├── ABOUTME.md
├── PROMPTS_USED.md
└── .gitignore
```

---

## 🔧 API Endpoints

### Documents
- POST `/api/documents/upload`
- GET `/api/documents/`
- DELETE `/api/documents/{doc_id}`

### Chat
- POST `/api/chat/ask`

### Health
- GET `/api/health/`

---

## ✅ Implemented

- Document upload & deletion
- Semantic search
- RAG Q&A
- Source attribution
- Health monitoring
- Transactional uploads
- Error handling
- CORS configuration
- Responsive UI
- Production deployment

---

## ⚠️ Known Limitations

### Storage
- Render free tier → non‑persistent
- Documents reset on redeploy

### Cold Starts
- 30–60 seconds after inactivity

### Upload Performance
- Sequential embedding generation

---

## 🔐 Environment Variables

### Backend

```
GEMINI_API_KEY=
GEMINI_EMBEDDING_MODEL=models/gemini-embedding-001
GEMINI_GENERATIVE_MODEL=gemini-3-flash-preview
CHROMA_PERSIST_DIR=./chroma_db
UPLOAD_DIR=./uploads
```

### Frontend

```
VITE_API_URL=
```

---

## 🧪 Testing

- Multiple file formats
- Edge cases
- Source accuracy
- Deletion cleanup
- Health endpoint
- CORS validation
- Responsive UI

---

## 📈 Future Enhancements

### Backend
- Auth & document ownership
- Conversation history
- More file types
- Batch uploads
- Async embeddings

### Frontend
- Markdown rendering
- Streaming responses
- Document preview
- Advanced filters
- Dark mode

### Infrastructure
- Persistent storage
- CI/CD
- Monitoring
- Automated tests

---

## 🐛 Troubleshooting

### Backend
- Check Python 3.11+
- Verify dependencies
- Validate API key

### Frontend
- Check VITE_API_URL
- Verify CORS
- Test backend `/docs`

### ChromaDB
- Delete `chroma_db` and restart

### Gemini API
- Validate key
- Check quota
- Verify model names

---

## 👤 Author

**Saurabh Chaurasiya**  
B.Tech, IIT Delhi  

- GitHub: your-github  
- LinkedIn: your-linkedin  
- Email: your-email  

---

## 📚 Documentation

- `AI_NOTES.md`
- `PROMPTS_USED.md`
- `ABOUTME.md`
