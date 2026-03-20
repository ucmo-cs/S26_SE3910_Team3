package com.commercebank.appointment_booking.service;

import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Service
public class DistanceService {

    private static class Coordinates {
        double lat, lng;
        Coordinates(double lat, double lng) {
            this.lat = lat;
            this.lng = lng;
        }
    }

    private final Map<String, Coordinates> zipCoordinates = new HashMap<>();

    // Kansas City center coordinates
    private static final double KC_LAT = 39.0997;
    private static final double KC_LNG = -94.5786;
    private static final double MAX_RADIUS_MILES = 100.0;

    @PostConstruct
    public void loadZipCodes() {
        try {
            ClassPathResource resource = new ClassPathResource("uszips.csv");
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream())
            );

            String line;
            boolean firstLine = true;
            int zipCol = -1, latCol = -1, lngCol = -1, stateCol = -1;

            while ((line = reader.readLine()) != null) {
                // Parse header row to find column indexes
                if (firstLine) {
                    String[] headers = line.split(",");
                    for (int i = 0; i < headers.length; i++) {
                        String h = headers[i].replace("\"", "").trim().toLowerCase();
                        if (h.equals("zip"))       zipCol   = i;
                        if (h.equals("lat"))       latCol   = i;
                        if (h.equals("lng"))       lngCol   = i;
                        if (h.equals("state_id"))  stateCol = i;
                    }
                    firstLine = false;
                    continue;
                }

                String[] cols = line.split(",");
                if (cols.length <= Math.max(zipCol, Math.max(latCol, lngCol))) continue;

                try {
                    String zip   = cols[zipCol].replace("\"", "").trim();
                    String state = stateCol >= 0 ? cols[stateCol].replace("\"", "").trim() : "";
                    double lat   = Double.parseDouble(cols[latCol].replace("\"", "").trim());
                    double lng   = Double.parseDouble(cols[lngCol].replace("\"", "").trim());

                    // Only load MO and KS ZIP codes within 100 miles of Kansas City
                    if ((state.equals("MO") || state.equals("KS"))) {
                        double distance = haversineDistance(
                                new Coordinates(KC_LAT, KC_LNG),
                                new Coordinates(lat, lng)
                        );
                        if (distance <= MAX_RADIUS_MILES) {
                            zipCoordinates.put(zip, new Coordinates(lat, lng));
                        }
                    }
                } catch (NumberFormatException e) {
                    // Skip malformed rows
                }
            }

            reader.close();
            System.out.println("✅ Loaded " + zipCoordinates.size()
                    + " ZIP codes within " + MAX_RADIUS_MILES
                    + " miles of Kansas City");

        } catch (Exception e) {
            System.err.println("❌ Failed to load ZIP code CSV: " + e.getMessage());
        }
    }

    public String calculateDistance(String fromZip, String toZip) {
        Coordinates from = zipCoordinates.get(fromZip);
        Coordinates to   = zipCoordinates.get(toZip);

        if (from == null || to == null) {
            return "~5-10 miles";
        }

        double distance = haversineDistance(from, to);
        return String.format("%.1f miles", distance);
    }

    public boolean isZipSupported(String zip) {
        return zipCoordinates.containsKey(zip);
    }

    private double haversineDistance(Coordinates from, Coordinates to) {
        final double R = 3959; // Earth's radius in miles
        double dLat = Math.toRadians(to.lat - from.lat);
        double dLon = Math.toRadians(to.lng - from.lng);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(from.lat)) *
                        Math.cos(Math.toRadians(to.lat)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}