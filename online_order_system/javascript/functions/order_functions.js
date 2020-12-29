function ResetButtons() {
    document.querySelectorAll('.extras-option').forEach((div) => {
        div.style.backgroundColor = "white";
        div.style.color = "black";
    });
}

function ResetCategoryButtons(category) {
    let sugar_type_buttons = Array.from(document.querySelector('#sugar_type').getElementsByTagName('li'));
    sugar_type_buttons.forEach((li, index) => {
        sugar_type_buttons[index] = li.children[0];
    });
    sugar_type_buttons.shift();

    let sugar_amount_buttons = Array.from(document.querySelector('#sugar_amount').getElementsByTagName('li'));
    sugar_amount_buttons.forEach((li, index) => {
        sugar_amount_buttons[index] = li.children[0];
    });
    sugar_amount_buttons.shift();

    let size_buttons = Array.from(document.querySelector('#size').getElementsByTagName('li'));
    size_buttons.forEach((li, index) => {
        size_buttons[index] = li.children[0];
    });
    size_buttons.shift();

    let extras_buttons = Array.from(document.querySelector('#extras').getElementsByTagName('li'));
    extras_buttons.forEach((li, index) => {
        extras_buttons[index] = li.children[0];
    });
    extras_buttons.shift();

    if (category === 'sugar_type') buttonsCollection = sugar_type_buttons;
    else if (category === 'sugar_amount') buttonsCollection = sugar_amount_buttons;
    else if (category === 'size') buttonsCollection = size_buttons;
    else buttonsCollection = sugar_amount_buttons.concat(sugar_type_buttons).concat(size_buttons).concat(extras_buttons);
    buttonsCollection.forEach((div) => {
        div.style.backgroundColor = 'white';
        div.style.color = 'black';
    })
}

function Calculate_Extras(div) {
    //is the button pressed or not
    if (div.style.color === "black" && div.textContent === 'Κανέλα') { //black letters.It got clicked-item was added
        extras += "Κανέλα,";
        extras_cost += 0.20;
    } else if (div.style.color === "white" && div.textContent === 'Κανέλα') { //white letters.Item was removed
        extras.replace("Κανέλα,", "");
        extras_cost -= 0.20;
    } else if (div.style.color === "black" && div.textContent === 'Σοκολάτα') {
        extras += "Σοκολάτα,";
        extras_cost += 0.20;
    } else if (div.style.color === "white" && div.textContent === 'Σοκολάτα') {
        extras.replace("Σοκολάτα", "");
        extras_cost -= 0.20;
    } else if (div.style.color === "black" && div.textContent === 'Σιρόπι σοκολάτας') {
        extras += "Σιρόπι σοκολάτας,";
        extras_cost += 0.20;
    } else if (div.style.color === "white" && div.textContent === 'Σιρόπι σοκολάτας') {
        extras.replace('Σιρόπι σοκολάτας', "");
        extras_cost -= 0.20;
    }

}

function GenerateCart() {
    if (cart.length === 0 || cart === undefined) {
        let Empty_Cart_Image = document.createElement('img');
        Empty_Cart_Image.src = 'logos/empty_cart.png';
        Empty_Cart_Image.width = '200';
        Empty_Cart_Image.height = '200';

        let Empty_Cart_Description = document.createElement('p');
        Empty_Cart_Description.innerHTML = 'Δε βρέθηκαν προϊόντα.';

        document.querySelector(".information").appendChild(Empty_Cart_Image);
        document.querySelector(".information").appendChild(Empty_Cart_Description);
    } else {
        let h1 = document.createElement('h1');
        h1.innerHTML = 'Τα προϊόντα που έχετε πάρει μέχρι στιγμής είναι';
        document.querySelector('.information').appendChild(h1);

        cart.forEach(item => {
            show_cart = "";
            let Items_List = document.createElement('ul');
            Items_List.id = "cart_item";
            Items_List.setAttribute('name', item[1]);
            console.log(item[1])
            if (item[0] === 'Coffee') {
                show_cart += "<li><p>" + item[2] + "<br>" + "Τιμή: " + (parseFloat(item[3]) + parseFloat(item[4]) + parseFloat(item[5])).toFixed(2) + "€<br>";
                show_cart += "Ζάχαρη: " + item[6] + "," + item[7] + "<br>Μέγεθος: " + item[8];
                if (item[9] !== "") show_cart += "<br>Extras: " + item[9].substring(0, item[9].length - 1) + "<br>";
                if (item[10] !== "") show_cart += "Σχόλια: " + item[10] + "</p></li>";
                else show_cart += "</p></li>";
                show_cart += "<li><input type='button' class='modalButton' onclick='Remove_Cart_Item(this)' value='Αφαίρεση'></li>";
                Items_List.innerHTML = show_cart;
                document.querySelector('.information').appendChild(Items_List);
            } else if (item[0] === 'Sandwich') {
                show_cart += "<li><p>" + item[2] + "<br>Τιμή: " + (parseFloat(item[3])).toString() + "€";
                if (item[4] !== "") show_cart += "<br>Σχόλια: " + item[4] + "</p></li>";
                else show_cart += "</p></li";
                show_cart += "<li><input type='button' class='modalButton' onclick='Remove_Cart_Item(this)' value='Αφαίρεση'></li>";
                Items_List.innerHTML = show_cart;
                document.querySelector('.information').appendChild(Items_List);
            } else {
                show_cart += "<li><p>" + item[2] + "<br>Τιμή: " + (parseFloat(item[3]) + parseFloat(item[4])).toString() + "€";
                if (item[5] !== "") show_cart += "<br>Extras: " + item[5].substring(0, item[5].length - 1);
                if (item[6] !== "") show_cart += "<br>Σχόλια: " + item[6] + "</p></li>";
                else show_cart += "</p></li>";
                show_cart += "<li style='margin-bottom:2%'><input type='button' class='modalButton' onclick='Remove_Cart_Item(this)' value='Αφαίρεση'></li>";
                Items_List.innerHTML = show_cart;
                document.querySelector('.information').appendChild(Items_List);
            }
            let hr = document.createElement('hr');
            document.querySelector('.information').appendChild(hr);
        });
        document.querySelector('.information').innerHTML += "<input type='button' class='modalButton' onclick='Confirm_Order()' value='Συνέχεια'>"
    }
}

function ProduceId() {
    let id = "";
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for (let i = 0; i < 10; i++) {
        let rarray = Math.floor(Math.random() * 2);
        switch (rarray) {
            case (0):
                id += letters[Math.floor(Math.random() * 15)];
                break;
            case (1):
                id += (numbers[Math.floor(Math.random() * 10)]).toString();
                break;
        }
    }
    return id;
}

function ClearVariables() {
    sugar_amount = ""
    sugar_type = "";
    extras = "";
    extras_cost = 0.00;
    document.querySelector('#comments').value = "";
}

function Remove_Cart_Item(button) {
    let item_id = button.parentElement.parentElement.getAttribute('name');
    cart.forEach((item, index) => {
        if (item[1] === item_id) {
            cart.splice(index, 1);
            document.querySelector('.information').innerHTML = "";
            GenerateCart();
            document.querySelector('.information').style.display = 'block';
            document.querySelector('.ShowItems').style.display = 'none';
        }
    });
}
