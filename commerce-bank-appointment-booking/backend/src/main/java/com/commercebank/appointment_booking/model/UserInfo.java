package com.commercebank.appointment_booking.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class UserInfo {
    @Column(name = "user_name")
    private String name;
    @Column(name = "user_email")
    private String email;
    @Column(name = "user_phone")
    private String phone;

    public UserInfo() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}