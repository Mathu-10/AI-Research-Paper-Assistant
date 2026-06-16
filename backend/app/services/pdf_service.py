from fastapi import UploadFile

from app.utils.file_utils import get_file_path


async def save_pdf(file: UploadFile) -> str:
    """
    Save the uploaded PDF and return its filename.
    """

    file_path = get_file_path(file.filename)

    content = await file.read()

    with open(file_path, "wb") as pdf:
        pdf.write(content)

    return file.filename