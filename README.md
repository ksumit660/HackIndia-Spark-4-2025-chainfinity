# DocuAI - AI-Powered Collaborative Document Search & Retrieval Assistant

## Overview
DocuAI is a **Software-as-a-Service (SaaS)** platform built for **[Hackathon Name]** on April 01, 2025. It enhances document search using **AI-driven natural language processing (NLP), summarization, and real-time team collaboration**. Unlike traditional tools, DocuAI provides **semantic search, AI-generated summaries, and collaborative query refinement**, boosting workplace efficiency.

---

## 🚀 Problem Statement
Employees waste time navigating complex file structures and skimming documents due to rigid keyword searches. **DocuAI** solves this by offering:
- **Smart Search** with NLP-based semantic retrieval.
- **AI Summaries** for concise insights from lengthy files.
- **Collaborative Query Refinement** for team-based document search.

---

## 🔑 Key Features
✅ **Smart Search:** AI-powered semantic retrieval (e.g., BERT-based NLP).  
✅ **AI Summaries:** Auto-generated concise document insights.  
✅ **Recommendations:** Context-aware suggestions via vector embeddings.  
✅ **Multi-Format Support:** Processes PDFs, text (expandable to Word, PowerPoint).  
✅ **Real-Time Collaboration:** Shared workspace using Firebase.  
✅ **Secure Access:** Encrypted cloud storage for fast, safe retrieval.  

### 🎯 **Novelty**
Unlike traditional search tools like ChatGPT, **DocuAI** provides a **collaborative AI workspace**, allowing **teams to refine queries together in real time**.

---

## 🛠️ Tech Stack
**Frontend:** [Bubble.io](https://bubble.io) (No-code web interface)  
**AI & NLP:** OpenAI API (Natural Language Processing, Summarization)  
**Backend:** Firebase Realtime Database (Live collaboration)  
**File Processing:** PyPDF2 (PDF parsing)  
**Deployment:** Cloud-hosted (Bubble/Firebase)

---

## 📌 Installation & Setup
### 1️⃣ Clone the Repository:
```bash
git clone https://github.com/[your-teamname]/hackathon-teamname-docuai.git
cd hackathon-teamname-docuai
```

### 2️⃣ Bubble Setup:
- Import the Bubble project file: `docuai_bubble_project.json` into [Bubble.io](https://bubble.io).
- Install **API Connector plugin**.
- Configure OpenAI API key in the **API Connector**.

### 3️⃣ Firebase Setup:
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable **Realtime Database**.
- Paste Firebase configuration into Bubble’s API Connector.
- Set database rules (for demo purposes):
```json
{
  "rules": { ".read": true, ".write": true }
}
```

### 4️⃣ OpenAI API Setup:
- Get an API key from [OpenAI](https://openai.com/).
- Add it to **Bubble’s API Connector** under authorization:
```plaintext
Bearer YOUR_API_KEY
```

### 5️⃣ Run the Project:
No local server needed! Test via **Bubble’s preview mode**.

---

## 🎮 Usage Guide
1. Open the **Bubble app** in a browser.
2. Upload sample **PDFs/text files**.
3. Enter natural language queries (e.g., _“Find budget reports”_).
4. Collaborate with team members in **real-time**.

---

## ⚙️ Development Stage
✅ **Core Features Implemented:** Search, Summaries, Collaboration.  
✅ **Tested with PDFs**; expandable to other formats.  
✅ **GitHub Submission Naming:** `hackathon-teamname-docuai`.  

---

## 🚧 Challenges & Solutions
### 1️⃣ Real-Time Collaboration
**Problem:** Bubble lacks WebSocket support.  
**Solution:** Integrated **Firebase Realtime Database**.

### 2️⃣ Multi-Format File Support
**Problem:** Initial version supports only PDFs.  
**Solution:** Used **PyPDF2**, future updates will support **Word/PowerPoint**.

### 3️⃣ Performance Optimization
**Problem:** AI-based search can be slow.  
**Solution:** Pre-indexed **vector embeddings** ensure fast responses.

---

## 🔮 Future Enhancements
🔹 Support for **Word, PowerPoint files**.  
🔹 Fine-tuned AI for **enterprise datasets**.  
🔹 **User authentication** for secure access.  

---

## 👥 Team
| Name | Role |
|------|------|
| [Sumit kumar] | Lead developer |
| [Shubh Raj Gupta ] | [Backend developer] |
| [Kumari Shambhavi] | [UI/UX Developer] |
| [Nabasmita Shanti] | 

---

## 📜 License
**MIT License** - Free to use and modify for commercial and non-commercial purposes.

---

## 📌 Notes
🔹 Replace placeholders like **[HackIndia 2025]**, **[Chainfinity]**, and team details before submission.  
🔹 Adjust technical details if your stack changes (e.g., different database or AI model).  

---

🎉 **Built with passion for [HackIndia 2025 ] - April 01, 2025!** 🚀
