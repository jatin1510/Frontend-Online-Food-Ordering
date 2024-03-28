export const categorizeIngredients = (ingredients) => {
    return ingredients.reduce((acc, ingredient) => {
        const category = ingredient.category.name;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(ingredient.name);
        return acc;
    }, {});
};