from fastapi import APIRouter, HTTPException

from app.schemas.summary_schema import SummaryResponse
from app.services.ai_service import generate_summary
from app.storage.document_store import get_document

router = APIRouter(
    prefix="/summary",
    tags=["Summary"]
)


@router.post("/{document_id}", response_model=SummaryResponse)
async def summarize(document_id: str):

    text = get_document(document_id)

    if text is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    return generate_summary(text)