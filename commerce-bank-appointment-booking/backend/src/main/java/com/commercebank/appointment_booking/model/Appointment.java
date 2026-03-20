package com.commercebank.appointment_booking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

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

    public Appointment() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getConfirmationNumber() { return confirmationNumber; }
    public void setConfirmationNumber(String confirmationNumber) { this.confirmationNumber = confirmationNumber; }
    public String getAppointmentType() { return appointmentType; }
    public void setAppointmentType(String appointmentType) { this.appointmentType = appointmentType; }
    public Branch getBranch() { return branch; }
    public void setBranch(Branch branch) { this.branch = branch; }
    public TimeSlot getTimeSlot() { return timeSlot; }
    public void setTimeSlot(TimeSlot timeSlot) { this.timeSlot = timeSlot; }
    public UserInfo getUserInfo() { return userInfo; }
    public void setUserInfo(UserInfo userInfo) { this.userInfo = userInfo; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }
}