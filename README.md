# AI Research Assistant using Retrieval-Augmented Generation (RAG)

##  Project Overview

The AI Research Assistant is an intelligent document question-answering system that allows users to upload PDF documents and ask questions in natural language. The system extracts text from uploaded documents, converts them into vector embeddings, stores them in a vector database, retrieves the most relevant information based on the user's query, and generates accurate answers using a Large Language Model.

---

##  Problem Statement

Searching information manually in large documents such as research papers, company policies, technical manuals, and reports is time-consuming.

The objective of this project is to build an AI-powered assistant capable of understanding uploaded documents and answering user questions accurately using Retrieval-Augmented Generation (RAG).

---

##  Solution Overview

The project is divided into two workflows:

### Upload Workflow

- Upload PDF document
- Extract text
- Split text into chunks
- Generate embeddings using Gemini Embedding API
- Store embeddings inside Qdrant Vector Database

### Ask Workflow

- Receive user's question
- Convert question into embedding
- Search similar document chunks in Qdrant
- Send retrieved context to OpenRouter LLM
- Generate and return the final answer

---

##  Architecture

```
User
   │
   ▼
HTML Frontend
   │
   ▼
n8n Workflow
   │
   ├── Upload Workflow
   │
   └── Ask Workflow
          │
          ▼
Qdrant Vector Database
          │
          ▼
OpenRouter LLM
          │
          ▼
Generated Answer
```

---

## 🛠 Technologies Used

- HTML
- CSS
- JavaScript
- n8n
- Google Gemini Embedding API
- Qdrant Vector Database
- OpenRouter API
- Retrieval-Augmented Generation (RAG)

---

## 📂 Project Structure

```
AI-Research-Assistant-RAG/

│── README.md

│── assets/

│     ├── upload_workflow.json

│     ├── ask_workflow.json

│     ├── upload_workflow.png

│     ├── ask_workflow.png

│     ├── frontend.png

│     ├── index.html

│     ├── style.css

│     └── script.js
```

---

##  Workflow Screenshots

### Upload Workflow

<img width="1636" height="665" alt="Screenshot 2026-07-21 201010" src="https://github.com/user-attachments/assets/75bf3508-75bf-49c8-a505-c4cd8940dcd7" />


### Ask Workflow

<img width="1656" height="646" alt="Screenshot 2026-07-21 201046" src="https://github.com/user-attachments/assets/c9361876-415a-46dd-93d8-acc8a64d7a1a" />

## Frontend

<img width="1875" height="923" alt="Screenshot 2026-07-21 202616" src="https://github.com/user-attachments/assets/037dc944-17e2-4adb-a137-fd0c7c2e648f" />

---

## 📄 Output Example

Question:

```
What is the objective of this document?
```

Answer:

```
This document reviews published studies on family caregiving for schizophrenia patients and discusses their emotional, social, and financial challenges.
```

---
---

#  Implementation Steps

1. Built the frontend using HTML, CSS and JavaScript.
2. Created an Upload Workflow in n8n.
3. Extracted text from uploaded PDF files.
4. Split the extracted text into smaller chunks.
5. Generated embeddings using Gemini Embedding API.
6. Stored embeddings and text payload in Qdrant Vector Database.
7. Built a Question Answering workflow.
8. Converted user questions into embeddings.
9. Retrieved relevant document chunks from Qdrant.
10. Sent retrieved context to OpenRouter LLM.
11. Returned the generated answer to the frontend.
---
---

---

#  n8n Nodes Used

## Upload Workflow

- Webhook
- Extract From File
- IF
- Code
- Loop Over Items
- HTTP Request (Gemini Embedding)
- Code
- HTTP Request (Qdrant)

## Ask Workflow

- Webhook
- HTTP Request (Gemini Embedding)
- HTTP Request (Qdrant Search)
- OpenRouter
- Respond To Webhook
---
---

#  Workflow Explanation

## Upload Workflow

The upload workflow receives a PDF document from the user.

The document text is extracted and divided into smaller chunks.

Each chunk is converted into embeddings using Google's Gemini Embedding API.

The embeddings along with their original text are stored in Qdrant Vector Database.

---

## Ask Workflow

The user submits a question.

The question is converted into an embedding.

Qdrant performs semantic similarity search and retrieves the most relevant document chunks.

These retrieved chunks are provided to the OpenRouter LLM as context.

The LLM generates the final answer which is returned to the user.

---
---

# 🗄 Data Structure

## Qdrant Collection

Collection Name

```
research_documents
```

Each stored point contains:

```
ID (UUID)

Vector (3072 Dimensions)

Payload
{
    text : Chunk Text
}
```
---

##  Future Improvements

- Telegram Bot Integration
- Multi-document support
- User Authentication
- Document Management
- Chat History
- Voice Assistant
- OCR support for scanned PDFs

---

##  Developed By

Harsha Jogi
