package com.commercebank.appointment_booking.service;

import com.commercebank.appointment_booking.dto.BranchDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BranchService {

    @Autowired
    private DistanceService distanceService;

    private static final List<String> FULL_SERVICES = Arrays.asList(
            "New Account Opening",
            "Loan Consultation",
            "Mortgage Discussion",
            "Financial Planning",
            "Credit Card Application",
            "Investment Services",
            "Business Banking",
            "General Inquiry"
    );

    private static final List<String> LIMITED_SERVICES_1 = Arrays.asList(
            "New Account Opening",
            "Loan Consultation",
            "Credit Card Application",
            "General Inquiry"
    );

    private static final List<String> LIMITED_SERVICES_2 = Arrays.asList(
            "New Account Opening",
            "Credit Card Application",
            "General Inquiry"
    );

    private static final List<String> OLATHE_SERVICES = Arrays.asList(
            "New Account Opening",
            "Loan Consultation",
            "Mortgage Discussion",
            "Credit Card Application",
            "Business Banking",
            "General Inquiry"
    );

    private final List<BranchDTO> allBranches = Arrays.asList(
            createBranch("1", "Commerce Bank - Main Street",
                    "1000 Walnut Street", "Kansas City", "MO", "64106",
                    "(816) 234-2000", 39.1034, -94.5688, FULL_SERVICES),

            createBranch("2", "Commerce Bank - Country Club Plaza",
                    "4600 J C Nichols Parkway", "Kansas City", "MO", "64112",
                    "(816) 360-2265", 39.0412, -94.5937, FULL_SERVICES),

            createBranch("3", "Commerce Bank - Zona Rosa",
                    "8640 N Dixson Avenue", "Kansas City", "MO", "64153",
                    "(816) 407-3272", 39.2211, -94.6419, LIMITED_SERVICES_1),

            createBranch("4", "Commerce Bank - Overland Park",
                    "11935 Metcalf Avenue", "Overland Park", "KS", "66213",
                    "(913) 338-3133", 38.8947, -94.6486, FULL_SERVICES),

            createBranch("5", "Commerce Bank - Independence",
                    "19200 E Valley View Parkway", "Independence", "MO", "64055",
                    "(816) 478-5219", 39.0686, -94.3644, LIMITED_SERVICES_1),

            createBranch("6", "Commerce Bank - Lee's Summit",
                    "816 SE Oldham Parkway", "Lee's Summit", "MO", "64081",
                    "(816) 246-7440", 38.9108, -94.3822, LIMITED_SERVICES_2),

            createBranch("7", "Commerce Bank - Olathe",
                    "15925 S Bradley Drive", "Olathe", "KS", "66062",
                    "(913) 764-6688", 38.8747, -94.7403, OLATHE_SERVICES),

            createBranch("8", "Commerce Bank - Liberty",
                    "8480 N Church Road", "Kansas City", "MO", "64158",
                    "(816) 407-5006", 39.3117, -94.5194, LIMITED_SERVICES_2)
    );

    public List<BranchDTO> findBranchesByZip(String zipCode) {
        return allBranches.stream()
                .map(branch -> {
                    BranchDTO dto = copyBranch(branch);
                    dto.setDistance(distanceService.calculateDistance(zipCode, branch.getZip()));
                    return dto;
                })
                .sorted((a, b) -> {
                    double distA = parseDistance(a.getDistance());
                    double distB = parseDistance(b.getDistance());
                    return Double.compare(distA, distB);
                })
                .collect(Collectors.toList());
    }

    private double parseDistance(String distance) {
        try {
            return Double.parseDouble(distance.replace(" miles", "").trim());
        } catch (Exception e) {
            return 999.0;
        }
    }

    private BranchDTO createBranch(String id, String name, String address,
                                   String city, String state, String zip, String phone,
                                   double lat, double lng, List<String> services) {
        BranchDTO branch = new BranchDTO();
        branch.setId(id);
        branch.setName(name);
        branch.setAddress(address);
        branch.setCity(city);
        branch.setState(state);
        branch.setZip(zip);
        branch.setPhone(phone);
        branch.setLat(lat);
        branch.setLng(lng);
        branch.setAvailableServices(services);
        return branch;
    }

    private BranchDTO copyBranch(BranchDTO original) {
        return createBranch(
                original.getId(), original.getName(), original.getAddress(),
                original.getCity(), original.getState(), original.getZip(),
                original.getPhone(), original.getLat(), original.getLng(),
                original.getAvailableServices()
        );
    }
}