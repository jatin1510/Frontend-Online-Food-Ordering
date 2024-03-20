import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const ingredients = [
    { category: "Nuts & Seeds", options: ["Cashews"] },
    { category: "Vegetable", options: ["Lettuce", "Tomato slices", "Onion"] },
    {
        category: "Vegetable",
        options: [
            "Lettuce",
            "Tomato slices",
            "Onion",
            "Lettuce",
            "Tomato slices",
            "Onion",
        ],
    },
    { category: "Vegetable", options: ["Lettuce", "Tomato slices", "Onion"] },
];
const MenuCard = () => {
    const handleCheckboxChange = (value) => {
        console.log(value);
    };
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className="lg:flex items-center justify-between">
                    <div className="lg:flex items-center lg:gap-5">
                        <img
                            className="w-[7rem] h-[7rem] object-cover"
                            src="https://cdn.pixabay.com/photo/2015/07/30/18/23/burger-868145_1280.jpg"
                            alt=""
                        />
                        <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                            <p className="font-semibold text-xl">Burger</p>
                            <p>
                                <b>₹</b>499
                            </p>
                            <p className="text-gray-400">
                                Description of the food item
                            </p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form>
                    <div className="flex gap-5 flex-wrap">
                        {ingredients.map((item, index) => {
                            return (
                                <div>
                                    <p>{item.category}</p>
                                    <FormGroup key={index}>
                                        {item.options.map((option, index2) => {
                                            return (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            onChange={() => {
                                                                handleCheckboxChange(option);
                                                            }}
                                                        />
                                                    }
                                                    label={option}
                                                />
                                            );
                                        })}
                                    </FormGroup>
                                </div>
                            );
                        })}
                    </div>
                    <div className="pt-5">
                        <Button
                            disabled={false}
                            variant="contained"
                            type="submit"
                        >
                            {true ? "Add to cart" : "Out of Stock"}
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    );
};

export default MenuCard;
