# SRS to Test Case Traceability Matrix

Date: 2026-04-02
Source SRS: docs/SRS.md
Source Test Cases: tests/test_cases.md

## Functional Requirements Traceability

| SRS ID | Requirement Summary | Mapped Test Case IDs |
| --- | --- | --- |
| FR-1 | Secure registration and login | TC-AUTH-001, TC-AUTH-003, TC-AUTH-004, TC-AUTH-005 |
| FR-2 | Enforce role-based route/action access | TC-AUTHZ-001, TC-AUTHZ-002, TC-AUTHZ-003, TC-REC-004, TC-MR-004, TC-PHAR-003 |
| FR-3 | Issue and validate JWT access tokens | TC-AUTH-003, TC-AUTH-008, TC-AUTH-009, TC-SYS-005, TC-SYS-006 |
| FR-4 | Patients can book appointments | TC-APPT-001, TC-APPT-004, TC-APPT-005 |
| FR-5 | Doctors manage availability and schedules | TC-DR-002, TC-APPT-001, TC-APPT-002, TC-APPT-003 |
| FR-6 | Receptionists manage appointments for patients | TC-REC-001, TC-REC-002, TC-REC-003 |
| FR-7 | Authorized users can create/view medical records | TC-MR-001, TC-MR-002, TC-MR-003, TC-MR-004 |
| FR-8 | Doctors manage prescriptions | TC-RX-001, TC-RX-002, TC-RX-003 |
| FR-9 | Maintain patient queue states | TC-APPT-009, TC-QUEUE-001, TC-QUEUE-002, TC-QUEUE-003, TC-DR-003 |
| FR-10 | Support triage prioritization workflows | TC-TRI-001, TC-TRI-002, TC-REC-001 |
| FR-11 | Store and retrieve diagnostics/lab records | TC-LAB-001, TC-LAB-002, TC-LAB-003, TC-LAB-004, TC-DIAG-003 |
| FR-12 | Authorized upload/access to report files | TC-PROF-002, TC-PROF-003, TC-MR-002, TC-LAB-003, TC-TM-006 |
| FR-13 | Billing records lifecycle | TC-BILL-001, TC-BILL-002, TC-BILL-003, TC-BILL-004 |
| FR-14 | User notifications for key events | TC-NOTIF-001, TC-NOTIF-002, TC-NOTIF-003, TC-NOTIF-004, TC-APPT-007 |
| FR-15 | Telemedicine consultations | TC-TM-001, TC-TM-002, TC-TM-003, TC-TM-004, TC-TM-005, TC-TM-006 |
| FR-16 | Optional AI-assisted features | TC-AI-001, TC-AI-002, TC-AI-003 |

## Non-Functional Requirements Traceability

| SRS ID | Requirement Summary | Mapped Test Case IDs |
| --- | --- | --- |
| NFR-1 | Performance suitable for interactive operations | TC-SYS-002, TC-SYS-003 |
| NFR-2 | Authentication required for sensitive operations | TC-AUTH-009, TC-AUTHZ-001, TC-AUTHZ-002 |
| NFR-3 | Security controls and credential safety behavior | TC-AUTH-004, TC-AUTH-005, TC-AUTH-008 |
| NFR-4 | HTTPS in production transport | TC-SYS-004 (deployment validation), manual infra check |
| NFR-5 | Graceful failure and meaningful errors | TC-AUTH-010, TC-DIAG-004, TC-DIAG-005, TC-TM-003 |
| NFR-6 | Support scalable stateless API behavior | TC-SYS-002, TC-SYS-003 |
| NFR-7 | Maintainable modular behavior by domain | Covered by module-separated suites in tests/integration/*.test.js |
| NFR-8 | Usable role-specific workflows | E2E-PAT-001 to E2E-PAT-007, E2E-DOC-001 to E2E-DOC-005, E2E-REC-001 to E2E-REC-004, E2E-ADM-001 to E2E-SADM-001 |

## Coverage Notes

- FR and NFR mappings are linked to existing test case IDs in tests/test_cases.md.
- Any newly added requirements should append new TC IDs and update this matrix in the same commit.
- Manual checks still required for infrastructure-only controls such as enforced HTTPS certificates and CDN/TLS policies.
