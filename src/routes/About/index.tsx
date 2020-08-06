import React from "react";
import { MainLayout } from "../../components/Layout/Main";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

export const About = () => {
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Typography variant="h4" paragraph>
          NRG Masternode Payout Estimate
        </Typography>
        <Typography paragraph>This tool tries to estimate the when the next Masternode payout will be.</Typography>
        <Typography paragraph>This is accomplished by finding the current <Link href="https://nexus.energi.network/masternodes/listing">Masternode List</Link></Typography>
        <Typography paragraph>The estimation algorithm is public and can be found on <Link href="https://github.com/rphansen91/nrg-masternode-payout-estimate/blob/master/src/providers/Energi/estimate.ts">GitHub</Link></Typography>
        <Typography paragraph>Addresses are stored locally and are never transmitted over the internet.</Typography>
        <Typography paragraph>Built by a member of the community</Typography>
        <Link href="https://github.com/rphansen91" target="_blank">
          <Typography>Ryan P. Hansen</Typography>
        </Link>
      </Container>
    </MainLayout>
  );
};

export default About;
