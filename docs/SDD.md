# Software Design Description (SDD)

Project: HealHub
Version: 1.0
Date: 2026-04-02

## 1. Introduction

### 1.1 Purpose
This document describes HealHub's software architecture, component-level design, data design, and interaction patterns.

### 1.2 Scope
Covers design of frontend, backend, persistence, realtime communication, and deployment topology.

### 1.3 References
- IEEE 1016 (Software Design Description)
- Project SRS
- Deployment documentation

## 2. System Overview

HealHub follows a client-server architecture:
- Frontend SPA (React)
- Backend REST API (Express)
- MongoDB persistence (Mongoose models)
- Socket.IO for realtime notifications/updates

## 3. Design Goals and Constraints

- Strong role-based access control
- Modular route organization by domain
- Backward-compatible API evolution
- Simple deployment model (single Node service serving built client)

## 4. Architectural Design

### 4.1 High-Level Architecture
- Presentation Layer: React pages/components by user role
- Application Layer: Express routes, middleware, domain logic
- Data Layer: Mongoose schemas and MongoDB collections
- Integration Layer: External AI/email/storage integrations

### 4.2 Runtime View
1. User authenticates via API and receives token.
2. Frontend invokes protected APIs using token.
3. Backend enforces authorization and performs DB operations.
4. Realtime events are emitted to subscribed clients via Socket.IO.

### 4.3 Deployment View
- Single Node.js process hosts API and static React build
- MongoDB hosted locally or via Atlas
- Optional cloud deployment via Render

## 5. Component Design

### 5.1 Frontend Components
- Common layout/navigation components
- Context providers for auth, notifications, and socket state
- Role-specific pages (admin, doctor, receptionist, patient)

### 5.2 Backend Components
- `server/index.js`: application bootstrapping and middleware setup
- `server/routes/*`: domain-specific REST endpoints
- `server/models/*`: schema definitions and data contracts
- `server/middleware/*`: auth/upload cross-cutting concerns
- `server/utils/*`: helper services (notifications, queueing, PDFs)

### 5.3 Security Components
- JWT issuance/validation
- Route-level access checks by role
- CORS policy driven by environment configuration
- Request rate limiting and helmet hardening

## 6. Data Design

### 6.1 Core Entities
- User
- Hospital
- Department
- Appointment
- MedicalRecord
- Prescription
- LabTest
- Billing
- Queue
- Notification
- Telemedicine

### 6.2 Persistence Strategy
- Document model with Mongoose schemas
- Domain collections mapped to route modules
- Referential relationships via ObjectId links where needed

## 7. Interface Design

### 7.1 API Design Principles
- Resource-oriented routes under `/api/*`
- JSON request/response payloads
- Consistent status codes and error handling

### 7.2 Realtime Interface
- Socket.IO channels used for notifications and live updates
- Server-side emit triggered by relevant domain events

## 8. Behavioral Design

### 8.1 Primary Flows
- Appointment booking and lifecycle management
- Queue progression and triage decision updates
- Prescription generation and retrieval
- Telemedicine consultation flow

### 8.2 Error Handling
- Centralized Express error middleware
- Structured error payloads with environment-aware detail

## 9. Quality Attributes

### 9.1 Performance
- Compression and static asset serving for client build
- Bounded request payload sizes and rate limiting

### 9.2 Security
- Hashed credentials
- Token-based authentication
- Environment-based secrets management

### 9.3 Maintainability
- Clear separation between route, model, and utility concerns
- Feature-based frontend page organization by role

## 10. Traceability

Each functional area in SRS maps to:
- Frontend page(s)
- API route module(s)
- Data model(s)

This section can be expanded with a formal requirement-to-component matrix.

## 11. Appendices

### 11.1 Diagram Index
See the diagrams folder for UML and behavior diagrams.

### 11.2 Future Design Considerations
- Persistent object storage for uploads
- Event-driven integration patterns for notifications
- Advanced observability and audit architecture
