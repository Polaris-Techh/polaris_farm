import asyncio
from pymongo import MongoClient
from typing import List
from model import Message



# MongoDB client setup
client = MongoClient('mongodb://localhost:27017')
database = client['MessageSystem']
collection = database['messages']

async def fetch_messages_by_email(email: str) -> List[Message]:
    loop = asyncio.get_event_loop()
    documents = await loop.run_in_executor(None, lambda: list(collection.find({"email": email})))
    messages = [Message(**doc) for doc in documents]
    return messages

async def fetch_all_messages() -> List[Message]:
    loop = asyncio.get_event_loop()
    documents = await loop.run_in_executor(None, lambda: list(collection.find({})))
    messages = [Message(**doc) for doc in documents]
    return messages

async def create_message(message: Message) -> Message:
    loop = asyncio.get_event_loop()
    message_dict = message.dict()
    await loop.run_in_executor(None, collection.insert_one, message_dict)
    return message

async def update_message(email: str, new_message: str) -> Message:
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, collection.update_one, {"email": email}, {"$set": {"message": new_message}})
    document = await fetch_message_by_email(email)
    return document

async def fetch_message_by_email(email: str) -> Message:
    loop = asyncio.get_event_loop()
    document = await loop.run_in_executor(None, lambda: collection.find_one({"email": email}))
    if document:
        return Message(**document)
    return None

async def remove_message(email: str) -> bool:
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, collection.delete_one, {"email": email})
    return result.deleted_count > 0
