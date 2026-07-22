# 🚀 UnitFlow AI

> **Intelligent API Testing Platform with Automated Test Case Generation, Intelligent Analysis, Cloud Report Storage, and Modern Full-Stack Deployment**

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.139-green)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)
![Groq](https://img.shields.io/badge/Groq-LLM-orange)
![Render](https://img.shields.io/badge/Backend-Render-success)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🌐 Live Demo

**Frontend**

> https://unit-flow-ai.vercel.app

**Backend**

> https://unitflow-ai.onrender.com/

---

# 📌 Overview

UnitFlow AI is an intelligent API testing platform that automates the process of generating API test cases, executing them, validating responses, and producing AI-generated analysis reports.

Instead of manually writing dozens of API test scenarios, users simply provide an API endpoint along with request details. UnitFlow AI automatically creates meaningful test cases using Large Language Models (LLMs), executes them, validates responses, generates insightful reports, and stores everything securely in the cloud.

The platform is built using a modern cloud-native architecture powered by React, FastAPI, Supabase PostgreSQL, Supabase Storage, and Groq LLM.

---

# ✨ Features

## 🧪 Automated Test Case Generation

- Automatically generates mutation-based API test cases
- Creates invalid payload scenarios
- Tests missing required fields
- Generates malformed request variations
- Supports predefined edge-case validation
---

## ⚡ API Test Execution

- Supports REST APIs
- Executes generated test cases automatically
- Measures latency
- Captures response body
- Records HTTP status codes

---

## ✅ Intelligent Validation

Automatically validates

- Status Codes
- Success / Failure
- Response Consistency
- Test Pass Percentage

---

## 🧠 AI Analysis

Powered by **Groq LLM**

Generates

- Executive Summary
- Failure Analysis
- Performance Insights
- Improvement Suggestions

---

## 📄 PDF Report Generation

Automatically creates professional PDF reports containing

- Test Results
- AI Summary
- Pass / Fail Statistics
- Performance Metrics

---

## ☁ Cloud Storage

Every generated report is uploaded to **Supabase Storage**.

Features

- Instant PDF access
- Permanent cloud storage
- Shareable URLs
- No local dependency

---

## 📜 Test History

Stores

- API URL
- HTTP Method
- Timestamp
- Pass Count
- Failure Count
- AI Summary
- PDF Report Link

---

# 🏗 System Architecture

```
                User
                  │
                  ▼
        React + TypeScript
            (Vercel)
                  │
                  ▼
         FastAPI Backend
            (Render)
                  │
      ┌───────────┴───────────┐
      ▼                       ▼
Supabase PostgreSQL      Supabase Storage
      │                       │
      ▼                       ▼
 Test History           PDF Reports
                  │
                  ▼
              Groq LLM
```

---

# ⚙ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Axios
- Tailwind CSS

---

## Backend

- FastAPI
- Python
- Uvicorn
- ReportLab

---

## Database

- Supabase PostgreSQL

---

## Cloud Storage

- Supabase Storage

---

## AI

- Groq LLM

---

## Deployment

Frontend

- Vercel

Backend

- Render

---

# 🔄 Project Workflow

```
User Inputs API

        │

        ▼

Generate Mutated Test Cases

        │

        ▼

Execute Tests

        │

        ▼

Validate Responses

        │

        ▼

Generate AI Analysis

        │

        ▼

Generate PDF Report

        │

        ▼

Upload PDF to Supabase Storage

        │

        ▼

Store Test History in PostgreSQL

        │

        ▼

Display Results
```

---


# 📂 Project Structure

```
UnitFlow-AI

│

├── backend

│   ├── app

│   │   ├── models

│   │   ├── services

│   │   ├── db_service.py

│   │   ├── main.py

│   │   └── supabase_client.py

│   │

│   ├── requirements.txt

│

├── frontend

│   ├── src

│   ├── pages

│   ├── services

│   └── components
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/VedantK45/UnitFlow-AI.git
```

---

## Backend

```bash
cd backend

python -m venv venv

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Backend

```
SUPABASE_URL=

SUPABASE_KEY=

GROQ_API_KEY=
```

Frontend

```
VITE_API_URL=
```

---

# 📡 API Endpoints

| Endpoint | Method | Description |
|-----------|----------|-------------------------|
| / | GET | Health Check |
| /generate-tests | POST | Generate AI Test Cases |
| /run-tests/{id} | POST | Execute Tests |
| /history | GET | Test History |
| /history/{id} | GET | Specific Test Run |

---

# 🔄 Migration Journey

## Initial Version

The first version of UnitFlow AI was developed using **SQLite** as the primary database.

SQLite was selected because

- Easy local development
- Zero configuration
- Lightweight
- Fast prototyping

However, as the project evolved, several limitations became apparent.

### Challenges

- Local-only database
- Difficult deployment
- Poor scalability
- No cloud synchronization
- Local PDF storage
- Difficult multi-device access

---

## Migration to Supabase PostgreSQL

The application was later migrated to **Supabase PostgreSQL**.

This migration introduced

- Cloud-hosted PostgreSQL
- Persistent cloud database
- Secure REST interface
- Automatic backups
- Better scalability
- Easier deployment
- Multi-device accessibility

---

## Cloud PDF Storage

Initially

```
Generate PDF

↓

Store in local reports/
```

After migration

```
Generate PDF

↓

Upload to Supabase Storage

↓

Generate Public URL

↓

Store URL inside PostgreSQL

↓

Access from anywhere
```

This completely removed dependency on local file storage.

---

# 💡 Challenges Faced

- API validation workflow
- Integrating Groq LLM
- Migrating SQLite → PostgreSQL
- Supabase Storage integration
- Cloud deployment
- CORS configuration
- Environment variable management
- Frontend–Backend communication
- PDF generation and cloud storage

---

# 📈 Future Improvements

- User Authentication
- API Collections
- Swagger/OpenAPI Import
- Email Reports
- Docker Support
- CI/CD Pipeline
- OAuth Login
- Dashboard Analytics

---

# 👨‍💻 Author

**Vedant Kumar**

Instrumentation & Control Engineering

Dr. B R Ambedkar National Institute of Technology, Jalandhar

GitHub

https://github.com/VedantK45

LinkedIn

https://www.linkedin.com/in/vedant-kumar-0b628b290/

---

# ⭐ If you found this project useful, consider giving it a Star!
