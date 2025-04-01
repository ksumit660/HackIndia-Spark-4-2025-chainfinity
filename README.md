DocuAI - AI-Powered Collaborative Document Search & Retrieval Assistant
Overview
DocuAI is a Software-as-a-Service (SaaS) platform built for the [Hackathon Name] on April 01, 2025. It revolutionizes document search by combining AI-driven natural language processing (NLP), summarization, and real-time team collaboration. Unlike traditional tools, DocuAI enables semantic search, AI-generated summaries, and collaborative query refinement, boosting workplace efficiency.

Problem Statement
Employees waste time navigating file structures and skimming documents due to rigid keyword searches. DocuAI addresses this by offering smart search, summaries, and team-based document interaction.

Key Features
Smart Search: NLP-powered semantic retrieval (e.g., BERT-based).
AI Summaries: Concise insights from lengthy files.
Recommendations: Context-aware suggestions via vector embeddings.
Multi-Format: Processes PDFs, text (expandable to Word, slides).
Collaboration: Real-time shared workspace using Firebase.
Secure Access: Encrypted cloud storage for fast, safe retrieval.
Novelty
DocuAI stands out with its collaborative AI workspace, enabling teams to query and refine searches together—unlike standalone tools like ChatGPT.

Tech Stack
Frontend: Bubble (no-code web interface).
AI: OpenAI API (NLP, summarization).
Backend: Firebase Realtime Database (collaboration).
File Processing: PyPDF2 (PDF parsing).
Deployment: Cloud-hosted (e.g., Bubble/Firebase).
Installation and Setup
Clone the Repository:
bash

Collapse

Wrap

Copy
git clone https://github.com/[your-teamname]/hackathon-teamname-docuai.git
Bubble Setup:
Import the Bubble project file (docuai_bubble_project.json) into Bubble.io.
Configure the API Connector plugin with your OpenAI API key.
Firebase Setup:
Create a Firebase project at firebase.google.com.
Enable Realtime Database and paste the config into Bubble’s API Connector.
Set database rules to allow read/write for demo purposes:
json

Collapse

Wrap

Copy
{
  "rules": { ".read": true, ".write": true }
}
OpenAI API:
Obtain an API key from openai.com.
Add it to Bubble’s API Connector (Authorization: Bearer YOUR_API_KEY).
Run Locally:
No local server needed; test via Bubble’s preview mode.
Usage
Open the Bubble app in a browser.
Upload sample PDFs/text files via the interface.
Enter natural language queries (e.g., “Find budget reports”).
Collaborate with team members in real-time via the shared chat.
Development Stage
Core features (search, summaries, collaboration) implemented.
Tested with PDFs; expandable to other formats.
GitHub submission adheres to naming: hackathon-teamname-docuai.
Challenges and Solutions
Real-Time: Firebase overcomes Bubble’s lack of WebSockets.
File Support: Focused on PDFs with PyPDF2; more formats planned.
Performance: Pre-indexed embeddings ensure fast responses.
Future Enhancements
Support for Word, PowerPoint files.
Fine-tuned AI for enterprise datasets.
User authentication for security.
Team
Sumit kumar - Lead Developer
Shubh Raj Gupta - Backend developer
Kumari Shambhavi - Ui/Ux developer
Nabasmita Shanti Ui developer
License
MIT License - free to use and modify for non-commercial purposes.
 
