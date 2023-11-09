import { baseApiUrl } from '../api/index';
// import './App.css';
import {
  Box, Button, TextField,
  Radio, RadioGroup, FormControl,
  FormControlLabel, Alert,
  FormLabel,
  FormGroup, Checkbox, useTheme, Typography,
  InputLabel, Select, MenuItem, FormHelperText,

} from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function Create() {
  //   const baseApiUrl =  'http://localhost:8282/api/';
  const [formData, setData] = useState({});
  const [responseStatus, setResponseStatus] = useState(0);

  const handleChange = (e, name) => {
    setData({ ...formData, [name]: e.target.value })
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (formData.fullName === "" || formData.dateCreated === "" || formData.sex === "") {
      setResponseStatus(900);
      return;
    }

    let body = {
      testCategory: formData.testCategory,
      testName: formData.testName,
      dateCreated: new Date(formData.dateCreated).toISOString(),
      status: formData.status, 
    };
    console.log("Body", body);
    console.log("url", baseApiUrl);
    await fetch(`${baseApiUrl}` + 'laborders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then(response => {
      setResponseStatus(response.status);
      console.log("Response 1", response.status);
    }).catch(error => {
      console.log(error);
    })
  };

  const handleCheckBoxChange = (e, name) => {
    let isChecked = e.target.checked;
    console.log("isChecked", isChecked);
    setData({ ...formData, [name]: isChecked })
  }

  return (
    <div style={{ marginTop: "50px", marginLeft: "200px", marginRight: "200px" }}>
      <header className="App-headerr">
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(24, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: "span 24" },
          }}
        >
          {/* Duplicate Error */}
          {responseStatus === 409 ? (
            <Alert severity="error" sx={{ width: '100%', mb: "20px" }} >Unable to save record — Duplicate ID!</Alert>
          ) : null}

          {/* Error */}
          {responseStatus === 400 ? (
            <Alert severity="error" sx={{ width: '100%', mb: "20px" }} >Unable to save record — Server error!</Alert>
          ) : null}

          {/* Missing Required field(s) */}
          {responseStatus === 900 ? (
            <Alert severity="error" sx={{ width: '100%', mb: "20px" }} >Please fill all required fields!</Alert>
          ) : null}

          {/* Success */}
          {responseStatus.toString().startsWith("20") ? (
            <Alert severity="success" sx={{ width: '100%', mb: "20px" }} >
              Record saved!
              <Link to="/index">
                        <Button
                            sx={{
                                backgroundColor: "#008000",
                                color: "#ffffff",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px", marginLeft:"200px"
                            }}
                        > 
                            View Lab Order List
                        </Button>
                    </Link>
            </Alert>
          ) : null}

        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center"> 
                 
                <Box>
                <Link to="/index">
                        <Button
                            sx={{
                                backgroundColor: "#008000",
                                color: "#ffffff",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                        >
                            View Lab Order Records
                        </Button>
                    </Link>
                </Box>
            </Box> 
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(24, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: "span 24" },
          }}
        >

        <FormLabel sx={{ gridColumn: "span 12", marginBottom: "-50px" }}>Test Category</FormLabel>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Test Category"
          onChange={value => handleChange(value, 'testCategory')}
          name="testCategory"
          sx={{ gridColumn: "span 2" }}
        />

        <FormLabel sx={{ gridColumn: "span 12", marginBottom: "-50px" }}>Test Name</FormLabel>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Test Name"
          onChange={value => handleChange(value, 'testName')}
          name="testName"
          sx={{ gridColumn: "span 2" }}
        />


          <FormLabel sx={{ gridColumn: "span 12", marginBottom: "-50px" }}>Date Created</FormLabel>
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label=""
            onChange={value => handleChange(value, 'dateCreated')}
            name="dateCreated"
            sx={{ gridColumn: "span 2" }}
          />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup row
              aria-labelledby="demo-radio-buttons-group-label"
              name="status"
              onChange={value => handleChange(value, 'status')}
            >
              <FormControlLabel value="active" control={<Radio />} label="Active" />
              <FormControlLabel value="inactive" control={<Radio />} label="Inactive" /> 
            </RadioGroup>
          </FormControl>

         
          <Button fullWidth onClick={handleSubmit}
            sx={{ gridColumn: "span 24", marginBottom: "-50px" }}
            variant="contained">
            Submit
          </Button>
        </Box>

      </header>
    </div>
  );
}

export default Create;
