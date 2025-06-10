# Travel Explorer Website with AI Chatbot 🌍🤖

**Created by:** Yusuf Paruk  
**Date:** June 2025  

## 📋 Table of Contents

- [Introduction](#introduction)
- [Project Objectives](#project-objectives)
- [System Architecture](#system-architecture)
- [Data Sources](#data-sources)
- [Backend Implementation](#backend-implementation)
- [Frontend Implementation](#frontend-implementation)
- [AI Chatbot Integration](#ai-chatbot-integration)
- [Containerization and Deployment](#containerization-and-deployment)
- [Version Control](#version-control)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Work](#future-work)
- [Conclusion](#conclusion)
- [References](#references)

---

## 🚀 Introduction

This project is a full-stack **Travel Explorer Website** that allows users to explore countries, tours, and UNESCO sites in an interactive and intelligent manner. The platform integrates multiple APIs and an AI chatbot to enhance user engagement.

### Key Features
- Country information display  
- Tour information display  
- UNESCO sites per country  
- AI-powered travel assistant chatbot  
- Modern responsive design  
- Fully containerized deployment on Render  

---

## 🎯 Project Objectives

- Build an end-to-end travel website using modern web technologies  
- Integrate third-party APIs (G Adventures API and UNESCO API)  
- Implement an AI chatbot using Cohere API  
- Ensure the system is containerized using Docker  
- Deploy the solution using **Render.com**  
- Maintain codebase with **GitHub**

---

## 🏛️ System Architecture

```plaintext
┌────────────────────────────┐
│        User (Browser)      │
└────────────┬───────────────┘
             │ React.js Frontend
┌────────────┴───────────────┐
│        Node.js Backend     │
│ - API aggregator           │
│ - Cohere AI Chat API proxy │
└────────────┬───────────────┘
             │ REST APIs
 ┌───────────┴────────────┐
 │  G Adventures API      │
 │  UNESCO API            │
 │  Cohere Chat API       │
 └────────────────────────┘
```

---

## 🌍 Data Sources

### G Adventures API
- Source for **tour information**  
- Data pulled: `Tour name`, `Itinerary`, `Images`, `Start/End Dates`, `Country`, `Description`

### UNESCO API
- Source for **UNESCO site information**  
- Data pulled: `Site name`, `Location`, `Coordinates`, `Description`, `Country`

---

## 🖥️ Backend Implementation

### Stack
- **Node.js** (v20)  
- **Express.js** for REST API routing  
- Axios for calling external APIs  
- Dotenv for environment management  

### API Aggregation Logic
The backend exposes the following endpoints:

```
GET /api/tours → Returns list of tours  
GET /api/countries → Returns country list  
GET /api/unesco → Returns UNESCO sites  
GET /api/chat → Proxy endpoint to Cohere chat API  
```

### Example Endpoint

```javascript
app.get('/api/tours', async (req, res) => {
  const response = await axios.get(GADVENTURES_API_URL, { headers: {...} });
  res.json(response.data);
});
```

---

## 🖼️ Frontend Implementation

### Stack
- **React.js (v18)**  
- **React Router** for navigation  
- **Tailwind CSS** for responsive design  
- Fetch API to call backend endpoints  

### Key Screens
- Home Page  
- Country List → Country Details → UNESCO Sites  
- Tour List → Tour Details  
- AI Chatbot floating button  

### Chatbot Integration (Frontend)
- Simple chat interface connected to backend `/api/chat` endpoint  
- Streaming chat responses with loading indicators  

---

## 🤖 AI Chatbot Integration

### API
- **Cohere Chat API**  
- Model: `Command R+` fine-tuned version  
- Mode: Streaming chat  

### Chatbot Use Cases
- "What tours are available in Kenya?"  
- "Tell me about UNESCO sites in India."  
- "Recommend a tour for adventure travel."  

### Implementation

```javascript
const stream = await cohere.chatStream({
    model: 'command-r',
    message: userMessage
});
```

---

## 🐳 Containerization and Deployment

### Docker

#### Frontend Dockerfile

```dockerfile
FROM node:20
WORKDIR /app
COPY ./frontend .
RUN npm install
RUN npm run build
CMD ["npx", "serve", "-s", "build"]
```

#### Backend Dockerfile

```dockerfile
FROM node:20
WORKDIR /app
COPY ./backend .
RUN npm install
CMD ["node", "server.js"]
```

### Render Deployment
- Backend and frontend deployed as separate **Web Services** on Render  
- GitHub integration for continuous deployment  
- Automatic build and deploy on `main` branch push  

---

## 🔁 Version Control

- Git used for version control  
- GitHub repository hosted here: [GitHub link]  
- Branch strategy: `main` for production, `dev` for development  

---

## 🛠️ Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Inconsistent data formats between APIs | Implemented data normalization functions in backend |
| Rate limits on G Adventures API | Added caching layer using memory-cache |
| Maintaining chatbot context | Leveraged Cohere chat session features and history tracking |
| Deployment configuration on Render | Fine-tuned Render.yaml with correct health checks and environment variables |

---

## 🚧 Future Work

- Add user authentication (login, favorites)  
- Allow user reviews and ratings for tours  
- Improve chatbot memory and personalization  
- Optimize performance with caching and indexing  
- Add offline-first support for mobile use  

---

## ✅ Conclusion

This project demonstrates a full-stack, AI-enhanced travel website integrating live external data and an AI chatbot. The system was fully containerized and deployed successfully on Render, providing a scalable and maintainable architecture.

It illustrates the power of combining:
- External APIs (G Adventures + UNESCO)  
- AI (Cohere)  
- Modern Web Stack (React + Node.js)  
- Cloud deployment (Docker + Render)

---

## 📚 References

- G Adventures API Documentation  
- UNESCO API Dataset  
- Cohere API Documentation  
- React.js Documentation  
- Node.js Documentation  
- Docker Documentation  
- Render Deployment Guides  

---
