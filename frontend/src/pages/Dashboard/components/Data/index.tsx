import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface dataprops {}

export default function Data(props: dataprops) {
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Dozer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            10,000 Hours
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Excavator</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           15,000 Hours
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>You need admin access to see this data</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
    </Container>
  );
}

  
