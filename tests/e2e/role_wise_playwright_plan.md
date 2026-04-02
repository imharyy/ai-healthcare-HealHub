# Role-Wise E2E Playwright Test Plan (Exact UI Steps)

Date: 2026-04-02
App Base URL: http://localhost:3000
API Base URL: http://localhost:5000

## 1. Playwright Execution Preconditions

- Start backend: npm run server:dev
- Start frontend: npm run client
- Seed data: npm run seed
- Ensure test accounts exist and are active
- Browser context starts with cleared localStorage/sessionStorage

## 2. Common Login Flow Template (Reusable)

Steps:
1. Open /login.
2. Fill Email input with role credential.
3. Fill Password input.
4. Click Login button.
5. Wait for redirect to role dashboard URL.
6. Assert sidebar/menu contains role-specific sections.

Assertions:
- JWT token exists in localStorage.
- URL starts with expected role prefix.
- Dashboard widgets load without console errors.

## 3. Patient E2E Flows

## 3.1 Patient Login and Dashboard
- Test ID: E2E-PAT-001
- Steps:
1. Navigate to /login.
2. Login using patient account.
3. Verify redirect to /patient/dashboard.
4. Verify dashboard cards render appointments, queue, and notifications summary.
5. Open sidebar links one by one and confirm route change.
- Expected:
- All patient routes are reachable and no unauthorized redirect occurs.

## 3.2 Book Appointment and Verify Upcoming
- Test ID: E2E-PAT-002
- Steps:
1. Open /patient/book-appointment.
2. Select hospital/department/doctor.
3. Select date with available slots.
4. Select slot and provide reason/symptoms.
5. Submit booking.
6. Confirm success toast/message.
7. Open /patient/appointments.
8. Verify newly created appointment appears in upcoming list.
- Expected:
- Appointment is created and visible in UI with correct doctor/date/time.

## 3.3 Check Queue Status
- Test ID: E2E-PAT-003
- Steps:
1. Open /patient/queue.
2. Select active appointment/doctor queue context.
3. Verify token number, estimated wait, and queue position fields.
4. Refresh page and ensure values persist.
- Expected:
- Queue data loads and remains consistent after refresh.

## 3.4 Access Medical Records and Prescriptions
- Test ID: E2E-PAT-004
- Steps:
1. Navigate to /patient/records.
2. Verify records list loads.
3. Open one record detail if available.
4. Navigate to /patient/prescriptions.
5. Open one prescription and trigger download action.
- Expected:
- Data is retrievable and document actions are functional.

## 3.5 Diagnostic Booking
- Test ID: E2E-PAT-005
- Steps:
1. Navigate to /patient/book-diagnostic.
2. Filter tests by type/category.
3. Select one package or test set.
4. Pick date and slot.
5. Submit booking.
6. Verify success response and booking summary.
- Expected:
- Booking created and total cost displayed correctly.

## 3.6 Emergency Request
- Test ID: E2E-PAT-006
- Steps:
1. Open /patient/emergency.
2. Fill emergency details.
3. Submit request.
4. Update location if option is shown.
5. Request ambulance.
- Expected:
- Emergency request lifecycle states update in UI.

## 3.7 Patient Telemedicine Join
- Test ID: E2E-PAT-007
- Steps:
1. Open /patient/telemedicine.
2. Open a scheduled session.
3. Join room when enabled.
4. Send a text chat message.
5. Upload a supported file.
- Expected:
- Join, chat, and file share actions succeed.

## 4. Doctor E2E Flows

## 4.1 Doctor Login and Dashboard
- Test ID: E2E-DOC-001
- Steps:
1. Login with doctor account.
2. Verify redirect to /doctor/dashboard.
3. Validate stats widgets and today's list load.
- Expected:
- Doctor dashboard data visible with no access issues.

## 4.2 Manage Schedule
- Test ID: E2E-DOC-002
- Steps:
1. Open /doctor/schedule.
2. Add or edit a day schedule.
3. Save changes.
4. Reload page.
5. Confirm updated schedule persists.
- Expected:
- Schedule CRUD flow works end-to-end.

## 4.3 Queue Operations
- Test ID: E2E-DOC-003
- Steps:
1. Open /doctor/queue.
2. Click Call Next.
3. Click Delay (if available) and provide reason/duration.
4. Pause queue.
5. Resume queue.
- Expected:
- Queue state changes reflected immediately.

## 4.4 Consultation and Prescription
- Test ID: E2E-DOC-004
- Steps:
1. Open /doctor/appointments.
2. Start consultation for one checked-in patient.
3. Add notes and complete consultation.
4. Navigate to /doctor/prescriptions.
5. Create prescription with medicines.
6. Save and verify entry appears.
- Expected:
- Consultation and prescription workflows complete successfully.

## 4.5 Doctor Telemedicine Session Control
- Test ID: E2E-DOC-005
- Steps:
1. Open /doctor/telemedicine.
2. Create new session linked to patient/appointment.
3. Start session.
4. Exchange chat message.
5. End session with notes.
- Expected:
- Session transitions scheduled -> in-progress -> completed.

## 5. Receptionist E2E Flows

## 5.1 Receptionist Dashboard and Appointments
- Test ID: E2E-REC-001
- Steps:
1. Login receptionist account.
2. Verify /receptionist/dashboard loads.
3. Open /receptionist/appointments.
4. Filter by date and verify list updates.
- Expected:
- Appointment list and stats are visible.

## 5.2 Walk-In Registration
- Test ID: E2E-REC-002
- Steps:
1. Open /receptionist/walk-in.
2. Select existing patient and doctor.
3. Enter reason and priority.
4. Submit.
5. Open /receptionist/queue.
6. Verify walk-in appears in queue.
- Expected:
- Walk-in appointment is checked-in and queued.

## 5.3 Bed Management and Emergency Allocation
- Test ID: E2E-REC-003
- Steps:
1. Open /receptionist/beds.
2. Add new bed.
3. Edit bed status.
4. Use emergency allocate action for one bed.
- Expected:
- Bed status changes and patient assignment persist.

## 5.4 Receptionist Billing Actions
- Test ID: E2E-REC-004
- Steps:
1. Open /receptionist/billing.
2. Create bill for patient.
3. Mark part/full payment.
4. Trigger invoice download.
- Expected:
- Billing totals and payment status update correctly.

## 6. Admin and Superadmin E2E Flows

## 6.1 Admin User Management
- Test ID: E2E-ADM-001
- Steps:
1. Login as admin or superadmin.
2. Open /admin/users.
3. Create a new user.
4. Edit the user profile fields.
5. Change role.
6. Deactivate user.
- Expected:
- User CRUD and role update are successful.

## 6.2 Hospital and Department Configuration
- Test ID: E2E-ADM-002
- Steps:
1. Open /admin/hospital.
2. Update services/facilities.
3. Open /admin/departments.
4. Add and edit a department.
- Expected:
- Configurations save and reload correctly.

## 6.3 Audit and Analytics Review
- Test ID: E2E-ADM-003
- Steps:
1. Open /admin/audit.
2. Filter by action/resource.
3. Verify rows update.
4. Open /admin/analytics.
5. Verify charts and metrics render.
- Expected:
- Audit filtering and analytics rendering work.

## 6.4 Superadmin Subscription Update
- Test ID: E2E-SADM-001
- Steps:
1. Login as superadmin.
2. Open /admin/hospital or settings area exposing subscription.
3. Update subscription plan/limits.
4. Save and refresh.
- Expected:
- Subscription values persist and are visible after refresh.

## 7. Security and Access E2E Checks

## 7.1 Route Guarding
- Test ID: E2E-SEC-001
- Steps:
1. Login as patient.
2. Directly open /admin/users in address bar.
3. Repeat for /doctor/dashboard and /receptionist/dashboard.
- Expected:
- Unauthorized routes redirect or deny access consistently.

## 7.2 Session Expiry Recovery
- Test ID: E2E-SEC-002
- Steps:
1. Login as any role.
2. In browser devtools, invalidate token but keep refreshToken.
3. Trigger protected API call by refreshing dashboard.
- Expected:
- App silently refreshes token and user stays logged in.

## 7.3 Refresh Failure Logout
- Test ID: E2E-SEC-003
- Steps:
1. Corrupt both token and refreshToken.
2. Trigger protected request.
- Expected:
- User is redirected to /login and tokens are removed.

## 8. Playwright Implementation Notes

- Prefer data-testid selectors for stable automation.
- Use route-level waits and API response assertions.
- Keep reusable helpers:
- loginAs(role)
- goToRoleRoute(role, route)
- assertToast(text)
- assertApiStatus(url, status)

- Organize specs:
- tests/e2e/patient.spec.ts
- tests/e2e/doctor.spec.ts
- tests/e2e/receptionist.spec.ts
- tests/e2e/admin.spec.ts
- tests/e2e/security.spec.ts
