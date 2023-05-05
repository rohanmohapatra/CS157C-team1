import React from 'react';
import './styles.module.css';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import moment from "moment";
import data from './sample_data.json';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useEffect} from 'react';


const localizer = momentLocalizer(moment);


function DashboardPage() {

    // to store a list of event objects imported from the sample_data.json file
    const [sampleEvents, setSampleEvents] = useState([]);

    // to allow event selection and display more information as needed
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);

    // map sample data to sampleEvents
    const events = data.map((sampleEvents) => {
        return {
            title: sampleEvents.title,
            start: new Date(sampleEvents.start),
            end: new Date(sampleEvents.end)
        };
    });

    // handles the state of the dialog box when its rendered
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setOpen(true);
    }

    // handles the state of the dialog box after closing
    const handleClose = () => {
        setOpen(false);
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    useEffect(() => {
        
    })

    return (
        <Paper>
            <AppBar sx={{ position: 'sticky', boxShadow: 0 }}>
                <Toolbar>
                    <Button>FLEXI-EVENTS</Button>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                        <Stack direction='row' spacing={2} sx={{ justifyContent: 'flex-end' }}>
                            <Button>Dashboard</Button>
                            <Button>Schedule</Button>
                            <Button>Links</Button>
                            <Button>Settings</Button>
                        </Stack>
                    </div>
                </Toolbar>
            </AppBar>
            <Box sx={{ height: '70vh', p: '2%', bgcolor: '#181919' }}>
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    aria-describedby="description"
                />
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                >
                    <DialogTitle>{"dialog box"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="description">
                            This is the dialog box description. Figure out a way to show event details
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Paper>
    )
}

export default DashboardPage;