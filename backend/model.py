from pydantic import BaseModel

class Message(BaseModel):
    name: str
    purpose: str
    email: str
    message: str
