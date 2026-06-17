import os
import json

from dotenv import load_dotenv
from google import genai

from app.schemas.summary_schema import SummaryResponse

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_summary(text: str) -> SummaryResponse:
    """
    Generate a structured research paper summary.
    """

    prompt = f"""
You are an expert research assistant.

Analyze the following research paper and return ONLY valid JSON.

Format:

{{
    "title": "",
    "overview": "",
    "methodology": "",
    "key_findings": "",
    "conclusion": ""
}}

Research Paper:

{text[:15000]}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    result = response.text.strip()

    # Remove markdown if Gemini wraps JSON
    result = result.replace("```json", "").replace("```", "").strip()

    data = json.loads(result)

    return SummaryResponse(**data)