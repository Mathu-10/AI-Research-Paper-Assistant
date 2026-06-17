from fastapi import UploadFile
import fitz  # PyMuPDF
from app.utils.file_utils import get_file_path
from pathlib import Path

async def save_pdf(file: UploadFile) -> Path:
    """
    Save the uploaded PDF and return its file path.
    """

    file_path = get_file_path(file.filename)

    content = await file.read()

    with open(file_path, "wb") as pdf:
        pdf.write(content)

    return file_path

def extract_pdf_content(file_path: Path)-> dict:
    document = fitz.open(file_path)
    page_count = len(document)
    text_content = ""
    for page in document:
        text_content += page.get_text()

    document.close()
    return {
    "pages": page_count,
    "text": text_content
}