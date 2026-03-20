# Quick Start Guide - Commerce Bank Appointment Booking

## ✅ What's Been Done

Your React frontend is now **fully configured** to work with Spring Boot REST APIs:

### Created Files:
1. **`/src/services/api.config.ts`** - API configuration and endpoints
2. **`/src/services/appointmentService.ts`** - Appointment booking API calls
3. **`/src/services/emailService.ts`** - Email sending API calls
4. **`/src/services/pdfService.ts`** - PDF generation API calls
5. **`.env.example`** - Environment variables template
6. **`SPRING_BOOT_API_DOCUMENTATION.md`** - Complete API specifications
7. **`README_SPRING_BOOT_INTEGRATION.md`** - Detailed setup guide

### Updated Components:
- **`ConfirmationStep.tsx`** - Now calls Spring Boot API to book appointment and send email
- **`SuccessStep.tsx`** - Now calls Spring Boot API to generate/download PDF
- **`App.tsx`** - Updated to handle appointment response data

## 🚀 How to Run (Frontend Only)

1. **Install dependencies:**
   ```bash
   pnpm install
   # or npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Start the dev server:**
   ```bash
   pnpm dev
   # or npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

⚠️ **Note:** The booking will fail until you implement the Spring Boot backend APIs!

## 🔧 What You Need to Do Next

### Step 1: Set Up Spring Boot Backend

Create a Spring Boot project with these endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/appointments` | POST | Book appointment |
| `/api/appointments/send-confirmation` | POST | Send email with .ics |
| `/api/appointments/generate-pdf` | POST | Generate PDF |

**📖 See `SPRING_BOOT_API_DOCUMENTATION.md` for complete specifications**

### Step 2: Configure CORS

Add this to your Spring Boot application:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*");
    }
}
```

### Step 3: Test Connection

Once Spring Boot is running on port 8080, test the connection:

```bash
# From your frontend, the calls will look like:
# POST http://localhost:8080/api/appointments
# POST http://localhost:8080/api/appointments/send-confirmation
# POST http://localhost:8080/api/appointments/generate-pdf
```

## 📦 Required Spring Boot Dependencies

Add to your `pom.xml`:

```xml
<!-- Spring Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Mail -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>

<!-- PDF Generation (iText) -->
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itext7-core</artifactId>
    <version>7.2.5</version>
</dependency>

<!-- iCalendar (ical4j) -->
<dependency>
    <groupId>org.mnode.ical4j</groupId>
    <artifactId>ical4j</artifactId>
    <version>3.2.5</version>
</dependency>
```

## 🎯 API Flow Summary

### When user clicks "Confirm Appointment":
```
Frontend → POST /api/appointments
         ← Returns: { id, confirmationNumber, ...appointment data }
         
Frontend → POST /api/appointments/send-confirmation
         ← Returns: { success: true, message: "Email sent" }
         
Frontend → Navigate to success page
```

### When user clicks "Download Confirmation":
```
Frontend → POST /api/appointments/generate-pdf
         ← Returns: PDF file (application/pdf)
         
Frontend → Automatically downloads PDF to user's computer
```

## 📝 API Request Examples

### 1. Book Appointment
```json
POST http://localhost:8080/api/appointments

{
  "appointmentType": "Loan Consultation",
  "branch": {
    "id": "1",
    "name": "Downtown Financial Center",
    "address": "1200 Main Street",
    "city": "Kansas City",
    "state": "MO",
    "zip": "64105",
    "phone": "(816) 555-4567"
  },
  "timeSlot": {
    "date": "2026-03-25",
    "time": "10:00 AM"
  },
  "userInfo": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "(555) 123-4567"
  }
}
```

**Expected Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "confirmationNumber": "BNK-ABC1234",
  "appointmentType": "Loan Consultation",
  "branch": { ... },
  "timeSlot": { ... },
  "userInfo": { ... },
  "createdAt": "2026-03-18T10:30:00Z",
  "status": "CONFIRMED"
}
```

## 🧪 Testing Without Backend

If your Spring Boot backend isn't ready, you can:

1. **Use mock server** (see `README_SPRING_BOOT_INTEGRATION.md`)
2. **Test UI flow** - All steps work except the final booking
3. **Check browser console** - You'll see API call attempts with full request data

## 📂 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx                      # Main app with state management
│   │   └── components/
│   │       ├── AppointmentTypeStep.tsx  # Step 1
│   │       ├── BranchSelectionStep.tsx  # Step 2
│   │       ├── TimeSlotStep.tsx         # Step 3
│   │       ├── UserInfoStep.tsx         # Step 4
│   │       ├── ConfirmationStep.tsx     # Step 5 (calls booking API)
│   │       └── SuccessStep.tsx          # Step 6 (calls PDF API)
│   └── services/
│       ├── api.config.ts                # API URL and endpoints
│       ├── appointmentService.ts        # Booking API functions
│       ├── emailService.ts              # Email API functions
│       └── pdfService.ts                # PDF API functions
└── .env                                 # API URL configuration
```

## 🔗 Important Files

- **API Documentation:** `SPRING_BOOT_API_DOCUMENTATION.md`
- **Setup Guide:** `README_SPRING_BOOT_INTEGRATION.md`
- **Environment Variables:** `.env.example`

## ⚡ Common Issues

### Issue: CORS Error
**Solution:** Enable CORS in Spring Boot (see Step 2 above)

### Issue: "Failed to fetch"
**Solution:** Make sure Spring Boot is running on `http://localhost:8080`

### Issue: API calls return 404
**Solution:** Check that your Spring Boot endpoints match `/api/appointments`, etc.

## ✨ Features

✅ Multi-step appointment wizard (6 steps)  
✅ Form validation on all inputs  
✅ Progress indicator  
✅ Loading states during API calls  
✅ Error handling and display  
✅ Responsive design (mobile + desktop)  
✅ Commerce Bank green branding  
✅ PDF download functionality  
✅ Email with calendar invite (.ics) functionality  

## 📞 Need Help?

1. **Frontend Issues:** Check component files in `/src/app/components/`
2. **API Issues:** Review `SPRING_BOOT_API_DOCUMENTATION.md`
3. **Setup Issues:** Read `README_SPRING_BOOT_INTEGRATION.md`
4. **CORS Issues:** Verify CORS configuration in Spring Boot

---

**Your frontend is ready! Now implement the Spring Boot backend to complete the system.** 🚀
