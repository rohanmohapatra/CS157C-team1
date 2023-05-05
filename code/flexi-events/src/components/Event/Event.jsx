import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import {Button} from '@mui/material';

function Event() {

  return (
    <Box>
      <Button>click me</Button>
      <Typography variant='subtitle2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat eos facere nostrum veritatis sunt consectetur consequuntur natus eligendi quasi! Sunt beatae temporibus doloribus fugiat praesentium explicabo libero reiciendis molestias!</Typography>
    </Box>
  )
}

export default Event;