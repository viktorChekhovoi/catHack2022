import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Review() {
  return (
    <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Fleet 1" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Fleet 2" />
    </FormGroup>
  );
}