package com.commercebank.appointment_booking.controller;

import com.commercebank.appointment_booking.dto.*;
import com.commercebank.appointment_booking.model.Appointment;
import com.commercebank.appointment_booking.service.AppointmentService;
import com.commercebank.appointment_booking.service.EmailService;
import com.commercebank.appointment_booking.service.PdfService;
import com.commercebank.appointment_booking.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.commercebank.appointment_booking.dto.BranchDTO;
import java.util.List;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private BranchService branchService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PdfService pdfService;

    @GetMapping("/branches")
    public ResponseEntity<List<BranchDTO>> getBranches(@RequestParam String zipCode) {
        List<BranchDTO> branches = branchService.findBranchesByZip(zipCode);
        return ResponseEntity.ok(branches);
    }

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentRequest request) {
        Appointment appointment = appointmentService.bookAppointment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
    }

    @PostMapping("/send-confirmation")
    public ResponseEntity<EmailResponse> sendConfirmation(@RequestBody EmailRequest request) {
        EmailResponse response = emailService.sendConfirmationEmail(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody PdfRequest request) {
        byte[] pdfBytes = pdfService.generateAppointmentPdf(request);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(
                ContentDisposition.attachment()
                        .filename("confirmation-" + request.getConfirmationNumber() + ".pdf")
                        .build()
        );

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }

    @GetMapping("/booked-slots")
    public ResponseEntity<List<String>> getBookedSlots(
            @RequestParam String branchId,
            @RequestParam String date) {
        List<String> bookedTimes = appointmentService.getBookedSlots(branchId, date);
        return ResponseEntity.ok(bookedTimes);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleValidationError(IllegalArgumentException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Bad Request");
        error.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}