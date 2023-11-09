package com.example.laborderapp.Models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "LabOrders")
public class LabOrder {
    @Column(name = "LabID")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long LabID;
    @Column(name = "TestCategory")
    private String testCategory;
    @Column(name = "TestName")
    private String testName;
    @Column(name = "DateCreated")
    private LocalDate dateCreated;
    @Column(name = "Status")
    private String status;

    public LabOrder(){

    }
    public LabOrder(String testCategory, String testName, LocalDate dateCreated,
                    String status){
        this.testCategory=testCategory;
        this.testName = testName;
        this.dateCreated = dateCreated;
        this.status = status;
    }

    public long getLabID() {
        return LabID;
    }

    public String getTestCategory() {
        return testCategory;
    }

    public String getTestName() {
        return testName;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public String getStatus() {
        return status;
    }

    public void setTestCategory(String testCategory) {
        this.testCategory = testCategory;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
