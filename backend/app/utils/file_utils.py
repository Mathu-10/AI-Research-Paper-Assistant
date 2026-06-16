from pathlib import Path
from fastapi import UploadFile

# Directory where uploaded PDFs will be stored
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


def is_pdf(file: UploadFile) -> bool:
    """
    Check whether the uploaded file is a PDF.
    """
    return file.content_type == "application/pdf"


def get_file_path(filename: str) -> Path:
    """
    Return the full path where the uploaded file will be stored.
    """
    return UPLOAD_DIR / filename