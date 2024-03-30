import { Grid } from "@mui/material";
import React from "react";
import MenuTable from "../Menu/MenuTable";
import OrderTable from "../Orders/OrderTable";

const Dashboard = () => {
    return (
        <div className="px-2 py-2">
            <Grid container spacing={1}>
                <Grid item xs={12} lg={12}>
                    <MenuTable />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <OrderTable />
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
