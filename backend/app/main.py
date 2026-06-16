from fastapi import FastAPI
from app.routers import upload

app = FastAPI(
    title="AI Research Paper Assistant",
    version="1.0.0"
)

app.include_router(upload.router)


@app.get("/")
async def home():
    return {
        "message": "AI Research Paper Assistant Backend Running"
    }