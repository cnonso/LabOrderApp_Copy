
import {
    Box, Button, TextField,
    Radio, RadioGroup, FormControl,
    FormControlLabel, Alert,
    FormLabel,
    FormGroup, Checkbox, useTheme, Typography,
    InputLabel, Select, MenuItem, FormHelperText,
  
  } from "@mui/material";
import { baseApiUrl } from '../api/index';
import axios from "axios";  
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import Avatar from "../assets/avatar3.png"
import { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

const LabOrderRecords = () => { 
    const [responseStatus, setResponseStatus] = useState("");

    const deleteData = async (id) => {
        //alert(id);
        await fetch(`${baseApiUrl}` + 'laborders/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(body),
        }).then(response => {
            setResponseStatus(response.status);
            console.log("Response 1", response.status);
            loadLabOrderRecords();
        }).catch(error => {
            console.log(error);
        })
    }

    
    const [subTitle, setSubTitle] = useState("");
    const [LabOrderRecords, setLabOrderRecords] = useState([]);
    const [newRecordUrl, setNewRecordUrl] = useState("");
    const [crID, setCrID] = useState("");
    const loadLabOrderRecords = async () => {  
        const response = await axios.get(`${baseApiUrl}laborders`);
        const data = response.data;
        setLabOrderRecords(data);
        
        console.log("Lab Order List", JSON.stringify(data)); 
    }


    useEffect(() => {
        loadLabOrderRecords();
    }, []);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center"> 
                <FormLabel sx={{ gridColumn: "span 12", marginBottom: "-50px" }}>Lab Order Records</FormLabel>
                
                <Box>
                <Link to="/create">
                        <Button
                            sx={{
                                backgroundColor: "#008000",
                                color: "#ffffff",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                        >
                            Enter New LabOrder Record
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
                {LabOrderRecords.length > 0 ? (
                    LabOrderRecords.map((item) => (

                        <Paper
                            key={item.LabID}
                            sx={{
                                gridColumn: "span 8",
                                p: 2,
                                margin: 'auto',
                                maxWidth: 500,
                                flexGrow: 1,
                                backgroundColor: '#808080',
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item >
                                    <ButtonBase sx={{ width: 56, height: 56 }}>
                                        <Link to={"/editLabOrderRecord?id=" + item.LabID}>
                                            <Img alt="avatar" src={Avatar} />
                                        </Link>
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                Details
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Date Created: <em>{item.dateCreated}</em>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Test Category <em>{item.testCategory}</em>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Test Name <em>{item.testName}</em>
                                            </Typography>
                                            <Typography variant="body2">
                                                Status <em>{item.status}</em>
                                            </Typography> 
                                        </Grid>
                                        {/* <Grid item>
                                            <Link to={"/editLabOrderRecord?id=" + item.recordID + "&crID=" + crID}>
                                            
                                                <Button
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: "#008000",
                                                        color: "#ffffff", ml: "5px"
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </Link> 
                                        </Grid> */}
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div" >
                                            {item.fever}
                                        </Typography>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                )
                    :
                    (<Paper
                        sx={{
                            gridColumn: "span 24",
                            p: 2,
                            marginTop: '50px',
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1F2A40' : '#fff',
                        }}
                    >

                        <Typography variant="body2" gutterBottom sx={{ textAlign: 'center' }}>
                            No LabOrder Record exists.
                        </Typography>
                    </Paper>
                    )}
            </Box>
        </Box>
    );
};

export default LabOrderRecords;
