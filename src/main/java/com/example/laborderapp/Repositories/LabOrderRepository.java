package com.example.laborderapp.Repositories;

import com.example.laborderapp.Models.LabOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LabOrderRepository extends JpaRepository<LabOrder,Long> {
    @Query(value = "SELECT * FROM LabOrders WHERE phoneNo = ?1", nativeQuery = true)
    Optional<LabOrder> findByPhoneNo(String phoneNo);

    List<LabOrder> findByTestName(String name);


    @Query(value = "SELECT CASE WHEN COUNT(d) > 0 THEN TRUE ELSE FALSE END FROM LabOrders d " +
            "WHERE d.lab_id = ?1", nativeQuery = true)
    Boolean labIDExists(long labID);
}
