# XRPChat AI Chatbot

## Introduction

XRPChat is an AI-powered chatbot designed to provide coherent and relevant answers to user queries. Built with the LangChain library in Python, it harnesses the power of semantic search over a vector database. The chatbot is crafted to retrieve pertinent information based on the user's query and then process it using a language model (in this case, GPT-3.5) to generate user-friendly responses.

## Getting Started

### Prerequisites

- Python 3
- Flask
- Pinecone
- LangChain

### Installation

```git clone https://github.com/Cosmotxt/xrpchat.git```
```pip install -r requirements.txt```

Fill in the variable information in the ```env.example``` file and rename it to ```.env```.

Now, you can run the application locally. Navigate to the server folder and run the command:

```flask run```

1. Pinecone: All necessary data for fetching answers are converted into embeddings and stored in the Pinecone vector database.

2. LangChain: LangChain employs functions to perform a semantic search in the vector database, returning snippets of text that might contain the answer to the user's query. The language model, in this case, GPT-3.5, reads these snippets and crafts a response for the user in a conversational manner, recalling previous message exchanges.

3. Flask: Flask is used to set up the API. Within the bot's algorithm, we have the ```get_response(user_id, text, lang, messageId)``` function. This function receives the user ID, the query text, and the message ID from the frontend. Using this data, the bot generates responses and sends them back to the frontend.