# Commerce Bank Appointment Booking - Spring Boot Integration Guide

This React frontend is now configured to work with a Spring Boot REST API backend. All Supabase dependencies have been removed in favor of direct Spring Boot integration.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────┐
│  React Frontend (Vite)              │
│  - Appointment booking flow         │
│  - API service layer                │
│  - Email & PDF triggering           │
└──────────────┬──────────────────────┘
               │
               │ HTTP/REST
               │
┌──────────────▼──────────────────────┐
│  Spring Boot Backend                │
│  - Appointment management           │
│  - Email service (JavaMail)         │
│  - PDF generation (iText/PDFBox)    │
│  - iCalendar (.ics) generation      │
│  - Database persistence (JPA)       │
└─────────────────────────────────────┘
```

## 📁 Project Structure

```
commerce-bank-frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main application
│   │   └── components/
│   │       ├── AppointmentTypeStep.tsx      # Step 1: Type & ZIP
│   │       ├── BranchSelectionStep.tsx      # Step 2: Branch selection
│   │       ├── TimeSlotStep.tsx             # Step 3: Time selection
│   │       ├── UserInfoStep.tsx             # Step 4: Contact info
│   │       ├── ConfirmationStep.tsx         # Step 5: Review & book
│   │       └── SuccessStep.tsx              # Step 6: Confirmation
│   └── services/
│       ├── api.config.ts                    # API configuration
│       ├── appointmentService.ts            # Appointment API calls
│       ├── emailService.ts                  # Email API calls
│       └── pdfService.ts                    # PDF generation calls
├── .env.example                             # Environment variables template
├── SPRING_BOOT_API_DOCUMENTATION.md         # Complete API specification
└── README_SPRING_BOOT_INTEGRATION.md        # This file
```

## 🚀 Frontend Setup

### 1. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install

# OR using yarn
yarn install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and set your Spring Boot API URL:

```env
# Development (Spring Boot running locally)
VITE_API_BASE_URL=http://localhost:8080/api

# Production
# VITE_API_BASE_URL=https://api.commercebank.com/api
```

### 3. Run the Development Server

```bash
# Using pnpm
pnpm dev

# OR using npm
npm run dev

# OR using yarn
yarn dev
```

The frontend will be available at: `http://localhost:5173`

## 🔧 Spring Boot Backend Setup

### Required Endpoints

Your Spring Boot application must implement these REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Book a new appointment |
| POST | `/api/appointments/send-confirmation` | Send confirmation email with .ics |
| POST | `/api/appointments/generate-pdf` | Generate PDF confirmation |
| GET | `/api/appointments/{id}` | Get appointment by ID (optional) |
| DELETE | `/api/appointments/{id}` | Cancel appointment (optional) |

**See `SPRING_BOOT_API_DOCUMENTATION.md` for complete API specifications.**

### Required Dependencies (Maven)

```xml
<dependencies>
    <!-- Spring Boot -->
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
    
    <!-- Database -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
</dependencies>
```

### CORS Configuration

Your Spring Boot application **must** enable CORS:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173") // Frontend URL
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

## 🔄 API Integration Flow

### 1. Booking Flow

When a user clicks "Confirm Appointment" on Step 5:

```typescript
// ConfirmationStep.tsx
const handleConfirmAppointment = async () => {
  // 1. Create appointment in database
  const appointment = await bookAppointment({
    appointmentType,
    branch,
    timeSlot,
    userInfo
  });
  
  // 2. Send confirmation email with calendar invite
  await sendConfirmationEmail({
    appointmentId: appointment.id,
    email: userInfo.email,
    confirmationNumber: appointment.confirmationNumber,
    // ... other details
  });
  
  // 3. Navigate to success page
  onConfirm(appointment);
};
```

### 2. PDF Download Flow

When a user clicks "Download Confirmation" on Step 6:

```typescript
// SuccessStep.tsx
const handleDownloadPDF = async () => {
  await generatePDF({
    appointmentId,
    confirmationNumber,
    appointmentType,
    branch,
    timeSlot,
    userInfo
  });
  // PDF automatically downloads
};
```

## 🧪 Testing

### Test with Mock Server

If your Spring Boot backend isn't ready yet, you can create a mock server:

```javascript
// mock-server.cjs
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/appointments', (req, res) => {
  res.status(201).json({
    id: '123e4567-e89b-12d3-a456-426614174000',
    confirmationNumber: 'BNK-' + Math.random().toString(36).substring(7).toUpperCase(),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'CONFIRMED'
  });
});

app.post('/api/appointments/send-confirmation', (req, res) => {
  res.json({
    success: true,
    message: 'Email sent successfully',
    emailId: 'msg_' + Math.random().toString(36).substring(7)
  });
});

app.post('/api/appointments/generate-pdf', (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="confirmation-${req.body.confirmationNumber}.pdf"`);
  res.send(Buffer.from('Mock PDF content'));
});

app.listen(8080, () => console.log('Mock server running on http://localhost:8080'));
```

Run it:
```bash
node mock-server.cjs
```

### Manual API Testing

Use Postman or curl to test your Spring Boot endpoints:

```bash
# Test appointment booking
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

## 🐛 Troubleshooting

### CORS Errors

**Problem:** Browser shows CORS policy error

**Solution:**
- Ensure CORS is properly configured in Spring Boot
- Check that the frontend URL matches the allowed origin
- Verify Spring Boot is running on the expected port

### Network Errors

**Problem:** Frontend shows "Failed to fetch" or connection errors

**Solution:**
- Verify Spring Boot backend is running: `curl http://localhost:8080/api/health`
- Check `.env` file has correct `VITE_API_BASE_URL`
- Ensure no firewall blocking port 8080

### Email Not Sending

**Problem:** Appointment books but no email received

**Solution:**
- Check Spring Boot application.properties for correct SMTP settings
- Verify email credentials are valid
- Check spam/junk folder
- Review Spring Boot logs for email errors

### PDF Not Downloading

**Problem:** PDF download button doesn't work

**Solution:**
- Check browser console for errors
- Verify Spring Boot endpoint returns `Content-Type: application/pdf`
- Check `Content-Disposition` header is set correctly
- Ensure iText/PDFBox dependencies are in Spring Boot classpath

## 📊 Features Implemented

### Frontend Features
- ✅ Multi-step appointment booking wizard
- ✅ Form validation on all inputs
- ✅ Progress indicator showing current step
- ✅ Loading states during API calls
- ✅ Error handling and display
- ✅ Responsive design (mobile + desktop)
- ✅ Commerce Bank green branding
- ✅ API service layer with TypeScript types
- ✅ PDF download trigger
- ✅ Email confirmation trigger

### Backend Requirements (Spring Boot)
- ⏳ Appointment booking endpoint
- ⏳ Email service with JavaMail
- ⏳ iCalendar (.ics) generation
- ⏳ PDF generation with iText/PDFBox
- ⏳ Database persistence (JPA)
- ⏳ CORS configuration
- ⏳ Error handling

## 📝 Next Steps

1. **Backend Development:**
   - Implement the 3 required REST endpoints in Spring Boot
   - Follow specifications in `SPRING_BOOT_API_DOCUMENTATION.md`
   - Set up email configuration in application.properties
   - Add PDF generation service

2. **Testing:**
   - Test each endpoint individually with Postman
   - Connect frontend and test full flow
   - Verify email delivery with .ics attachment
   - Test PDF generation and download

3. **Deployment:**
   - Deploy Spring Boot backend to server/cloud
   - Deploy React frontend to hosting service
   - Update `.env` with production API URL
   - Configure production CORS settings

## 🔗 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [JavaMail API Guide](https://javaee.github.io/javamail/)
- [iText 7 Documentation](https://itextpdf.com/en/resources/api-documentation)
- [iCal4j Library](https://www.ical4j.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 📞 Support

For questions about:
- **Frontend:** Review component code in `/src/app/components/`
- **API Integration:** Check `/src/services/` files
- **Backend Spec:** See `SPRING_BOOT_API_DOCUMENTATION.md`
- **Environment Setup:** Review this README

---

**Built with ❤️ for Commerce Bank**
