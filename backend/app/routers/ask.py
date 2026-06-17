from fastapi import APIRouter, HTTPException

from app.schemas.ask_schema import (
    QuestionRequest,
    AnswerResponse,
)

from app.storage.document_store import get_document
from app.services.ai_service import answer_question

router = APIRouter(
    prefix="/ask",
    tags=["Ask"]
)


@router.post(
    "/{document_id}",
    response_model=AnswerResponse
)
async def ask_question(
    document_id: str,
    request: QuestionRequest
):

    text = get_document(document_id)

    if text is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    try:
        return answer_question(
            text=text,
            question=request.question
        )

    except Exception:
        raise HTTPException(
            status_code=503,
            detail="AI service is temporarily unavailable. Please try again."
        )