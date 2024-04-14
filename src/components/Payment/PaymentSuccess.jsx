import React, { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green } from "@mui/material/colors";
import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../State/Cart/Action";
import { useParams } from "react-router-dom";
import { paymentSuccess } from "../State/Orders/Action";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(clearCart());
        const req = { orderId: id, jwt: localStorage.getItem("jwt") };
        console.log("Payment success req: ", req);
        dispatch(paymentSuccess({ orderId: id, jwt: localStorage.getItem("jwt") }));
    }, []);
    return (
        <div className="min-h-screen px-5">
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <Card className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5">
                    <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
                    <h1 className="py-5 text-2xl font-semibold">
                        Order Success !
                    </h1>
                    <p className="py-3 text-center">
                        Thank you for choosing our Platform! We appreciate your
                        order
                    </p>
                    <p className="py-2 text-center text-lg">Have a Great Day</p>
                    <Button
                        variant="contained"
                        className="py-5"
                        sx={{ margin: "1rem 0rem" }}
                        onClick={() => navigate("/profile/orders")}
                    >
                        Go to Orders
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default PaymentSuccess;
