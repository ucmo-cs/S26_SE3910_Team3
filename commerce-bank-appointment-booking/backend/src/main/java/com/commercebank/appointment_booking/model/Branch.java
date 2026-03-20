package com.commercebank.appointment_booking.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Branch {
    @Column(name = "branch_id")
    private String id;
    @Column(name = "branch_name")
    private String name;
    @Column(name = "branch_address")
    private String address;
    @Column(name = "branch_city")
    private String city;
    @Column(name = "branch_state")
    private String state;
    @Column(name = "branch_zip")
    private String zip;
    @Column(name = "branch_phone")
    private String phone;
    @Column(name = "branch_distance")
    private String distance;
    @Column(name = "branch_lat")
    private Double lat;
    @Column(name = "branch_lng")
    private Double lng;

    public Branch() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDistance() { return distance; }
    public void setDistance(String distance) { this.distance = distance; }
    public Double getLat() { return lat; }
    public void setLat(Double lat) { this.lat = lat; }
    public Double getLng() { return lng; }
    public void setLng(Double lng) { this.lng = lng; }
}