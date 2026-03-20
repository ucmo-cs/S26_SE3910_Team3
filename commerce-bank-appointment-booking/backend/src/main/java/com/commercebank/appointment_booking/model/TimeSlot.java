package com.commercebank.appointment_booking.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class TimeSlot {
    @Column(name = "slot_date")
    private String date;
    @Column(name = "slot_time")
    private String time;
    @Column(name = "slot_available")
    private boolean available;

    public TimeSlot() {}

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}