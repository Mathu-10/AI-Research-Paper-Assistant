from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.pdf_service import save_pdf
from app.utils.file_utils import is_pdf, get_file_path

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a research paper.
    """

    if not is_pdf(file):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    filename = await save_pdf(file)

    return {
        "filename": filename,
        "message": "File uploaded successfully!"
    }