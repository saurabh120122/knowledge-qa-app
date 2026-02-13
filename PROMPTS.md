# AI-Assisted Development - Prompt Log

This document records all prompts used during the development of the Knowledge Q&A application, demonstrating my approach to AI-assisted development and independent decision-making.

## Project Setup & Architecture

### Initial Planning
I received a take-home assignment to build a RAG-based document Q&A system.
Tell me for each problem statement (A and B) what are the tools required and which should I choose.

text

**Decision Made:** Selected Problem A (Private Knowledge Q&A) based on:
- Better alignment with AI/ML career interests
- Clearer requirements and evaluation criteria
- RAG systems are in high demand
- More relevant to Agentic AI roles

Ok let's do A. Please tell me the flow of the project like what user sees and when they click anything which things happen.

text

**Reason:** Needed to understand complete user journey and backend processes before coding.

---

## Architecture Decisions

### Flow Understanding
Can we do it like you and me as mentioned in the message?

text

**Decision Made:** Chose collaborative AI-assisted approach:
- Use AI for boilerplate and standard patterns
- Maintain understanding of all generated code
- Make architectural decisions independently

Why Node.js is needed? Is it for React?

text

**Verification:** Confirmed understanding of development stack dependencies before proceeding.

### Project Structure
Ok setup, project structure first then we move ahead.

text

**Decision Made:** Established clear project structure before writing any code to ensure scalability.

---

## Critical Technical Decisions

### Error Handling Strategy
If embeddings fail, document upload to local fails right?

text

**Analysis:** Identified potential issue with partial uploads leading to orphaned files.

**Decision Made:** Implemented transactional upload approach:
- Delete file if embedding generation fails
- Ensure clean state always
- Better UX with clear error messages
- Rejected two-phase upload as unnecessarily complex for this use case

**Rationale:** Simpler is better for demo; user can retry upload easily.

---

### Embedding & Storage Architecture
Is it necessary to do embedding and store it to ChromaDB? Can we do it later like firstly just upload the document only then by any button we do rest?

text

**Analysis:** Evaluated two-step vs single-step processing:
- Considered user experience impact
- Evaluated processing time (2-5 seconds acceptable)
- Assessed complexity trade-offs

**Decision Made:** Single-step processing (embed immediately)
**Reasoning:**
- Better UX (one action, immediately ready)
- No confusion about document readiness
- Standard industry practice for RAG systems
- No real performance benefit to splitting

---

## Technology Stack Decisions

### LLM Provider Selection
Error: OpenAI quota exceeded during upload.

text

**Problem:** OpenAI API quota exhausted.

**Decision Made:** Switched from OpenAI to Google Gemini
**Reasoning:**
- Free tier with generous quotas
- High-quality embeddings (gemini-embedding-001)
- Fast response times (gemini-3-flash-preview)
- No billing required for development

Few things first I am using Gemini not OpenAI so correct requirement.txt
Embedding model: gemini-embedding-001
Generative model: gemini-3-flash-preview

text

**Action Taken:** 
- Removed OpenAI dependencies completely
- Updated all service files to use Gemini APIs
- Modified configuration for Gemini-specific models

---

### Understanding Core Concepts
What about LLM model? Is ChromaDB using local storage? How questions are answered using embedding?

text

**Verification:** Before deployment, ensured complete understanding of:
- LLM role in answer generation (not search)
- ChromaDB persistence mechanism (local SQLite + binary files)
- Embedding similarity search mathematics (cosine similarity)
- RAG pipeline flow (retrieve → generate)

**Demonstrated Understanding:** Asked about specific technical details rather than just implementing.

---

## Deployment Strategy

### Platform Selection
Ok now deployment. I think for frontend Vercel and for backend we should use Railway.

text

**Decision Made:** Initial choice of Railway for backend
**Reasoning:** Known for good developer experience and automatic deployments

### Problem-Solving: Railway Port Issues
During domain creation it's asking for port and 8080 is not working after I mapped.

text

**Debugging Approach:** Identified port mapping issue in Railway.

But it's already running on 8080 so why do they need port? For mapping the domain to port they're asking it.

text

**Analysis:** Understood Railway's internal vs external port mapping architecture.

**Decision Made After Troubleshooting:** Switched from Railway to Render
**Reasoning:**
- Railway port configuration too complex for deadline
- Render has simpler configuration
- Better documentation for Python apps

Forget it, I am going with Render. Give me the changes - adding or removing files.

text

**Independent Decision:** Made platform switch decision independently based on time constraints and ease of use.

---

## Deployment Issues & Solutions

### Python Version Problem
It's using Python 3.14 and getting problem in deployment despite we have mentioned it in render.yaml.

text

**Problem Identified:** Render ignoring Python version in render.yaml

**Solution Attempted:** Created runtime.txt with Python 3.11.9

**Issue Resolution (Self-Solved):**
I have solved the problem of Render using default version of Python and I have fixed it by using Python version in env variable not only in runtime.txt file.

text

**My Solution:**
- Added PYTHON_VERSION environment variable in Render dashboard
- Combined with runtime.txt for redundancy
- Tested and verified Python 3.11 is used in builds

**Learning:** Render prioritizes environment variables over config files for Python version.

---

## UI/UX Improvements

### Status Page Enhancement
Update the status page like provide name Gemini model name 3 Flash.

text

**Decision Made:** Display accurate model information in health status
**Implementation:** Updated health endpoint to show "Google Gemini" and "Gemini 3 Flash (Preview)"

### Markdown Formatting Understanding
Origins and Spread: what do these two stars do?

text

**Verification:** Checked if frontend should render Markdown formatting in responses.

**Decision Made:** Keep plain text display (no Markdown rendering)
**Reasoning:** Simpler, fewer dependencies, adequate for project scope.

---

## Testing & Validation

All working good. What else should I need to test?

text

**Comprehensive Testing Checklist Requested:**
- Multiple file type uploads (txt, pdf, md)
- Error handling (unsupported files, empty files)
- Edge cases in Q&A (typos, questions not in documents)
- Source attribution accuracy
- Document deletion and persistence
- Health status monitoring

**Action Taken:** Systematically tested all features before final submission.

---

## Key Decisions Summary

### Architecture Decisions
1. **Single-step upload with transactional cleanup** - Better UX, simpler code
2. **Immediate embedding generation** - Standard RAG practice, no performance penalty
3. **Local ChromaDB storage** - Adequate for demo, simpler than external DB

### Technology Decisions
1. **Gemini over OpenAI** - Free tier, equivalent quality
2. **Render over Railway** - Simpler configuration, better docs
3. **Python 3.11 over 3.14** - Better package compatibility

### Implementation Decisions
1. **Error cleanup on upload failure** - Prevents orphaned files
2. **Plain text over Markdown rendering** - Fewer dependencies
3. **Temporary storage on Render** - Acceptable for demo with clear documentation

---

## Development Approach

### What I Used AI For
- Boilerplate code generation (FastAPI routes, React components)
- Configuration file templates (requirements.txt, package.json)
- Deployment setup files (render.yaml, vercel.json)
- Error message interpretation
- Best practices for RAG implementation

### What I Verified/Decided Myself
- ✅ Architecture choices (single-step vs two-step processing)
- ✅ Error handling strategy (transactional upload)
- ✅ LLM provider selection (Gemini over OpenAI)
- ✅ Deployment platform (Railway → Render switch)
- ✅ Python version configuration approach
- ✅ Storage strategy for production demo
- ✅ Trade-offs between complexity and deadline

### Independent Problem Solving
- **Python version issue on Render:** Self-diagnosed and fixed using environment variables
- **Upload failure handling:** Designed transactional approach independently
- **Platform switch decision:** Made strategic choice based on time constraints
- **Storage persistence:** Decided on temporary storage with clear documentation

---

## Lessons Learned

1. **AI as a Tool, Not a Crutch:** Used AI to accelerate development while maintaining architectural control
2. **Decision Documentation:** Every major choice had clear reasoning
3. **Trade-off Analysis:** Balanced complexity vs deadline constraints
4. **Debugging Methodology:** Systematic approach to deployment issues
5. **Independent Verification:** Always understood generated code before using

---

## Time Management

**Total Time:** ~8 hours over 2 days
- Setup & Backend: 3 hours
- Frontend: 2 hours
- Deployment & Debugging: 2 hours
- Testing & Documentation: 1 hour

**Deadline:** Met with 24+ hours to spare
