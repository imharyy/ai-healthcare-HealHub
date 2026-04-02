# Software Requirements Specification (SRS)

Project: HealHub
Version: 1.0
Date: 2026-04-02

## 1. Introduction

### 1.1 Purpose
This document defines the functional and non-functional requirements for HealHub, a healthcare management platform supporting hospital operations across multiple user roles.

### 1.2 Scope
HealHub provides modules for authentication, appointments, queueing, telemedicine, diagnostics, prescriptions, billing, notifications, analytics, and administrative control.

### 1.3 Definitions, Acronyms, Abbreviations
- SRS: Software Requirements Specification
- EHR: Electronic Health Record
- RBAC: Role-Based Access Control
- API: Application Programming Interface

### 1.4 References
- IEEE 29148 (Requirements Engineering)
- IEEE 830 (legacy SRS guidance)
- Project source code and deployment documentation

### 1.5 Overview
This SRS is structured into product perspective, user classes, functional requirements, external interfaces, and quality attributes.

## 2. Overall Description

### 2.1 Product Perspective
HealHub is a full-stack web application with:
- React frontend client
- Node.js/Express backend API
- MongoDB data store
- Socket.IO for realtime events

### 2.2 Product Functions
- Role-based login and authorization
- Doctor scheduling and appointment booking
- Patient queue and triage handling
- Medical records and prescriptions management
- Lab/diagnostic report workflows
- Billing and payment tracking
- Telemedicine support
- Notifications and alerts
- Analytics dashboards

### 2.3 User Classes and Characteristics
- Super Admin: manages organization-wide settings, users, departments, and reporting
- Doctor: manages schedules, appointments, prescriptions, and patient data
- Receptionist: handles patient intake, queue, and appointment coordination
- Patient: books appointments, views records, and uses telemedicine features

### 2.4 Operating Environment
- Browser-based client on modern desktop/mobile browsers
- Backend hosted on Node.js runtime
- MongoDB Atlas or local MongoDB deployment

### 2.5 Design and Implementation Constraints
- JWT-based authentication and authorization
- Data model consistency with existing MongoDB schemas
- CORS restrictions based on deployment frontend URLs

### 2.6 Assumptions and Dependencies
- External services (email, AI APIs) may be optionally configured
- Internet connectivity required for cloud-hosted deployment

## 3. External Interface Requirements

### 3.1 User Interfaces
- Responsive web dashboards for all supported roles
- Forms for appointment booking, records, and administrative tasks

### 3.2 Hardware Interfaces
No direct hardware dependencies beyond standard server/client infrastructure.

### 3.3 Software Interfaces
- MongoDB database
- REST APIs exposed by Express routes
- Realtime event channels via Socket.IO

### 3.4 Communications Interfaces
- HTTPS for frontend/backend communication
- WebSocket transport for realtime updates

## 4. Functional Requirements

### 4.1 Authentication and Authorization
- FR-1: System shall support secure user registration and login.
- FR-2: System shall enforce role-based route and action access.
- FR-3: System shall issue and validate JWT access tokens.

### 4.2 Appointment and Scheduling
- FR-4: Patients shall be able to book appointments with doctors.
- FR-5: Doctors shall manage availability and schedules.
- FR-6: Receptionists shall create and update appointments on behalf of patients.

### 4.3 Patient and Medical Records
- FR-7: Authorized users shall create and view medical records.
- FR-8: Doctors shall generate and manage prescriptions.

### 4.4 Queue and Triage
- FR-9: System shall maintain patient queue states.
- FR-10: System shall support triage prioritization workflows.

### 4.5 Diagnostics and Lab
- FR-11: System shall store and retrieve diagnostic requests/results.
- FR-12: Users shall upload and access report files with authorization checks.

### 4.6 Billing and Notifications
- FR-13: System shall generate and manage billing records.
- FR-14: System shall notify users about important status changes.

### 4.7 Telemedicine and AI Features
- FR-15: System shall support telemedicine sessions.
- FR-16: System may provide AI-assisted tools when configured.

## 5. Non-Functional Requirements

### 5.1 Performance
- NFR-1: API responses for common operations should complete within acceptable interactive latency under normal load.

### 5.2 Security
- NFR-2: Sensitive operations shall require authentication.
- NFR-3: Passwords shall be stored using secure hashing.
- NFR-4: Transport shall use HTTPS in production.

### 5.3 Reliability and Availability
- NFR-5: System should handle transient failures gracefully and provide meaningful error messages.

### 5.4 Scalability
- NFR-6: Architecture should support horizontal scaling of stateless API components.

### 5.5 Maintainability
- NFR-7: Codebase should remain modular with route/model/service separation.

### 5.6 Usability
- NFR-8: Role-specific dashboards should provide clear workflows for common tasks.

## 6. Appendices

### 6.1 Future Enhancements
- Advanced audit and compliance reporting
- Cloud object storage for uploads
- Multi-hospital tenancy enhancements

### 6.2 Open Issues
- Define measurable SLAs/SLOs for production scale
- Expand formal acceptance criteria per module
