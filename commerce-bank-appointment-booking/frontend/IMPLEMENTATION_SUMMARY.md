# Commerce Bank Appointment Booking System
## Spring Boot REST API Integration - Complete

---

## ✅ Implementation Status

### Frontend (React + Vite) - ✅ COMPLETE

All frontend components and API integration layers have been fully implemented and are ready to connect to your Spring Boot backend.

### Backend (Spring Boot) - ⏳ PENDING

You need to implement the Spring Boot REST API endpoints as specified in the documentation.

---

## 📁 New Files Created

### API Service Layer
| File | Purpose |
|------|---------|
| `/src/services/api.config.ts` | API configuration, base URLs, endpoints, error handling |
| `/src/services/appointmentService.ts` | Appointment booking API calls with TypeScript types |
| `/src/services/emailService.ts` | Email sending API calls for confirmations |
| `/src/services/pdfService.ts` | PDF generation and download API calls |

### Documentation
| File | Purpose |
|------|---------|
| `/SPRING_BOOT_API_DOCUMENTATION.md` | Complete API specifications with request/response examples |
| `/README_SPRING_BOOT_INTEGRATION.md` | Detailed setup and integration guide |
| `/QUICK_START.md` | Quick reference for getting started |
| `/.env.example` | Environment variables template |

### Updated Components
| File | Changes |
|------|---------|
| `/src/app/components/ConfirmationStep.tsx` | Added API calls to book appointment and send email |
| `/src/app/components/SuccessStep.tsx` | Added API call to generate and download PDF |
| `/src/app/App.tsx` | Updated state management to handle appointment responses |

---

## 🎯 What the Frontend Does

### Step 1: Appointment Type & ZIP Code
- User selects appointment type from dropdown (8 options)
- User enters 5-digit ZIP code
- Form validation ensures valid inputs

### Step 2: Branch Selection
- Displays 4 Kansas City area branches based on ZIP
- Shows branch details: name, address, phone, hours, distance
- User selects preferred branch

### Step 3: Time Selection
- Shows next 14 business days (excludes weekends)
- Displays hourly time slots from 9 AM - 4 PM
- Some slots randomly marked as "booked" for realism
- User selects date and time

### Step 4: User Information
- Collects: name, email, phone number
- Real-time validation for email format
- Auto-formats phone number as user types: (555) 123-4567
- All fields required and validated

### Step 5: Review & Confirm
**🔴 API INTEGRATION POINT #1**
- Displays summary of all entered information
- When user clicks "Confirm Appointment":
  1. **Calls:** `POST /api/appointments` to book appointment
  2. **Receives:** Confirmation number and appointment ID
  3. **Calls:** `POST /api/appointments/send-confirmation` to send email
  4. **Email includes:** Calendar invite (.ics file) with appointment details
  5. **Navigates** to success page

### Step 6: Success Confirmation
**🔴 API INTEGRATION POINT #2**
- Shows confirmation number and appointment details
- When user clicks "Download Confirmation":
  1. **Calls:** `POST /api/appointments/generate-pdf`
  2. **Receives:** PDF file
  3. **Downloads:** PDF automatically to user's computer

---

## 🔧 What You Need to Implement (Spring Boot)

### Required Endpoints

#### 1. Book Appointment
```
POST /api/appointments
Content-Type: application/json

Request: { appointmentType, branch, timeSlot, userInfo }
Response: { id, confirmationNumber, ...appointmentData, status: "CONFIRMED" }
```

**Responsibilities:**
- Save appointment to database
- Generate unique confirmation number (e.g., "BNK-ABC1234")
- Return appointment with generated ID

---

#### 2. Send Confirmation Email
```
POST /api/appointments/send-confirmation
Content-Type: application/json

Request: { appointmentId, email, confirmationNumber, appointmentType, branch, timeSlot, userInfo }
Response: { success: true, message: "Email sent", emailId: "msg_xyz" }
```

**Responsibilities:**
- Generate HTML email with Commerce Bank branding
- Create iCalendar (.ics) file with:
  - Event title: "Commerce Bank - [Appointment Type]"
  - Start time: Date + Time from appointment
  - Duration: 1 hour
  - Location: Branch address
  - Description: Confirmation number, customer info
- Send email with .ics attachment using JavaMail
- Return success confirmation

---

#### 3. Generate PDF Confirmation
```
POST /api/appointments/generate-pdf
Content-Type: application/json

Request: { appointmentId, confirmationNumber, appointmentType, branch, timeSlot, userInfo }
Response: Binary PDF file (Content-Type: application/pdf)
```

**Responsibilities:**
- Generate PDF using iText or Apache PDFBox
- Include Commerce Bank logo and green branding
- Format with:
  - Header with bank logo
  - Large confirmation number
  - Appointment details (type, date, time)
  - Branch location information
  - Customer information
  - Important notes (arrive early, bring ID, etc.)
  - Footer with contact information
- Return as downloadable file with proper headers:
  - `Content-Type: application/pdf`
  - `Content-Disposition: attachment; filename="confirmation-BNK-ABC1234.pdf"`

---

## 📦 Required Spring Boot Dependencies

```xml
<!-- Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Email -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>

<!-- PDF Generation -->
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itext7-core</artifactId>
    <version>7.2.5</version>
</dependency>

<!-- iCalendar -->
<dependency>
    <groupId>org.mnode.ical4j</groupId>
    <artifactId>ical4j</artifactId>
    <version>3.2.5</version>
</dependency>

<!-- Database (optional) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>
```

---

## 🚀 Getting Started

### Frontend Setup (Immediate)

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and set: VITE_API_BASE_URL=http://localhost:8080/api
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```

4. **Test the UI:**
   - Go through all 6 steps
   - Verify form validations work
   - Check browser console for API call attempts
   - Booking will fail until backend is ready

### Backend Setup (Next Step)

1. **Create Spring Boot project** with Web, Mail, JPA starters

2. **Add dependencies** (see above)

3. **Implement endpoints:**
   - Follow specifications in `SPRING_BOOT_API_DOCUMENTATION.md`
   - Start with `/api/appointments` POST endpoint
   - Then add email sending
   - Finally add PDF generation

4. **Configure CORS:**
   ```java
   @Configuration
   public class CorsConfig implements WebMvcConfigurer {
       @Override
       public void addCorsMappings(CorsRegistry registry) {
           registry.addMapping("/api/**")
               .allowedOrigins("http://localhost:5173")
               .allowedMethods("GET", "POST", "PUT", "DELETE")
               .allowedHeaders("*");
       }
   }
   ```

5. **Configure email** in `application.properties`:
   ```properties
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your-email@commercebank.com
   spring.mail.password=your-app-password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   ```

6. **Run Spring Boot** on port 8080

7. **Test integration:**
   - Frontend on `http://localhost:5173`
   - Backend on `http://localhost:8080`
   - Complete a full booking flow

---

## 📖 Documentation Reference

- **`QUICK_START.md`** - Quick reference guide
- **`README_SPRING_BOOT_INTEGRATION.md`** - Complete setup instructions
- **`SPRING_BOOT_API_DOCUMENTATION.md`** - Full API specifications with examples

---

## 🎨 Features Implemented

✅ 6-step appointment booking wizard  
✅ Form validation on all inputs  
✅ Visual progress indicator  
✅ Loading states during API calls  
✅ Error handling and user-friendly messages  
✅ Responsive design (mobile + desktop)  
✅ Commerce Bank green branding (#16a34a)  
✅ Mock data for branches and time slots  
✅ TypeScript type safety throughout  
✅ API service layer with error handling  
✅ Email confirmation trigger  
✅ PDF download functionality  
✅ Calendar invite (.ics) support  

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
            ┌───────▼────┐  ┌─────▼─────┐  ┌───▼────────┐
            │   Step 1   │  │  Step 2   │  │  Step 3    │
            │  Type +    │  │  Branch   │  │   Time     │
            │    ZIP     │  │ Selection │  │  Slots     │
            └────────────┘  └───────────┘  └────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
            ┌───────▼────┐  ┌─────▼─────┐  ┌───▼────────┐
            │   Step 4   │  │  Step 5   │  │  Step 6    │
            │    User    │  │  Review   │  │  Success   │
            │    Info    │  │  & Book   │  │ + Download │
            └────────────┘  └───────────┘  └────────────┘
                                  │             │
                    ┌─────────────┴─────┐       │
                    │                   │       │
            ┌───────▼────────┐  ┌───────▼───────▼──────┐
            │  Spring Boot   │  │   Spring Boot        │
            │  POST /api/    │  │   POST /api/         │
            │  appointments  │  │   send-confirmation  │
            └────────────────┘  │   generate-pdf       │
                    │           └──────────────────────┘
                    │                   │
            ┌───────▼────────┐  ┌───────▼──────────────┐
            │   Database     │  │  Email Service       │
            │   (JPA/        │  │  (JavaMail +         │
            │   PostgreSQL)  │  │   ical4j)            │
            └────────────────┘  │  PDF Service         │
                                │  (iText/PDFBox)      │
                                └──────────────────────┘
```

---

## ✨ Next Steps

1. ✅ Frontend is complete and ready
2. ⏳ Implement Spring Boot backend endpoints
3. ⏳ Test API integration
4. ⏳ Configure email service
5. ⏳ Set up PDF generation
6. ⏳ Deploy to production

---

## 🔗 Quick Links

- **Frontend runs on:** http://localhost:5173
- **Backend should run on:** http://localhost:8080
- **API base path:** /api
- **Key endpoints:** /appointments, /send-confirmation, /generate-pdf

---

**Status: Frontend Ready ✅ | Backend Pending ⏳**

Your React frontend is fully implemented and waiting for the Spring Boot backend!
