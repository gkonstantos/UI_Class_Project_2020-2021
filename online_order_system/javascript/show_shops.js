document.querySelectorAll(".shop").forEach((node) => {
    node.addEventListener("click",(div) => {
        let target = div.explicitOriginalTarget.attributes[0].value;
        if(target.indexOf("starbucks") !== -1) location.href = 'order.html' + '#' + 'Starbucks';
        else if(target.indexOf("mikel") !== -1) location.href = 'order.html' + '#' + 'Mikel';
        else if(target.indexOf("coffeeisland") !== -1) location.href = 'order.html' + '#' + 'CoffeeIsland';
    })
});
