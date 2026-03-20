package com.commercebank.appointment_booking.dto;

import com.commercebank.appointment_booking.model.Branch;
import com.commercebank.appointment_booking.model.TimeSlot;
import com.commercebank.appointment_booking.model.UserInfo;

public class PdfRequest {
    private String appointmentId;
    private String confirmationNumber;
    private String appointmentType;
    private Branch branch;
    private TimeSlot timeSlot;
    private UserInfo userInfo;

    public PdfRequest() {}

    public String getAppointmentId() { return appointmentId; }
    public void setAppointmentId(String appointmentId) { this.appointmentId = appointmentId; }
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
}