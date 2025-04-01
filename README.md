Project Overview
DocuAI is a Software-as-a-Service (SaaS) solution developed for the [Hackathon Name] on April 01, 2025. It leverages artificial intelligence (AI), natural language processing (NLP), and real-time collaboration to revolutionize document search and retrieval. Designed to address inefficiencies in traditional keyword-based systems, DocuAI empowers teams with smart search, AI-generated summaries, and a collaborative workspace.

Problem Statement
Employees lose productivity navigating complex file structures and lengthy documents. DocuAI solves this by enabling natural language queries, instant summaries, and team-driven document interaction.

Features
Smart Search: Semantic retrieval using NLP (e.g., BERT-based models).
AI Summaries: Concise insights from documents via summarization algorithms.
Recommendations: Context-aware file/topic suggestions with vector embeddings.
Multi-Format Support: Processes PDFs and text; expandable to Word, slides.
Real-Time Collaboration: Shared workspace powered by Firebase.
Security: Encrypted cloud storage for fast, safe access.
Novelty
DocuAI’s collaborative AI workspace sets it apart from tools like ChatGPT, allowing teams to query, refine, and explore documents together in real-time.

Tech Stack
Frontend: Bubble (no-code platform).
AI Backend: OpenAI API (NLP and summarization).
Collaboration: Firebase Realtime Database.
File Processing: PyPDF2 (PDF parsing).
Deployment: Cloud-hosted via Bubble and Firebase.
Installation
Prerequisites
Bubble account (bubble.io).
Firebase account (firebase.google.com).
OpenAI API key (openai.com).
Git installed locally.
Steps
Clone the Repository:
bash

Collapse

Wrap

Copy
git clone https://github.com/[your-teamname]/hackathon-teamname-docuai.git
cd hackathon-teamname-docuai
Set Up Bubble:
Import docuai_bubble_project.json into Bubble.
Configure the API Connector with your OpenAI API key:
text

Collapse

Wrap

Copy
Authorization: Bearer YOUR_API_KEY
Endpoint: https://api.openai.com/v1/chat/completions
Set Up Firebase:
Create a Firebase project and enable Realtime Database.
Add Firebase config to Bubble’s API Connector (found in Firebase console).
Set permissive rules for demo:
json

Collapse

Wrap

Copy
{ "rules": { ".read": "true", ".write": "true" } }
Test the App:
Upload sample PDFs/text files in Bubble’s preview mode.
Run queries and collaborate via the shared interface.
Usage
Access the Bubble app URL (provided post-deployment).
Upload documents (e.g., PDFs) to the interface.
Enter natural language queries (e.g., “Find budget reports from 2024”).
View AI responses and collaborate with team members in real-time.
Development Status
Completed: Smart search, summarization, real-time collaboration.
In Progress: Testing with sample PDFs and text files.
Planned: Expanded file support (Word, slides), authentication.
Challenges Overcome
Real-Time Sync: Firebase integration for Bubble’s limitations.
File Parsing: PyPDF2 for efficient PDF processing.
Performance: Pre-indexed embeddings for fast AI responses.
Future Enhancements
Support for additional formats (e.g., PowerPoint).
Domain-specific AI fine-tuning.
User authentication and role-based access.

Team
Sumit kumar - Lead Developer
Shubh Raj Gupta - Backend developer
Kumari Shambhavi - Ui/Ux developer
Nabasmita Shanti Ui developer
License
MIT License - free to use and modify for non-commercial purposes.
 
