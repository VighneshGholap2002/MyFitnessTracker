# 🌟 Personalized Fitness Application

![Project Badge](https://img.shields.io/badge/Status-Active-green)
![Spring Boot](https://img.shields.io/badge/SpringBoot-2.7.0-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Java](https://img.shields.io/badge/Java-17-orange)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.11-red)
![OAuth2](https://img.shields.io/badge/OAuth2-Secure-blueviolet)

Welcome to **My Personalized Fitness Application** – a modern, microservices-based platform that tracks user fitness activities, generates AI-driven recommendations, and helps users achieve their fitness goals efficiently. Built with Spring Boot, React, and a mix of SQL/NoSQL databases, this project demonstrates a full-stack, scalable, and secure approach to fitness tracking.

---

## 🏗️ Architecture Overview

Frontend (React + Redux)  
       │  
       ▼  
API Gateway  
       │  
       ▼  
UserService ──  ActivityService ──  AI Service  
       
PostgreSQL DB  ── MongoDB DB ──   MongoDB DB  

Eureka & Config Server  
RabbitMQ (Async Messaging)



---

## 🚀 Features

### User Service
- Manage users with complete CRUD operations
- Stores user data in **PostgreSQL** for reliable relational storage
- Handles authentication and authorization via Keycloak
- Synchronizes user information with the authentication server

### Activity Service
- Track user fitness activities and interactions (workouts, exercises, calories)
- Stores activity data in **MongoDB** for flexible document-based storage
- Full CRUD endpoints for activities
- Interservice communication for dynamic workflows

### AI Service
- Generates personalized fitness recommendations using AI
- Processes activity and user data for actionable insights
- Stores recommendations in **MongoDB**
- Integrated with Gemini API for intelligent suggestions
- Supports asynchronous communication via RabbitMQ

### Microservices Management
- **Eureka Server:** Centralized service registry
- **Config Server:** Centralized configuration management
- **API Gateway:** Routes requests securely to underlying services
- **RabbitMQ Integration:** Handles async messaging between services

### Security
- **OAuth 2.0 PKCE Flow** with Keycloak for secure login
- API Gateway secured for end-to-end protection
- Smooth integration of Keycloak IDs into UserService

### Frontend
- Built with React + Redux
- Login & PKCE Authorization Flow implemented
- Dashboard and activity management UI
- Detailed activity pages with real-time updates
- Fully tested end-to-end application

---

## ⚙️ Tech Stack

- **Backend:** Spring Boot, Spring Cloud, Microservices Architecture  
- **Database:** PostgreSQL (User Service), MongoDB (Activity & AI Services)  
- **Messaging:** RabbitMQ (Async Communication)  
- **Security:** Keycloak, OAuth 2.0, PKCE Flow  
- **Configuration:** Spring Config Server  
- **Service Discovery:** Eureka  
- **Frontend:** React, Redux, Axios  
- **AI Integration:** Gemini API for recommendations  

---

## 🎯 Highlights
- Multi-service architecture following best practices
- AI-driven personalized fitness recommendations
- Asynchronous communication between services
- Centralized configuration & service discovery
- Secure authentication and authorization
- Clean, responsive, and intuitive frontend

---

🌟 **This project demonstrates a scalable, secure, and intelligent approach to personalized fitness management, combining modern microservices architecture with AI-driven insights.**
