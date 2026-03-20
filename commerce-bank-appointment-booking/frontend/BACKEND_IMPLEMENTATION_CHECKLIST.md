# Spring Boot Backend Implementation Checklist

Use this checklist to implement the backend for the Commerce Bank Appointment Booking system.

---

## ✅ Prerequisites

- [ ] Java 17+ installed
- [ ] Maven or Gradle installed
- [ ] IDE setup (IntelliJ IDEA, Eclipse, or VS Code)
- [ ] PostgreSQL or MySQL database running (optional, can start with H2)
- [ ] Email account configured for SMTP (Gmail, SendGrid, etc.)

---

## 📦 Step 1: Create Spring Boot Project

- [ ] Go to [start.spring.io](https://start.spring.io)
- [ ] Select dependencies:
  - [ ] Spring Web
  - [ ] Spring Data JPA
  - [ ] Spring Boot DevTools
  - [ ] PostgreSQL Driver (or H2 for testing)
  - [ ] Lombok (optional, but recommended)
- [ ] Generate and extract project
- [ ] Open in your IDE

---

## 🔧 Step 2: Add Additional Dependencies

Add to `pom.xml`:

- [ ] Spring Mail
  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-mail</artifactId>
  </dependency>
  ```

- [ ] iText 7 (PDF generation)
  ```xml
  <dependency>
      <groupId>com.itextpdf</groupId>
      <artifactId>itext7-core</artifactId>
      <version>7.2.5</version>
  </dependency>
  ```

- [ ] iCal4j (Calendar generation)
  ```xml
  <dependency>
      <groupId>org.mnode.ical4j</groupId>
      <artifactId>ical4j</artifactId>
      <version>3.2.5</version>
  </dependency>
  ```

- [ ] Run `mvn clean install` to download dependencies

---

## 🗄️ Step 3: Database Setup

### Entity Classes

- [ ] Create `Appointment.java` entity
  - [ ] `@Id` UUID id
  - [ ] String confirmationNumber
  - [ ] String appointmentType
  - [ ] `@Embedded` Branch branch
  - [ ] `@Embedded` TimeSlot timeSlot
  - [ ] `@Embedded` UserInfo userInfo
  - [ ] LocalDateTime createdAt
  - [ ] `@Enumerated` AppointmentStatus status
  - [ ] Add getters/setters (or use `@Data` from Lombok)

- [ ] Create `Branch.java` embeddable
  - [ ] `@Embeddable` annotation
  - [ ] Fields: id, name, address, city, state, zip, phone, distance

- [ ] Create `TimeSlot.java` embeddable
  - [ ] `@Embeddable` annotation
  - [ ] Fields: date (String or LocalDate), time, available

- [ ] Create `UserInfo.java` embeddable
  - [ ] `@Embeddable` annotation
  - [ ] Fields: name, email, phone

- [ ] Create `AppointmentStatus.java` enum
  - [ ] Values: CONFIRMED, PENDING, CANCELLED

### Repository

- [ ] Create `AppointmentRepository.java` interface
  - [ ] Extend `JpaRepository<Appointment, UUID>`
  - [ ] Add custom query methods if needed

### application.properties

- [ ] Configure database connection
  ```properties
  spring.datasource.url=jdbc:postgresql://localhost:5432/commerce_bank
  spring.datasource.username=your_username
  spring.datasource.password=your_password
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  ```

- [ ] Test database connection on startup

---

## 📧 Step 4: Email Configuration

### application.properties

- [ ] Add email configuration
  ```properties
  spring.mail.host=smtp.gmail.com
  spring.mail.port=587
  spring.mail.username=your-email@commercebank.com
  spring.mail.password=your-app-password
  spring.mail.properties.mail.smtp.auth=true
  spring.mail.properties.mail.smtp.starttls.enable=true
  ```

### Email Service

- [ ] Create `EmailService.java`
  - [ ] Inject `JavaMailSender`
  - [ ] Create method `sendConfirmationEmail(EmailRequest request)`
  - [ ] Generate HTML email template
  - [ ] Generate `.ics` calendar file using iCal4j
  - [ ] Attach `.ics` file to email
  - [ ] Send email
  - [ ] Return `EmailResponse`

- [ ] Create `EmailRequest.java` DTO
  - [ ] All fields from API documentation

- [ ] Create `EmailResponse.java` DTO
  - [ ] Fields: success, message, emailId

- [ ] Test email sending with a test method

---

## 📄 Step 5: PDF Generation Service

- [ ] Create `PdfService.java`
  - [ ] Create method `generateAppointmentPdf(PDFRequest request)`
  - [ ] Use iText to create PDF document
  - [ ] Add Commerce Bank branding (logo, colors)
  - [ ] Add confirmation number prominently
  - [ ] Create tables for appointment details
  - [ ] Add branch and customer information
  - [ ] Add footer with contact information
  - [ ] Return PDF as `byte[]`

- [ ] Create `PDFRequest.java` DTO
  - [ ] All fields from API documentation

- [ ] Test PDF generation and verify output

---

## 🌐 Step 6: CORS Configuration

- [ ] Create `CorsConfig.java`
  ```java
  @Configuration
  public class CorsConfig implements WebMvcConfigurer {
      
      @Override
      public void addCorsMappings(CorsRegistry registry) {
          registry.addMapping("/api/**")
              .allowedOrigins("http://localhost:5173")
              .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
              .allowedHeaders("*")
              .allowCredentials(true);
      }
  }
  ```

- [ ] Test CORS with OPTIONS request

---

## 🎯 Step 7: REST Controllers

### AppointmentController

- [ ] Create `AppointmentController.java`
  - [ ] `@RestController`
  - [ ] `@RequestMapping("/api/appointments")`
  - [ ] Inject `AppointmentService`

#### Endpoint 1: Book Appointment

- [ ] Create `POST /api/appointments` endpoint
  - [ ] `@PostMapping`
  - [ ] Accept `@RequestBody AppointmentRequest`
  - [ ] Call service to save appointment
  - [ ] Generate confirmation number (format: "BNK-XXXXXXX")
  - [ ] Return `ResponseEntity<AppointmentResponse>` with 201 status
  - [ ] Add error handling with `@ExceptionHandler`

#### Endpoint 2: Send Confirmation Email

- [ ] Create `POST /api/appointments/send-confirmation` endpoint
  - [ ] `@PostMapping("/send-confirmation")`
  - [ ] Accept `@RequestBody EmailRequest`
  - [ ] Call `EmailService.sendConfirmationEmail()`
  - [ ] Return `ResponseEntity<EmailResponse>`
  - [ ] Handle email sending errors

#### Endpoint 3: Generate PDF

- [ ] Create `POST /api/appointments/generate-pdf` endpoint
  - [ ] `@PostMapping("/generate-pdf")`
  - [ ] Accept `@RequestBody PDFRequest`
  - [ ] Call `PdfService.generateAppointmentPdf()`
  - [ ] Set headers:
    - [ ] `Content-Type: application/pdf`
    - [ ] `Content-Disposition: attachment; filename="..."`
  - [ ] Return `ResponseEntity<byte[]>`
  - [ ] Handle PDF generation errors

---

## 🧪 Step 8: Testing

### Unit Tests

- [ ] Test `AppointmentService`
  - [ ] Mock repository
  - [ ] Test appointment creation
  - [ ] Test confirmation number generation

- [ ] Test `EmailService`
  - [ ] Mock `JavaMailSender`
  - [ ] Verify email content
  - [ ] Verify `.ics` attachment

- [ ] Test `PdfService`
  - [ ] Verify PDF generation
  - [ ] Check PDF content

### Integration Tests

- [ ] Test `AppointmentController`
  - [ ] Use `MockMvc` or `RestTemplate`
  - [ ] Test POST /api/appointments
  - [ ] Test POST /api/appointments/send-confirmation
  - [ ] Test POST /api/appointments/generate-pdf
  - [ ] Verify response status codes
  - [ ] Verify response bodies

### Manual Testing with Postman

- [ ] Import endpoints into Postman
- [ ] Test booking appointment
  - [ ] Verify database record created
  - [ ] Verify confirmation number generated
- [ ] Test email sending
  - [ ] Check inbox for email
  - [ ] Verify `.ics` file attached
  - [ ] Test adding to calendar
- [ ] Test PDF generation
  - [ ] Download and open PDF
  - [ ] Verify all information present
  - [ ] Check formatting and branding

---

## 🔗 Step 9: Frontend Integration

- [ ] Start Spring Boot application
  - [ ] Verify running on `http://localhost:8080`
  - [ ] Check `/api/appointments` endpoint is accessible

- [ ] Start React frontend
  - [ ] Running on `http://localhost:5173`
  - [ ] `.env` configured with `VITE_API_BASE_URL=http://localhost:8080/api`

- [ ] Test complete flow:
  1. [ ] Fill out Step 1 (appointment type + ZIP)
  2. [ ] Select branch in Step 2
  3. [ ] Choose time slot in Step 3
  4. [ ] Enter user info in Step 4
  5. [ ] Review and click "Confirm Appointment" in Step 5
  6. [ ] **Verify:** Appointment created in database
  7. [ ] **Verify:** Email received with calendar invite
  8. [ ] Click "Download Confirmation" in Step 6
  9. [ ] **Verify:** PDF downloaded successfully
  10. [ ] Open PDF and verify all details correct

- [ ] Test error handling:
  - [ ] Stop backend and try booking
  - [ ] Verify frontend shows error message
  - [ ] Restart backend and retry

---

## 🎨 Step 10: Branding & Styling

### Email Template

- [ ] Add Commerce Bank logo
- [ ] Use green color scheme (#16a34a)
- [ ] Professional HTML formatting
- [ ] Include all appointment details
- [ ] Add call-to-action buttons (optional)

### PDF Template

- [ ] Add Commerce Bank logo to header
- [ ] Use green accents
- [ ] Professional table formatting
- [ ] Clear section headers
- [ ] Readable fonts and spacing
- [ ] Footer with contact information

---

## 📊 Step 11: Optional Enhancements

- [ ] Add appointment cancellation endpoint
  - [ ] `DELETE /api/appointments/{id}`

- [ ] Add get appointment by ID endpoint
  - [ ] `GET /api/appointments/{id}`

- [ ] Add search appointments by email
  - [ ] `GET /api/appointments?email={email}`

- [ ] Add appointment rescheduling
  - [ ] `PUT /api/appointments/{id}`

- [ ] Add SMS notifications (Twilio)
  - [ ] Send SMS confirmation

- [ ] Add QR code to PDF
  - [ ] Contains appointment link or details

- [ ] Add logging with SLF4J
  - [ ] Log all API calls
  - [ ] Log errors and exceptions

- [ ] Add metrics with Actuator
  - [ ] Monitor appointment bookings
  - [ ] Track email/PDF generation

---

## 🚀 Step 12: Deployment Preparation

- [ ] Change `application.properties` for production
  - [ ] Update database URL
  - [ ] Update CORS allowed origins to production frontend URL
  - [ ] Use environment variables for sensitive data

- [ ] Create `application-prod.properties`
  - [ ] Production database
  - [ ] Production email settings

- [ ] Build JAR file
  - [ ] `mvn clean package`
  - [ ] Test running JAR locally

- [ ] Prepare deployment
  - [ ] Choose platform (AWS, Heroku, Azure, etc.)
  - [ ] Set up CI/CD pipeline (optional)
  - [ ] Configure environment variables on server

---

## ✅ Final Checklist

Before declaring "DONE":

- [ ] All 3 REST endpoints implemented and tested
- [ ] Database saving appointments correctly
- [ ] Emails sending with calendar invites
- [ ] PDFs generating and downloading
- [ ] CORS configured and working
- [ ] Error handling in place
- [ ] Frontend successfully connects to backend
- [ ] Complete booking flow works end-to-end
- [ ] Code is clean and well-documented
- [ ] README updated with setup instructions

---

## 📝 Additional Resources

- **API Documentation:** `SPRING_BOOT_API_DOCUMENTATION.md`
- **Integration Guide:** `README_SPRING_BOOT_INTEGRATION.md`
- **Flow Diagram:** `API_FLOW_DIAGRAM.md`
- **Quick Start:** `QUICK_START.md`

---

## 🐛 Common Issues & Solutions

### Issue: CORS errors in browser
**Solution:** Verify CORS configuration includes `http://localhost:5173` and all methods

### Issue: Email not sending
**Solution:** 
- Check SMTP settings in application.properties
- For Gmail, enable "Less secure app access" or use App Password
- Check spam folder

### Issue: PDF generation fails
**Solution:**
- Verify iText dependency in pom.xml
- Check font availability on server
- Test PDF generation in isolation first

### Issue: Database connection fails
**Solution:**
- Verify PostgreSQL is running
- Check username/password in application.properties
- Ensure database exists

---

**Good luck with your implementation! 🚀**
