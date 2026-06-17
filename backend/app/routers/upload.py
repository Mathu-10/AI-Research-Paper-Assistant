from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.file_utils import is_pdf
from app.storage.document_store import save_document
from app.schemas.upload_schema import UploadResponse
from app.schemas.upload_schema import UploadResponse
from app.services.pdf_service import (
    save_pdf,
    extract_pdf_content,
    )
from app.utils.file_utils import is_pdf, get_file_path

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post(
    "/",
    response_model=UploadResponse
)
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a research paper.
    """ 

    if not is_pdf(file):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    saved_path = await save_pdf(file)

    pdf_content = extract_pdf_content(saved_path)

    document_id = save_document(pdf_content["text"])

    preview = pdf_content["text"][:500]

    return UploadResponse(
        document_id=document_id,
        filename=file.filename,
        pages=pdf_content["pages"],
        preview=preview,
        message="PDF uploaded successfully."
)