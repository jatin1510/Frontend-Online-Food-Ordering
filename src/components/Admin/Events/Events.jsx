import { Box, Button, Modal } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateEventForm from "./CreateEventForm";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Events = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <div className="p-5 flex flex-row-reverse">
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Create New Event
                </Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateEventForm />
                </Box>
            </Modal>
        </div>
    );
};

export default Events;
