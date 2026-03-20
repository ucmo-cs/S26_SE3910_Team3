package com.commercebank.appointment_booking.dto;

import java.util.List;

public class BranchDTO {
    private String id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String phone;
    private String distance;
    private Double lat;
    private Double lng;
    private List<String> availableServices;

    public BranchDTO() {}

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
    public List<String> getAvailableServices() { return availableServices; }
    public void setAvailableServices(List<String> availableServices) { this.availableServices = availableServices; }
}