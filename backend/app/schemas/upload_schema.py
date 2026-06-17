from pydantic import BaseModel


class UploadResponse(BaseModel):
    filename: str
    pages: int
    preview: str
    message: str