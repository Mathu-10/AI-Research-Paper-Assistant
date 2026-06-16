from fastapi import FastAPI

app = FastAPI(
    title="AI Research Paper Assistant",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "AI Research Paper Assistant Backend Running"
    }