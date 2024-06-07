from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import Message
from database import (
    create_message, fetch_all_messages, fetch_message_by_email, remove_message, update_message
)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.get("/api/messages", response_model=list[Message])
async def get_messages():
    response = await fetch_all_messages()
    return response    

@app.get("/api/messages/{email}", response_model=Message)
async def get_message_by_email(email: str):
    response = await fetch_message_by_email(email)
    if response:
        return response
    else:
        raise HTTPException(404, f'Message with email "{email}" not found')

@app.post("/api/messages", response_model=Message)
async def post_message(message: Message):
    response = await create_message(message)
    if response:
        return response
    else:
        raise HTTPException(400, "There was an error / Bad request")

@app.put("/api/messages/{email}", response_model=Message)
async def put_message(email: str, new_message: str):
    response = await update_message(email, new_message)
    if response:
        return response
    else:
        raise HTTPException(404, f'Message with email "{email}" not found')

@app.delete("/api/messages/{email}")
async def delete_message(email: str):
    response = await remove_message(email)
    if response:
        return {"message": "Successfully deleted message!"}
    else:
        raise HTTPException(404, f'Message with email "{email}" not found')
