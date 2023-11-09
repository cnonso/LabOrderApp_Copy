package com.example.laborderapp.Controllers;

import com.example.laborderapp.Models.LabOrder;
import com.example.laborderapp.Repositories.LabOrderRepository;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
@RestController
@RequestMapping("/api")
public class LabOrderController {

    @Autowired
    LabOrderRepository repository;
    @GetMapping("/laborders")
    public ResponseEntity<List<LabOrder>> getAllLabOrders(@RequestParam(required = false) String name) {


        try {
            List<LabOrder> labOrders = new ArrayList<>();

            if (name == null){
                List<LabOrder> all= repository.findAll();
                labOrders.addAll(all);
            }
            if (labOrders.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(labOrders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void ConvertToJsonString(LabOrder labOrder){
        Gson gson = new Gson();
        String json = gson.toJson(labOrder);
    }
    @GetMapping("/laborders/{id}")
    public ResponseEntity<LabOrder> getLabOrderById(@PathVariable("id") long id) {
        Optional<LabOrder> labOrderData = repository.findById(id);

        if (labOrderData.isPresent()) {
            return new ResponseEntity<>(labOrderData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/laborders")
    public ResponseEntity<LabOrder> createEmployee(@RequestBody LabOrder labOrder) {

        try {
                LabOrder _labOrder = repository
                        .save(new LabOrder(labOrder.getTestCategory(),
                                labOrder.getTestName(), labOrder.getDateCreated(), labOrder.getStatus()));
                return new ResponseEntity<>(_labOrder, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/laborders/{id}")
    public ResponseEntity<LabOrder> updateLabOrder(@PathVariable("id") long id, @RequestBody LabOrder labOrder) {
         Optional<LabOrder> labOrderData = repository.findById(id);

        if (labOrderData.isPresent()) {
            LabOrder _labOrder = labOrderData.get();
            _labOrder.setTestCategory(labOrder.getTestCategory());
            _labOrder.setTestName(labOrder.getTestName());
            _labOrder.setDateCreated(labOrder.getDateCreated());
            _labOrder.setStatus(labOrder.getStatus());
            return new ResponseEntity<>(repository.save(_labOrder), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/laborders/{id}")
    public ResponseEntity<HttpStatus> deleteLabOrder(@PathVariable("id") long id) {
        try {
            repository.deleteById(id);
            //repository.deleteByEmployeeId(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/laborders")
    public ResponseEntity<HttpStatus> deleteAllLabOrders() {
        try {
            repository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
