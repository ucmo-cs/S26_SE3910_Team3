# API Call Flow Diagram

## User Booking Journey with API Calls

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React)                                 │
└──────────────────────────────────────────────────────────────────────────────┘

Step 1: Appointment Type Selection
┌─────────────────────────────────┐
│ - Select appointment type        │
│ - Enter ZIP code                 │
│ - Validation: type + 5-digit ZIP │
└─────────────┬───────────────────┘
              │ [Next Button]
              ▼

Step 2: Branch Selection
┌─────────────────────────────────┐
│ - Show 4 KC branches             │
│ - Display address, phone, hours  │
│ - User selects branch            │
└─────────────┬───────────────────┘
              │ [Select Time Slot]
              ▼

Step 3: Time Slot Selection
┌─────────────────────────────────┐
│ - Show next 14 business days     │
│ - 9 AM - 4 PM hourly slots       │
│ - Mark some as "booked"          │
└─────────────┬───────────────────┘
              │ [Continue]
              ▼

Step 4: User Information
┌─────────────────────────────────┐
│ - Name (required)                │
│ - Email (validated)              │
│ - Phone (auto-formatted)         │
└─────────────┬───────────────────┘
              │ [Review Appointment]
              ▼

Step 5: Review & Confirmation
┌─────────────────────────────────┐
│ - Show all entered data          │
│ - Appointment summary            │
│ - [Confirm Appointment] button   │
└─────────────┬───────────────────┘
              │ User clicks Confirm
              ▼

╔═══════════════════════════════════════════════════════════════════════════════╗
║                         🔴 API CALL #1: BOOK APPOINTMENT                      ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Frontend sends:
┌───────────────────────────────────────────────────────────────────────┐
│ POST http://localhost:8080/api/appointments                           │
│ Content-Type: application/json                                        │
│                                                                        │
│ Body: {                                                                │
│   "appointmentType": "Loan Consultation",                             │
│   "branch": {                                                          │
│     "id": "1",                                                         │
│     "name": "Downtown Financial Center",                              │
│     "address": "1200 Main Street",                                    │
│     "city": "Kansas City",                                            │
│     "state": "MO",                                                    │
│     "zip": "64105",                                                   │
│     "phone": "(816) 555-4567"                                         │
│   },                                                                   │
│   "timeSlot": {                                                        │
│     "date": "2026-03-25",                                             │
│     "time": "10:00 AM"                                                │
│   },                                                                   │
│   "userInfo": {                                                        │
│     "name": "John Doe",                                               │
│     "email": "john.doe@example.com",                                  │
│     "phone": "(555) 123-4567"                                         │
│   }                                                                    │
│ }                                                                      │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                          SPRING BOOT BACKEND                                  │
│                                                                               │
│  @PostMapping("/api/appointments")                                           │
│  public ResponseEntity<AppointmentResponse> bookAppointment(...)             │
│                                                                               │
│  Actions:                                                                     │
│  1. Validate request data                                                    │
│  2. Generate confirmation number: "BNK-ABC1234"                              │
│  3. Generate UUID for appointment ID                                         │
│  4. Save to database (JPA)                                                   │
│  5. Return appointment with ID and confirmation number                       │
└──────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Backend returns:
┌───────────────────────────────────────────────────────────────────────┐
│ HTTP 201 Created                                                       │
│ Content-Type: application/json                                        │
│                                                                        │
│ Body: {                                                                │
│   "id": "123e4567-e89b-12d3-a456-426614174000",                       │
│   "confirmationNumber": "BNK-ABC1234",                                │
│   "appointmentType": "Loan Consultation",                             │
│   "branch": { ... },                                                   │
│   "timeSlot": { ... },                                                 │
│   "userInfo": { ... },                                                 │
│   "createdAt": "2026-03-18T10:30:00Z",                                │
│   "status": "CONFIRMED"                                               │
│ }                                                                      │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Frontend receives response and stores:
- appointmentId: "123e4567-e89b-12d3-a456-426614174000"
- confirmationNumber: "BNK-ABC1234"

              ▼

╔═══════════════════════════════════════════════════════════════════════════════╗
║                  🔴 API CALL #2: SEND CONFIRMATION EMAIL                      ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Frontend sends:
┌───────────────────────────────────────────────────────────────────────┐
│ POST http://localhost:8080/api/appointments/send-confirmation         │
│ Content-Type: application/json                                        │
│                                                                        │
│ Body: {                                                                │
│   "appointmentId": "123e4567-e89b-12d3-a456-426614174000",            │
│   "email": "john.doe@example.com",                                    │
│   "confirmationNumber": "BNK-ABC1234",                                │
│   "appointmentType": "Loan Consultation",                             │
│   "branch": { name, address, city, state, zip, phone },               │
│   "timeSlot": { date, time },                                          │
│   "userInfo": { name, email, phone }                                   │
│ }                                                                      │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                          SPRING BOOT BACKEND                                  │
│                                                                               │
│  @PostMapping("/api/appointments/send-confirmation")                         │
│  public ResponseEntity<EmailResponse> sendConfirmation(...)                  │
│                                                                               │
│  Actions:                                                                     │
│  1. Generate HTML email template with Commerce Bank branding                │
│  2. Create iCalendar (.ics) file:                                            │
│     BEGIN:VCALENDAR                                                          │
│     VERSION:2.0                                                              │
│     BEGIN:VEVENT                                                             │
│     DTSTART:20260325T100000                                                  │
│     DTEND:20260325T110000                                                    │
│     SUMMARY:Commerce Bank - Loan Consultation                               │
│     LOCATION:Downtown Financial Center, 1200 Main St, KC, MO 64105         │
│     DESCRIPTION:Confirmation: BNK-ABC1234\nCustomer: John Doe               │
│     END:VEVENT                                                               │
│     END:VCALENDAR                                                            │
│  3. Send email using JavaMail with .ics attachment                          │
│  4. Return success response                                                  │
└──────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Backend returns:
┌───────────────────────────────────────────────────────────────────────┐
│ HTTP 200 OK                                                            │
│ Content-Type: application/json                                        │
│                                                                        │
│ Body: {                                                                │
│   "success": true,                                                     │
│   "message": "Confirmation email sent successfully",                  │
│   "emailId": "msg_xyz789"                                             │
│ }                                                                      │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
User receives email:
┌──────────────────────────────────────────────────────────────────────┐
│ To: john.doe@example.com                                             │
│ Subject: Appointment Confirmation - BNK-ABC1234                      │
│ Attachment: appointment.ics                                          │
│                                                                       │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │         🏦 COMMERCE BANK                                        │ │
│ │                                                                  │ │
│ │  Your appointment has been confirmed!                           │ │
│ │                                                                  │ │
│ │  Confirmation Number: BNK-ABC1234                               │ │
│ │                                                                  │ │
│ │  Appointment Type: Loan Consultation                            │ │
│ │  Date: Wednesday, March 25, 2026                                │ │
│ │  Time: 10:00 AM                                                 │ │
│ │  Duration: 1 hour                                               │ │
│ │                                                                  │ │
│ │  Location:                                                       │ │
│ │  Downtown Financial Center                                       │ │
│ │  1200 Main Street                                               │ │
│ │  Kansas City, MO 64105                                          │ │
│ │  Phone: (816) 555-4567                                          │ │
│ │                                                                  │ │
│ │  [Add to Calendar] ← Opens .ics file                           │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘

              ▼
Frontend navigates to Success Page (Step 6)

Step 6: Success & Confirmation
┌─────────────────────────────────┐
│ ✅ Appointment Confirmed!        │
│                                  │
│ Confirmation #: BNK-ABC1234      │
│                                  │
│ Show appointment details         │
│                                  │
│ [Download Confirmation] button   │
│ [Schedule Another Appointment]   │
└─────────────┬───────────────────┘
              │ User clicks Download
              ▼

╔═══════════════════════════════════════════════════════════════════════════════╗
║                     🔴 API CALL #3: GENERATE PDF                              ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Frontend sends:
┌───────────────────────────────────────────────────────────────────────┐
│ POST http://localhost:8080/api/appointments/generate-pdf              │
│ Content-Type: application/json                                        │
│                                                                        │
│ Body: {                                                                │
│   "appointmentId": "123e4567-e89b-12d3-a456-426614174000",            │
│   "confirmationNumber": "BNK-ABC1234",                                │
│   "appointmentType": "Loan Consultation",                             │
│   "branch": { name, address, city, state, zip, phone },               │
│   "timeSlot": { date, time },                                          │
│   "userInfo": { name, email, phone }                                   │
│ }                                                                      │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                          SPRING BOOT BACKEND                                  │
│                                                                               │
│  @PostMapping("/api/appointments/generate-pdf")                              │
│  public ResponseEntity<byte[]> generatePdf(...)                              │
│                                                                               │
│  Actions:                                                                     │
│  1. Create PDF document using iText/PDFBox                                   │
│  2. Add Commerce Bank logo and green branding                                │
│  3. Format PDF with:                                                         │
│     - Header with logo                                                       │
│     - Title: "Appointment Confirmation"                                      │
│     - Large confirmation number in green                                     │
│     - Table with appointment details                                         │
│     - Branch location information                                            │
│     - Customer information                                                   │
│     - Important notes section                                                │
│     - Footer with bank contact info                                          │
│  4. Convert to byte array                                                    │
│  5. Set proper headers for download                                          │
└──────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Backend returns:
┌───────────────────────────────────────────────────────────────────────┐
│ HTTP 200 OK                                                            │
│ Content-Type: application/pdf                                         │
│ Content-Disposition: attachment;                                      │
│   filename="appointment-confirmation-BNK-ABC1234.pdf"                 │
│                                                                        │
│ Body: [Binary PDF data]                                               │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Frontend JavaScript:
1. Receives PDF blob
2. Creates download URL: blob:http://localhost:5173/...
3. Creates temporary <a> element
4. Sets href to blob URL
5. Sets download attribute: "appointment-confirmation-BNK-ABC1234.pdf"
6. Triggers click event
7. Removes temporary element
8. Cleans up blob URL

                                    ▼
User's computer downloads:
┌──────────────────────────────────────────────────────────────────────┐
│ 📄 appointment-confirmation-BNK-ABC1234.pdf                          │
│                                                                       │
│    ┌─────────────────────────────────────────────────────────────┐  │
│    │  🏦 COMMERCE BANK                                           │  │
│    │                                                              │  │
│    │  APPOINTMENT CONFIRMATION                                   │  │
│    │                                                              │  │
│    │  Confirmation Number                                         │  │
│    │  BNK-ABC1234                                                │  │
│    │                                                              │  │
│    │  ┌──────────────────────────────────────────────────────┐  │  │
│    │  │ Appointment Details                                  │  │  │
│    │  ├──────────────────────────────────────────────────────┤  │  │
│    │  │ Type:     Loan Consultation                          │  │  │
│    │  │ Date:     Wednesday, March 25, 2026                  │  │  │
│    │  │ Time:     10:00 AM - 11:00 AM                        │  │  │
│    │  └──────────────────────────────────────────────────────┘  │  │
│    │                                                              │  │
│    │  ┌──────────────────────────────────────────────────────┐  │  │
│    │  │ Branch Location                                      │  │  │
│    │  ├──────────────────────────────────────────────────────┤  │  │
│    │  │ Downtown Financial Center                            │  │  │
│    │  │ 1200 Main Street                                     │  │  │
│    │  │ Kansas City, MO 64105                                │  │  │
│    │  │ Phone: (816) 555-4567                                │  │  │
│    │  └──────────────────────────────────────────────────────┘  │  │
│    │                                                              │  │
│    │  ┌──────────────────────────────────────────────────────┐  │  │
│    │  │ Customer Information                                 │  │  │
│    │  ├──────────────────────────────────────────────────────┤  │  │
│    │  │ Name:     John Doe                                   │  │  │
│    │  │ Email:    john.doe@example.com                       │  │  │
│    │  │ Phone:    (555) 123-4567                             │  │  │
│    │  └──────────────────────────────────────────────────────┘  │  │
│    │                                                              │  │
│    │  Important Notes:                                           │  │
│    │  • Please arrive 5 minutes early                           │  │
│    │  • Bring a valid government-issued ID                      │  │
│    │  • For rescheduling, call (816) 555-4567                  │  │
│    │                                                              │  │
│    │  ──────────────────────────────────────────────────────── │  │
│    │  Commerce Bank | (555) 100-2000                            │  │
│    │  support@commercebank.com                                   │  │
│    └─────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════
                     ✅ BOOKING COMPLETE!
═══════════════════════════════════════════════════════════════════════

Summary:
✅ Appointment booked in database
✅ Confirmation email sent to customer
✅ Calendar invite (.ics) attached to email
✅ PDF confirmation downloaded to customer's computer
✅ Customer has confirmation number: BNK-ABC1234
```

## Error Handling Flow

```
┌────────────────────────────────────────────────────────────────┐
│ If API Call Fails:                                             │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Frontend catches error                                          │
│         │                                                        │
│         ▼                                                        │
│ Display error message to user:                                 │
│ ┌─────────────────────────────────────────────────────────┐    │
│ │ ❌ Error: Failed to book appointment.                   │    │
│ │    Please try again.                                     │    │
│ └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│ User can:                                                       │
│ • Click [Back] to edit information                             │
│ • Click [Confirm Appointment] to retry                         │
│                                                                 │
│ Error logged to console for debugging                          │
└────────────────────────────────────────────────────────────────┘
```

## Loading States

```
During API calls, frontend shows:

┌────────────────────────────────────┐
│ [Confirming...]                     │  ← Button disabled
└────────────────────────────────────┘

or

┌────────────────────────────────────┐
│ [Generating PDF...]                 │  ← Button disabled
└────────────────────────────────────┘

Prevents duplicate submissions!
```
