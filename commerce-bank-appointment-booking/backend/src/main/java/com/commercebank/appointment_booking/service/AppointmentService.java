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