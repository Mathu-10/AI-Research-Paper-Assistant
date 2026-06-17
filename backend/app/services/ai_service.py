import os
import json

from dotenv import load_dotenv
from google import genai
from app.schemas.ask_schema import AnswerResponse
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

def answer_question(text: str, question: str) -> AnswerResponse:
    """
    Answer a question using the uploaded research paper.
    """

    prompt = f"""
You are an AI research assistant.

Answer ONLY using the information available in the research paper.

If the answer is not available, reply:

"The research paper does not provide enough information to answer this question."

Research Paper:

{text[:15000]}

Question:

{question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return AnswerResponse(
        answer=response.text.strip()
    )
    try:
        data = json.loads(result)
        return AnswerResponse(**data)
    except Exception as e:
        print("RAW GEMINI RESPONSE:")
        print(result)
    print("ERROR:", e)
    raise