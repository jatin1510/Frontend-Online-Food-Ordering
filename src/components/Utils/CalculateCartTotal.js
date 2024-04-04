export const calculateCartTotal = (items) => {
    let ans = 0;
    for(let item of items) {
        ans += item.totalPrice;
    }
    return ans;
};
