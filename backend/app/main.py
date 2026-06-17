from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ask
from app.routers import upload
from app.routers import summary

app = FastAPI(
    title="AI Research Paper Assistant",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(upload.router)
app.include_router(summary.router)
app.include_router(ask.router)

@app.get("/")
async def home():
    return {
        "message": "AI Research Paper Assistant Backend Running"
    }