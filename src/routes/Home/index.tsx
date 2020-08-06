import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { MainLayout } from "../../components/Layout/Main";
import { EnergiProvider } from "../../providers/Energi/context";
import { AddMasternode } from "../../components/Masternode/Add";
import { MasternodeListError } from "../../components/Masternode/Error";
import { MasternodeList } from "../../components/Masternode/List";

export const Home = () => {
  return (
    <MainLayout>
      <EnergiProvider>
        <Container maxWidth="sm">
          <Card>
            <CardHeader title="NRG Masternode Payout Estimate" />
            <Divider />
            <CardContent>
              <AddMasternode />
            </CardContent>
            <Divider />
            <MasternodeList />
          </Card>
        </Container>
        <MasternodeListError />
      </EnergiProvider>
    </MainLayout>
  );
};

export default Home;
