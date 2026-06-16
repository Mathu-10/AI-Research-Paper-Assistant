# AI Research Paper Assistant

An AI-powered web application that helps users understand research papers by generating summaries and answering questions using Large Language Models (LLMs).

## Features

- Upload research papers (PDF)
- AI-generated summaries
- Ask questions about uploaded papers
- Chat history
- Modern responsive interface

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- FastAPI
- Python

### AI
- Google Gemini API

### PDF Processing
- PyMuPDF

### Database
- SQLite (planned)

## Project Status

- [x] Project Setup
- [x] Frontend Architecture
- [x] Backend Architecture
- [ ] PDF Upload
- [ ] AI Summary
- [ ] Chat Interface
- [ ] Database Integration

## Run

Frontend

npm install
npm run dev

Backend

pip install -r requirements.txt
uvicorn app.main:app --reload