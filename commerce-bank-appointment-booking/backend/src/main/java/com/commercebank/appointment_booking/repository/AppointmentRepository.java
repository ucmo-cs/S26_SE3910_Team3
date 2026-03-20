package com.commercebank.appointment_booking.repository;

import com.commercebank.appointment_booking.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    @Query("SELECT a FROM Appointment a WHERE a.branch.id = :branchId AND a.timeSlot.date = :date AND a.status = 'CONFIRMED'")
    List<Appointment> findByBranchIdAndDate(
            @Param("branchId") String branchId,
            @Param("date") String date
    );
}