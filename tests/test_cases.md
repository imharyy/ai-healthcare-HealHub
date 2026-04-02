# HealHub Test Data Suit Preparation

Date: 2026-04-02
System Under Test: HealHub (client + server)
Coverage Goal: Unit + Integration + End-to-End scenario coverage for all implemented features

## 1. Feature Study Summary

### 1.1 Roles
- Patient
- Doctor
- Receptionist
- Admin
- Superadmin

### 1.2 Backend Feature Modules
- Authentication and profile management
- Admin and hospital management
- Patient dashboards and doctor search
- Appointment lifecycle and queueing
- Doctor schedule and queue control
- Reception operations (walk-in, beds, reports)
- Medical records and uploads
- Prescriptions and interaction checks
- Lab and diagnostic bookings
- Billing and invoice workflow
- Emergency workflow
- Telemedicine sessions and chat/files
- Notifications
- Feedback
- Analytics
- AI assistant and report analyzer
- Triage

### 1.3 Frontend Route Modules
- Auth pages: login, register
- Patient pages: dashboard, appointments, booking, queue, records, prescriptions, lab results, billing, telemedicine, emergency, feedback, AI assistant, diagnostic booking, report analyzer
- Doctor pages: dashboard, queue, appointments, schedule, patients, prescriptions, telemedicine, analytics
- Receptionist pages: dashboard, appointments, walk-in, queue, billing, beds
- Admin pages: dashboard, users, doctors, departments, analytics, hospital settings, audit logs, settings

## 2. Test Data Suite Preparation

## 2.1 Core Seed Data
Use seeded baseline plus additional edge data.

Baseline users:
- superadmin or admin account
- receptionist account
- at least 2 doctors in different departments
- at least 3 patients with distinct demographics

Baseline entities:
- 1 active hospital with departments
- doctor schedules for weekdays and blocked date samples
- bed inventory with available, occupied, maintenance states
- sample appointments across scheduled, confirmed, checked-in, completed, cancelled
- sample queue entries normal and emergency priorities
- sample bills (paid, partial, unpaid)
- sample lab tests and medical records with attachments
- sample telemedicine session in scheduled and completed states

## 2.2 Edge and Negative Data
- invalid email formats, short password, missing phone
- duplicate email and duplicate phone registration
- expired token and malformed token
- large payload near body limit (10MB)
- unsupported upload mime type
- upload size exceeding configured limit
- invalid ObjectId in route params
- cross-role access attempts
- unavailable schedule date and blocked leave dates
- concurrent double-booking on same slot
- stale refresh token

## 2.3 Environment Matrix
- Local development with MongoDB local
- Local development with MongoDB Atlas
- Production-like with NODE_ENV=production
- Optional Gemini key absent and present
- Optional email config absent and present

## 3. Scenario Catalog (All Possible Practical Scenarios)

## 3.1 Authentication and Session
- New user registration by role default patient
- Registration conflict on existing email or phone
- Login success, login invalid password, login deactivated account
- 2FA setup, verify 2FA success, invalid 2FA token, disable 2FA
- OTP send and verify success, invalid OTP, expired OTP
- Refresh token success, invalid refresh token
- Unauthorized access without token
- Token expiration recovery via interceptor and retry

## 3.2 Profile and Personal Data
- View current profile
- Update allowed profile fields
- Reject disallowed fields
- Upload profile photo success and invalid file type failure
- Change password success and wrong current password failure
- Update emergency contacts, family members, allergies, medications

## 3.3 Authorization and Access Control
- Patient blocked from doctor/admin routes
- Doctor blocked from admin-only routes
- Receptionist allowed specific admin-shared operations (beds, reports where configured)
- Superadmin-only hospital list and subscription updates

## 3.4 Appointment and Queue
- Fetch available slots for working day
- No schedule / blocked date / approved leave scenarios
- Book appointment success and conflict failure on same slot
- Reschedule and history tracking
- Cancel appointment and notification generation
- Confirm attendance
- Check-in adds patient to queue
- Get upcoming/history with pagination
- Doctor-specific appointment retrieval
- Queue position and queue progression APIs
- Call next and delay operations by doctor only

## 3.5 Doctor Workflow
- Doctor dashboard data integrity
- Create/update schedule
- Block slots and emergency slots
- Start consultation, complete consultation, skip patient
- Pause and resume queue
- Follow-up and patient list retrieval
- Leave request and approval flow

## 3.6 Receptionist Workflow
- Reception dashboard stats
- List daily appointments and queues
- Walk-in creation and immediate queue insertion
- Update doctor schedules
- Approve leave
- Bed create/update/emergency allocate
- Daily report aggregation correctness

## 3.7 Medical Records and Prescriptions
- Create medical record and fetch list/details
- Upload multiple record files
- Update vitals by authorized roles only
- Prescription creation and retrieval by patient
- Drug catalog and interaction check usage
- Prescription PDF/download endpoint
- Send prescription to pharmacy

## 3.8 Lab and Diagnostics
- Diagnostic catalog filter by type/category/search
- Package list retrieval
- Time slot generation weekday/saturday/sunday
- Book diagnostics with package and with individual tests
- Reject booking with no tests or invalid package
- My bookings listing
- Lab order create/status update/result upload
- Lab trends retrieval

## 3.9 Billing and Pharmacy
- Bill creation by allowed roles
- Patient bill views (my and by patient)
- Payment update full/partial
- Insurance and pre-auth updates
- Invoice download
- Pharmacy inventory and availability checks
- Place pharmacy order and update order status
- Inventory updates by authorized roles

## 3.10 Emergency, Feedback, Telemedicine
- Emergency request create/update/location update
- Nearest hospitals retrieval and patient my emergencies
- Ambulance request operation
- Feedback submit/list/respond and role checks
- Telemedicine session create, join, start, end
- Telemedicine chat message exchange
- Telemedicine file sharing upload validation

## 3.11 Admin and Audit
- User CRUD by admin/superadmin
- Role change workflow
- Hospital create and service/policy update
- Audit log and access log filters/pagination
- Subscription update by superadmin

## 3.12 AI and Triage
- AI assistant analyze success with key
- AI assistant behavior when key missing or upstream failure
- Symptom list endpoint retrieval
- Conversation delete endpoint
- Report analyzer record list and analysis
- Triage symptom catalog and assessment output

## 3.13 Cross-Cutting Non-Functional
- CORS allow and block origin behavior
- Rate limit hit behavior
- Health endpoint availability
- Static frontend serving in production build
- Socket event delivery for notification and queue events
- Error middleware response structure consistency

## 4. Detailed Test Cases

Format:
- Priority: P0 critical, P1 high, P2 medium
- Type: U (unit), I (integration API), E2E (UI + API)

| ID | Priority | Type | Module | Test Case | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-AUTH-001 | P0 | I | Auth | Register patient success | Unique email and phone | POST /api/auth/register with valid body | 201, token and refreshToken returned, user role patient |
| TC-AUTH-002 | P0 | I | Auth | Register duplicate email fails | Existing user email | Register using same email | 400 with duplicate message |
| TC-AUTH-003 | P0 | I | Auth | Login success | Active user exists | POST /api/auth/login valid credentials | 200, user and tokens returned |
| TC-AUTH-004 | P0 | I | Auth | Login invalid password | Active user exists | Login with wrong password | 401 invalid credentials |
| TC-AUTH-005 | P1 | I | Auth | Login deactivated user blocked | User isActive false | Login with valid password | 403 account deactivated |
| TC-AUTH-006 | P1 | I | Auth | Setup 2FA and verify flow | Logged-in user | POST setup-2fa then verify-2fa with generated token | 200 success and authenticated tokens |
| TC-AUTH-007 | P1 | I | Auth | Verify 2FA invalid token | 2FA enabled | verify-2fa with wrong code | 401 invalid 2FA code |
| TC-AUTH-008 | P1 | I | Auth | Refresh token renewal | Valid refresh token | POST refresh-token | 200 new token and refresh token |
| TC-AUTH-009 | P0 | I | Auth | Access protected route without token | None | GET /api/auth/me without header | 401 access denied |
| TC-AUTH-010 | P1 | I | Auth | OTP verify expired fails | otpExpiry in past | POST verify-otp with old OTP | 401 invalid or expired OTP |
| TC-PROF-001 | P1 | I | Profile | Update allowed fields success | Authenticated user | PUT /api/auth/profile with firstName etc | 200 and updated fields |
| TC-PROF-002 | P1 | I | Profile | Profile photo valid upload | Authenticated user | POST profile-photo with png file | 200 and profilePhoto path saved |
| TC-PROF-003 | P1 | I | Profile | Reject disallowed upload type | Authenticated user | Upload exe file | 500 or validation error with file type message |
| TC-PROF-004 | P1 | I | Profile | Change password wrong current | Authenticated user | PUT change-password wrong currentPassword | 400 current password incorrect |
| TC-AUTHZ-001 | P0 | I | Authorization | Patient cannot access admin users list | Patient token | GET /api/admin/users | 403 unauthorized role |
| TC-AUTHZ-002 | P0 | I | Authorization | Doctor cannot create hospital | Doctor token | POST /api/admin/hospitals | 403 unauthorized role |
| TC-AUTHZ-003 | P0 | I | Authorization | Superadmin can update subscription | Superadmin token | PUT /api/admin/hospitals/:id/subscription | 200 success |
| TC-APPT-001 | P0 | I | Appointment | Get available slots success | Doctor schedule active | GET available-slots with doctorId,date | available true with slots |
| TC-APPT-002 | P1 | I | Appointment | Get available slots no schedule | No schedule for day | Query slots | available false with message |
| TC-APPT-003 | P1 | I | Appointment | Get available slots on approved leave | Approved leave contains date | Query slots | available false doctor on leave |
| TC-APPT-004 | P0 | I | Appointment | Book appointment success | Slot free | POST /api/appointments valid payload | 201 scheduled appointment |
| TC-APPT-005 | P0 | I | Appointment | Prevent double booking same slot | Existing appointment same slot | Repeat booking same doctor/date/startTime | 400 already booked |
| TC-APPT-006 | P1 | I | Appointment | Reschedule updates history | Existing appointment | PUT reschedule with new slot | 200, rescheduleHistory appended |
| TC-APPT-007 | P1 | I | Appointment | Cancel appointment | Existing appointment | PUT cancel/:id with reason | 200 status cancelled |
| TC-APPT-008 | P1 | I | Appointment | Confirm attendance | Existing appointment | PUT confirm/:id | 200 status confirmed |
| TC-APPT-009 | P0 | I | Appointment | Check-in adds queue entry | Existing confirmed appointment | PUT check-in/:id | 200 and queue entry created |
| TC-APPT-010 | P1 | I | Appointment | History pagination | Many completed records | GET history?page=2&limit=20 | 200 with pagination object |
| TC-QUEUE-001 | P0 | I | Queue | Doctor call next patient | Queue exists | POST /api/queue/call-next with doctor token | 200 next token processed |
| TC-QUEUE-002 | P0 | I | Queue | Non-doctor cannot call next | Patient token | POST call-next | 403 |
| TC-QUEUE-003 | P1 | I | Queue | Patient my-position endpoint | Checked-in appointment | GET /api/queue/my-position | 200 with current queue details |
| TC-DR-001 | P1 | I | Doctor | Doctor dashboard loads | Doctor token | GET /api/doctors/dashboard | 200 with stats |
| TC-DR-002 | P1 | I | Doctor | Add schedule entries | Doctor token | POST /api/doctors/schedule valid slots | 200/201 schedule saved |
| TC-DR-003 | P1 | I | Doctor | Pause and resume queue | Active doctor queue | POST pause-queue then resume-queue | queue state transitions reflected |
| TC-DR-004 | P1 | I | Doctor | Start and complete consultation | Appointment assigned to doctor | POST start-consultation then complete-consultation | statuses update correctly |
| TC-REC-001 | P1 | I | Receptionist | Walk-in booking adds checked-in appointment | receptionist token and patientId | POST /api/receptionist/walk-in | 201 with checked-in walk-in |
| TC-REC-002 | P1 | I | Receptionist | Bed emergency allocate | Bed available | POST /api/receptionist/beds/:id/emergency-allocate | bed occupied with patient |
| TC-REC-003 | P1 | I | Receptionist | Daily report totals accurate | Mixed day data exists | GET /api/receptionist/reports/daily | totals match DB aggregates |
| TC-REC-004 | P0 | I | Receptionist | Non-receptionist denied dashboard | patient token | GET receptionist/dashboard | 403 |
| TC-MR-001 | P1 | I | Medical Records | Create medical record | doctor token | POST /api/medical-records | 201 success |
| TC-MR-002 | P1 | I | Medical Records | Upload multiple record files | auth token and pdf files | POST /api/medical-records/upload with files[] | 200 with paths |
| TC-MR-003 | P1 | I | Medical Records | Update vitals by doctor/receptionist | authorized token | PUT /api/medical-records/:id/vitals | 200 updated vitals |
| TC-MR-004 | P0 | I | Medical Records | Unauthorized role cannot update vitals | patient token | PUT vitals | 403 |
| TC-RX-001 | P1 | I | Prescription | Doctor creates prescription | doctor token | POST /api/prescriptions | 201 created |
| TC-RX-002 | P1 | I | Prescription | Drug interaction check | doctor token | POST /api/prescriptions/check-interactions | 200 with interaction data |
| TC-RX-003 | P1 | I | Prescription | Patient can view own prescriptions | patient token | GET /api/prescriptions/my | 200 list returned |
| TC-LAB-001 | P1 | I | Lab | Create lab test order | doctor or receptionist token | POST /api/lab | 201 lab order |
| TC-LAB-002 | P1 | I | Lab | Update lab status | authorized role | PUT /api/lab/:id/status | 200 status updated |
| TC-LAB-003 | P1 | I | Lab | Upload lab result files | doctor/admin token, files | PUT /api/lab/:id/results | 200 files attached |
| TC-LAB-004 | P1 | I | Lab | Get patient trends | existing lab history | GET /api/lab/trends/:patientId | 200 trend summary |
| TC-DIAG-001 | P1 | I | Diagnostic | Catalog filter by type | auth token | GET /api/diagnostic/tests?type=pathology | only pathology tests |
| TC-DIAG-002 | P1 | I | Diagnostic | Sunday no slots | Sunday date | GET /api/diagnostic/time-slots | empty array |
| TC-DIAG-003 | P1 | I | Diagnostic | Book package success | valid packageId | POST /api/diagnostic/book | 201 with resolved tests |
| TC-DIAG-004 | P0 | I | Diagnostic | Book fails no test/package | none selected | POST /book with empty testIds | 400 validation message |
| TC-DIAG-005 | P1 | I | Diagnostic | Invalid package rejected | bad packageId | POST /book | 400 invalid package |
| TC-BILL-001 | P1 | I | Billing | Create bill | receptionist/admin/doctor token | POST /api/billing | 201 bill created |
| TC-BILL-002 | P1 | I | Billing | Patient my bills | patient token | GET /api/billing/my | 200 patient-only bills |
| TC-BILL-003 | P1 | I | Billing | Mark payment full/partial | authorized token | PUT /api/billing/:id/pay | payment fields update |
| TC-BILL-004 | P1 | I | Billing | Download invoice | existing bill | GET /api/billing/:id/download | 200 file or pdf stream |
| TC-PHAR-001 | P1 | I | Pharmacy | Check inventory | auth token | GET /api/pharmacy/:hospitalId/inventory | 200 inventory list |
| TC-PHAR-002 | P1 | I | Pharmacy | Place medicine order | auth token | POST /api/pharmacy/order | 201/200 order created |
| TC-PHAR-003 | P1 | I | Pharmacy | Unauthorized inventory update denied | patient token | PUT /api/pharmacy/:hospitalId/inventory | 403 |
| TC-EMR-001 | P1 | I | Emergency | Create emergency request | patient token | POST /api/emergency | 201 created |
| TC-EMR-002 | P1 | I | Emergency | Request ambulance | valid emergency id | POST /api/emergency/:id/ambulance | 200 status updated |
| TC-EMR-003 | P1 | I | Emergency | Update live location | request owner token | PUT /api/emergency/:id/location | 200 location saved |
| TC-TM-001 | P1 | I | Telemedicine | Doctor creates session | doctor token | POST /api/telemedicine | 201 with roomId |
| TC-TM-002 | P1 | I | Telemedicine | Patient joins valid room | existing room | GET /api/telemedicine/join/:roomId | 200 session data |
| TC-TM-003 | P1 | I | Telemedicine | Join invalid room fails | bad roomId | GET join/bad | 404 session not found |
| TC-TM-004 | P1 | I | Telemedicine | Start and end session | doctor token | PUT /:id/start then PUT /:id/end | in-progress then completed with duration |
| TC-TM-005 | P1 | I | Telemedicine | Chat message emitted | session exists | POST /:id/chat | 200 and socket event to peer |
| TC-TM-006 | P1 | I | Telemedicine | File upload in session | valid file | POST /:id/file multipart | 200 file metadata saved |
| TC-NOTIF-001 | P1 | I | Notification | List notifications | auth token | GET /api/notifications | 200 list |
| TC-NOTIF-002 | P1 | I | Notification | Mark one as read | existing notification id | PUT /api/notifications/:id/read | status read |
| TC-NOTIF-003 | P1 | I | Notification | Mark all as read | auth token | PUT /api/notifications/read-all | all unread become read |
| TC-NOTIF-004 | P1 | I | Notification | Delete notification | auth token | DELETE /api/notifications/:id | removed |
| TC-FDBK-001 | P1 | I | Feedback | Submit feedback | patient token | POST /api/feedback | 201 created |
| TC-FDBK-002 | P1 | I | Feedback | Doctor/admin respond to feedback | doctor token | PUT /api/feedback/:id/respond | response saved |
| TC-FDBK-003 | P1 | I | Feedback | Patient cannot respond endpoint | patient token | PUT respond | 403 |
| TC-ADM-001 | P0 | I | Admin | Admin list users with filters | admin token | GET /api/admin/users?role=doctor&search=raj | paginated filtered list |
| TC-ADM-002 | P0 | I | Admin | Create user with hospital fallback | admin token | POST /api/admin/users without hospital in payload | user created under admin hospital |
| TC-ADM-003 | P1 | I | Admin | Deactivate user | admin token | DELETE /api/admin/users/:id | isActive false |
| TC-ADM-004 | P1 | I | Admin | View audit logs | admin token | GET /api/admin/audit-logs | logs and pagination |
| TC-HOSP-001 | P1 | I | Hospital | Public hospital list | no auth | GET /api/hospitals | 200 data |
| TC-HOSP-002 | P1 | I | Hospital | Admin adds department | admin token | POST /api/hospitals/:id/departments | 201/200 department added |
| TC-HOSP-003 | P1 | I | Hospital | Receptionist updates bed count | receptionist token | PUT /api/hospitals/:id/beds | 200 update |
| TC-ANLT-001 | P1 | I | Analytics | Admin analytics endpoint | admin token | GET /api/analytics | summary payload returned |
| TC-AI-001 | P1 | I | AI Assistant | Analyze symptoms with API key | auth token and GEMINI key | POST /api/ai-assistant/analyze | analysis response |
| TC-AI-002 | P1 | I | AI Assistant | Handle missing GEMINI key | GEMINI key absent | POST analyze | graceful error message/status |
| TC-AI-003 | P1 | I | Report Analyzer | Analyze report text/file metadata | auth token | POST /api/report-analyzer/analyze | structured analysis output |
| TC-TRI-001 | P1 | I | Triage | Retrieve symptom catalog | auth token | GET /api/triage/symptoms | list returned |
| TC-TRI-002 | P1 | I | Triage | Severity assessment | auth token | POST /api/triage/assess | triage level and recommendation |
| TC-SYS-001 | P0 | I | Security | CORS blocked origin | FRONTEND_URL excludes test origin | call API from disallowed origin | request rejected by CORS |
| TC-SYS-002 | P0 | I | Security | Rate limit threshold | burst requests over limit | send > max requests to /api route | 429 too many requests |
| TC-SYS-003 | P1 | I | Health | Health endpoint check | server running | GET /api/health | 200 status ok |
| TC-SYS-004 | P1 | E2E | Production Serve | React build served by backend | build exists | open root URL | app shell loads |
| TC-SYS-005 | P1 | E2E | Token Refresh UX | Expired access token auto-refresh | valid refresh token in storage | call protected API from UI | request retried and user stays logged in |
| TC-SYS-006 | P1 | E2E | Forced logout on refresh fail | invalid refresh token | call protected API with expired access token | tokens cleared and redirected to login |

## 5. Unit Test Target List

Priority unit targets:
- queue engine ordering and emergency priority behavior
- notification service payload construction and socket emit branching
- auth middleware token parse and role authorization checks
- upload middleware type filter and size limit
- appointment slot generation function boundaries
- diagnostic slot generator sunday/saturday behavior
- billing total and due calculations
- triage scoring utilities
- report analyzer parser helpers

## 6. Integration Test Execution Strategy

- Use isolated test database per run.
- Seed deterministic fixtures before suite.
- Group suites by module with independent setup/teardown.
- Validate both response payload and DB side effects.
- Validate socket events where applicable.

## 7. Suggested Automation Split

- Backend integration: Jest + Supertest + mongodb-memory-server (or test Atlas DB)
- Frontend component and flow: React Testing Library + Mock Service Worker
- End-to-end: Playwright or Cypress for multi-role user journeys

## 8. Exit Criteria

- 100 percent pass for all P0 tests
- At least 95 percent pass for P1 tests
- No open critical defects in auth, booking, billing, telemedicine, emergency
- Regression suite green after every release branch merge
