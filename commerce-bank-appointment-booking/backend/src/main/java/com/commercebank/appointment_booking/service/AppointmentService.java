package com.commercebank.appointment_booking.service;

import com.commercebank.appointment_booking.dto.AppointmentRequest;
import com.commercebank.appointment_booking.model.Appointment;
import com.commercebank.appointment_booking.model.AppointmentStatus;
import com.commercebank.appointment_booking.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment bookAppointment(AppointmentRequest request) {

        validateRequest(request);

        Appointment appointment = new Appointment();
        appointment.setAppointmentType(request.getAppointmentType());
        appointment.setBranch(request.getBranch());
        appointment.setTimeSlot(request.getTimeSlot());
        appointment.setUserInfo(request.getUserInfo());
        appointment.setConfirmationNumber(generateConfirmationNumber());
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setStatus(AppointmentStatus.CONFIRMED);

        Appointment saved = appointmentRepository.save(appointment);
        System.out.println("✅ Appointment saved with ID: " + saved.getId());
        System.out.println("✅ Branch ID: " + saved.getBranch().getId());
        System.out.println("✅ Date: " + saved.getTimeSlot().getDate());
        System.out.println("✅ Time: " + saved.getTimeSlot().getTime());
        return saved;
    }

    private void validateRequest(AppointmentRequest request) {
        if (request.getUserInfo() == null) {
            throw new IllegalArgumentException("User information is required");
        }
        if (request.getUserInfo().getName() == null || request.getUserInfo().getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (request.getUserInfo().getEmail() == null || request.getUserInfo().getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (!request.getUserInfo().getEmail().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (request.getUserInfo().getPhone() == null || request.getUserInfo().getPhone().trim().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required");
        }
        if (request.getTimeSlot() == null || request.getTimeSlot().getDate() == null || request.getTimeSlot().getDate().isEmpty()) {
            throw new IllegalArgumentException("Date is required");
        }
        if (request.getTimeSlot().getTime() == null || request.getTimeSlot().getTime().isEmpty()) {
            throw new IllegalArgumentException("Time slot is required");
        }
        if (request.getBranch() == null || request.getBranch().getId() == null || request.getBranch().getId().isEmpty()) {
            throw new IllegalArgumentException("Branch is required");
        }
    }

    private String generateConfirmationNumber() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder("BNK-");
        for (int i = 0; i < 7; i++) {
            sb.append(chars.charAt((int) (Math.random() * chars.length())));
        }
        return sb.toString();
    }

    public List<String> getBookedSlots(String branchId, String date) {
        List<Appointment> appointments = appointmentRepository.findByBranchIdAndDate(branchId, date);
        return appointments.stream()
                .map(a -> a.getTimeSlot().getTime())
                .collect(java.util.stream.Collectors.toList());
    }
}