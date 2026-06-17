from pydantic import BaseModel


class SummaryResponse(BaseModel):
    title: str
    overview: str
    methodology: str
    key_findings: str
    conclusion: str