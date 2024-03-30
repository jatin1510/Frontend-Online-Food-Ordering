import React from "react";
import GppBadIcon from "@mui/icons-material/GppBad";
import { red } from "@mui/material/colors";
import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen px-5">
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <Card className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5">
                    <GppBadIcon sx={{ fontSize: "5rem", color: red[500] }} />
                    <h1 className="py-5 text-2xl font-semibold">
                        Order Failed !
                    </h1>
                    <p className="py-3 text-center ">
                        Don't worry your money is safe!
                    </p>
                    <p className="py-3 text-center ">
                        If money was debited from your account, it will be
                        refunded automatically in 5-7 working days.
                    </p>
                    <p className="py-2 text-center text-lg">
                        Have a Great Day
                    </p>
                    <Button
                        variant="contained"
                        className="py-5"
                        sx={{ margin: "1rem 0rem" }}
                        onClick={() => navigate("/")}
                    >
                        Go to Home
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default PaymentFailure;
