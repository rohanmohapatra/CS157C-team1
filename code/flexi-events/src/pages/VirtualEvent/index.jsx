import { Button, Paper, Stack, Typography } from "@mui/material";
import { useAuth } from "components/AuthProvider/AuthContext";
import SignedInLayout from "components/SignedInLayout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "services/events";
import { CreateMeetingLink } from "./CreateMeetingLink";

const VirtualEvent = () => {
  const { eventId } = useParams();
  const { getToken } = useAuth();
  const [event, setEvent] = useState({});
  useEffect(() => {
    getEvent(eventId, getToken()).then((eventData) => setEvent(eventData));
  }, [eventId, getToken]);
  return (
    <SignedInLayout>
      {event && (
        <Stack>
          <Paper
            sx={{
              width: "40rem",
              padding: "2rem",
              bgcolor: "white",
              color: "black",
            }}
          >
            <Typography variant="h4" fontWeight="600">
              {event.eventTitle}
            </Typography>
          </Paper>
          {/* <Paper
          sx={{
            width: "45rem",
            padding: "2rem",
            bgcolor: "#130303",
            backgroundImage:
              "linear-gradient(to bottom, rgba(7, 1, 1, 1) 35%, rgba(80, 80, 100, 1) 100%)",
          }}
        > */}
          <Stack spacing={2} color="white" paddingY="3rem">
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
              <Typography
                variant="h6"
                fontWeight="500"
                component="div"
                width="7rem"
                color="primary.light"
              >
                Description:
              </Typography>
              <Typography variant="body2">{event.eventDescription}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
              <Typography
                variant="h6"
                fontWeight="500"
                component="div"
                width="7rem"
                color="primary.light"
              >
                Start Date:
              </Typography>
              <Typography variant="body2">
                {new Date(event.startDate).toString()}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
              <Typography
                variant="h6"
                fontWeight="500"
                component="div"
                width="7rem"
                color="primary.light"
              >
                End Date:
              </Typography>
              <Typography variant="body2">
                {new Date(event.endDate).toString()}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
              <Typography
                variant="h6"
                fontWeight="500"
                component="div"
                width="7rem"
                color="primary.light"
              >
                Event Link:
              </Typography>
              {event.eventLink != null ? (
                <Typography variant="body2">url.com</Typography>
              ) : (
                <CreateMeetingLink />
              )}
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-start" spacing={2}>
            <Button variant="outlined">Delete event</Button>
          </Stack>
          {/* </Paper> */}
        </Stack>
      )}
    </SignedInLayout>
  );
};

export default VirtualEvent;