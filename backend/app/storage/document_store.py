from uuid import uuid4

DOCUMENT_STORE = {}


def save_document(text: str) -> str:
    """
    Store extracted document text and return a unique document ID.
    """
    document_id = str(uuid4())

    DOCUMENT_STORE[document_id] = text

    return document_id


def get_document(document_id: str) -> str | None:
    """
    Retrieve document text by its ID.
    """
    return DOCUMENT_STORE.get(document_id)