# Spring Boot REST API Documentation

This document describes the REST API endpoints that your Spring Boot backend needs to implement to work with the Commerce Bank Appointment Booking frontend.

## Base URL
```
Development: http://localhost:8080/api
Production: https://your-domain.com/api
```

## API Endpoints

### 1. Book Appointment

**Endpoint:** `POST /api/appointments`

**Description:** Creates a new appointment booking and returns the confirmation details.

**Request Body:**
```json
{
  "appointmentType": "Loan Consultation",
  "branch": {
    "id": "1",
    "name": "Downtown Financial Center",
    "address": "1200 Main Street",
    "city": "Kansas City",
    "state": "MO",
    "zip": "64105",
    "phone": "(816) 555-4567",
    "distance": "0.5 miles"
  },
  "timeSlot": {
    "date": "2026-03-25",
    "time": "10:00 AM",
    "available": true
  },
  "userInfo": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "(555) 123-4567"
  }
}
```

**Response (201 Created):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "confirmationNumber": "BNK-ABC1234",
  "appointmentType": "Loan Consultation",
  "branch": {
    "id": "1",
    "name": "Downtown Financial Center",
    "address": "1200 Main Street",
    "city": "Kansas City",
    "state": "MO",
    "zip": "64105",
    "phone": "(816) 555-4567",
    "distance": "0.5 miles"
  },
  "timeSlot": {
    "date": "2026-03-25",
    "time": "10:00 AM",
    "available": true
  },
  "userInfo": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "(555) 123-4567"
  },
  "createdAt": "2026-03-18T10:30:00Z",
  "status": "CONFIRMED"
}
```

**Java Entity Example:**
```java
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    private String confirmationNumber;
    private String appointmentType;
    
    @Embedded
    private Branch branch;
    
    @Embedded
    private TimeSlot timeSlot;
    
    @Embedded
    private UserInfo userInfo;
    
    private LocalDateTime createdAt;
    
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
    
    // Getters and setters
}
```

---

### 2. Send Confirmation Email

**Endpoint:** `POST /api/appointments/send-confirmation`

**Description:** Sends a confirmation email to the customer with appointment details and an iCalendar (.ics) file attachment.

**Request Body:**
```json
{
  "appointmentId": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john.doe@example.com",
  "confirmationNumber": "BNK-ABC1234",
  "appointmentType": "Loan Consultation",
  "branch": {
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

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Confirmation email sent successfully",
  "emailId": "msg_abc123xyz"
}
```

**Implementation Requirements:**
- Use JavaMail API or Spring Mail
- Generate HTML email template with Commerce Bank branding
- Create iCalendar (.ics) file with event details:
  - Event title: "Commerce Bank - [Appointment Type]"
  - Start time: Combine date and time from timeSlot
  - Duration: 1 hour
  - Location: Branch full address
  - Description: Include confirmation number and customer info
- Attach .ics file to email
- Include appointment details in email body

**Java Service Example:**
```java
@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public EmailResponse sendConfirmationEmail(EmailRequest request) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        // Set email properties
        helper.setTo(request.getEmail());
        helper.setSubject("Appointment Confirmation - " + request.getConfirmationNumber());
        helper.setText(buildEmailTemplate(request), true);
        
        // Generate and attach calendar file
        byte[] icsFile = generateCalendarInvite(request);
        helper.addAttachment("appointment.ics", new ByteArrayResource(icsFile));
        
        mailSender.send(message);
        
        return new EmailResponse(true, "Email sent successfully", generateEmailId());
    }
    
    private byte[] generateCalendarInvite(EmailRequest request) {
        // Use iCal4j or similar library to generate .ics file
        // Include: VEVENT with DTSTART, DTEND, SUMMARY, LOCATION, DESCRIPTION
        return icsContent.getBytes();
    }
}
```

---

### 3. Generate PDF Confirmation

**Endpoint:** `POST /api/appointments/generate-pdf`

**Description:** Generates a PDF appointment confirmation document and returns it as a downloadable file.

**Request Body:**
```json
{
  "appointmentId": "123e4567-e89b-12d3-a456-426614174000",
  "confirmationNumber": "BNK-ABC1234",
  "appointmentType": "Loan Consultation",
  "branch": {
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

**Response (200 OK):**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="appointment-confirmation-BNK-ABC1234.pdf"`
- Binary PDF file data

**Implementation Requirements:**
- Use iText, Apache PDFBox, or Flying Saucer library
- Include Commerce Bank logo and branding (green color scheme)
- PDF should contain:
  - Bank header with logo
  - "Appointment Confirmation" title
  - Confirmation number (large, prominent)
  - Appointment details table:
    - Type
    - Date
    - Time
    - Duration (1 hour)
  - Branch information:
    - Name
    - Full address
    - Phone number
  - Customer information:
    - Name
    - Email
    - Phone
  - Important notes section:
    - Arrive 5 minutes early
    - Bring valid ID
    - Contact information for rescheduling
  - QR code (optional) linking to appointment details
  - Footer with bank contact information

**Java Service Example:**
```java
@Service
public class PdfService {
    
    public byte[] generateAppointmentPdf(PDFRequest request) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        // Using iText as example
        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);
        
        // Add bank logo
        // Image logo = new Image(ImageDataFactory.create("path/to/logo.png"));
        // document.add(logo);
        
        // Add title
        Paragraph title = new Paragraph("Appointment Confirmation")
            .setFontSize(24)
            .setBold()
            .setFontColor(ColorConstants.GREEN);
        document.add(title);
        
        // Add confirmation number
        Paragraph confirmationNum = new Paragraph(request.getConfirmationNumber())
            .setFontSize(20)
            .setFontColor(ColorConstants.GREEN);
        document.add(confirmationNum);
        
        // Add appointment details table
        Table table = new Table(2);
        table.addCell("Appointment Type");
        table.addCell(request.getAppointmentType());
        table.addCell("Date");
        table.addCell(request.getTimeSlot().getDate());
        table.addCell("Time");
        table.addCell(request.getTimeSlot().getTime());
        // Add more rows...
        
        document.add(table);
        
        document.close();
        
        return outputStream.toByteArray();
    }
}
```

**Controller Example:**
```java
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    
    @Autowired
    private PdfService pdfService;
    
    @PostMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody PDFRequest request) {
        byte[] pdfBytes = pdfService.generateAppointmentPdf(request);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(
            ContentDisposition.attachment()
                .filename("appointment-confirmation-" + request.getConfirmationNumber() + ".pdf")
                .build()
        );
        
        return ResponseEntity.ok()
            .headers(headers)
            .body(pdfBytes);
    }
}
```

---

### 4. Get Appointment by ID (Optional)

**Endpoint:** `GET /api/appointments/{id}`

**Description:** Retrieves appointment details by ID.

**Response (200 OK):**
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

---

### 5. Cancel Appointment (Optional)

**Endpoint:** `DELETE /api/appointments/{id}`

**Description:** Cancels an existing appointment.

**Response (204 No Content)**

---

## CORS Configuration

Your Spring Boot application must enable CORS to allow the React frontend to make requests:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173", "https://your-frontend-domain.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

## Required Dependencies (Maven)

```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Mail -->
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
    
    <!-- iCalendar Generation -->
    <dependency>
        <groupId>org.mnode.ical4j</groupId>
        <artifactId>ical4j</artifactId>
        <version>3.2.5</version>
    </dependency>
    
    <!-- JPA (if using database) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
</dependencies>
```

## Application Properties

```properties
# Server Configuration
server.port=8080

# Email Configuration (Gmail example)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@commercebank.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Database Configuration (if using JPA)
spring.datasource.url=jdbc:postgresql://localhost:5432/commerce_bank
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update
```

## Error Handling

All endpoints should return appropriate error responses:

**400 Bad Request:**
```json
{
  "timestamp": "2026-03-18T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid appointment data provided",
  "path": "/api/appointments"
}
```

**500 Internal Server Error:**
```json
{
  "timestamp": "2026-03-18T10:30:00Z",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Failed to send confirmation email",
  "path": "/api/appointments/send-confirmation"
}
```

## Testing

Use tools like Postman or curl to test your endpoints before connecting the frontend:

```bash
# Book appointment
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -d '{ "appointmentType": "Loan Consultation", ... }'

# Generate PDF
curl -X POST http://localhost:8080/api/appointments/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{ "appointmentId": "123...", ... }' \
  --output confirmation.pdf
```
