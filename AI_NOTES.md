
# 🤖 AI Usage Documentation

This section explains how AI tools were used during development, what was independently verified, and the reasoning behind key technical decisions.

---

## 📊 AI Usage Breakdown

### 🔹 What AI Was Used For

#### 1. Boilerplate Code Generation (~40%)
- FastAPI route structures (standard CRUD patterns)
- React component templates
- Configuration files:
  - requirements.txt
  - package.json
  - vercel.json
  - render.yaml
- CORS middleware setup
- Pydantic request/response schemas

Why: These are standardized patterns where manual typing adds little value.

---

#### 2. Initial RAG Implementation (~30%)
- ChromaDB initialization & configuration
- Embedding API call structure (Gemini)
- Text chunking using RecursiveCharacterTextSplitter
- Similarity search query patterns

Why: Used AI for standard RAG scaffolding, then customized for project needs.

---

#### 3. Deployment Configuration (~10%)
- Render service template
- Vercel SPA routing
- .env.example structure

Why: Platform configs change frequently → templates save time.

---

#### 4. Error Interpretation
- Dependency conflicts
- CORS issues
- ChromaDB telemetry warnings
- Render deployment logs

Why: Faster diagnosis of common framework issues.

---

#### 5. Documentation Formatting
- Markdown structuring
- API documentation layout
- Technical write-up templates

---

## 🧠 Independent Engineering Decisions & Understanding

### ✅ RAG Architecture Design

Core Understanding:
- Embeddings convert text → high-dimensional semantic vectors
- Cosine similarity measures semantic closeness
- LLM is used only for generation — not retrieval
- Embeddings are created once at upload, not per query

Why It Matters:
This design makes queries fast and scalable.

---

### ✅ Error Handling Strategy

Transactional Upload:

```python
try:
    save_file()
    extract_text()
    chunk_text()
    generate_embeddings()
    store_in_chromadb()
except Exception:
    if os.path.exists(file_path):
        os.remove(file_path)
    raise
```

Result:
- No orphaned files
- Clean retry flow
- Consistent system state

---

### ✅ LLM Provider Selection

Final Choice → Google Gemini

Why:
- Generous free tier
- Comparable quality
- Fast responses
- Simple integration

Models Used:
- Embeddings → gemini-embedding-001
- Generation → gemini-3-flash-preview

---

### ✅ Deployment Platform Decision

Railway Issue: Port mapping failure despite correct config  
Switch → Render

Why:
- Clear FastAPI deployment flow
- Fewer moving parts
- Faster production readiness

---

### ✅ Python Version Resolution (Render)

Fix:
PYTHON_VERSION=3.11.9

---

### ✅ Storage Strategy

Render Free Tier Limitation: No persistent disk

Decision for Demo:
- Use temporary storage
- Document limitation clearly

Production Approach:
- S3 / GCS → document storage
- Managed vector DB → Pinecone / Weaviate

---

## 🧪 Testing Methodology

Functional Testing:
- 10+ documents uploaded
- 50+ query variations
- Manual source verification

Edge Cases:
- Unsupported formats
- Empty files
- Invalid API keys

Performance:
- Upload time measurement
- Concurrent uploads
- Vector query latency

---

## 🎯 Development Philosophy

AI = Accelerator, Not Decision Maker

Used AI For:
- Speed
- Best practices
- Boilerplate
- Debug hints

Not Used AI For:
- Architecture
- Trade-offs
- Core logic
- System design

Rule:
Never merge code without understanding it.

---

## 🏁 Final Outcome

✔ Fully functional RAG system  
✔ Clean architecture  
✔ Production deployment  
✔ Transparent limitations  
✔ Complete technical ownership  

AI accelerated development — engineering decisions remained human.
