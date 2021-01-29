let route_id = window.location.hash.substring(1);

document.querySelector('#route_id_message').textContent = "Διαδρομή με id " + route_id;

let routes = Load_List();
let route;

for (let i = 0; i < routes.length; i++) {
    if (routes[i][0] === route_id) {
        route = routes[i];
        break;
    }
}

document.querySelector('#begin_area_label').textContent = route[1];
document.querySelector('#end_area_label').textContent = route[2];
document.querySelector('#message_label').textContent = route[3];
document.querySelector('#begin_hour_label').textContent = route[5];
document.querySelector('#end_hour_label').textContent = route[6];

route[7].forEach((element, index) => {
    let ul = document.createElement('ul');

    let li = document.createElement('li');
    li.textContent = "Στάση";
    ul.appendChild(li);

    li = document.createElement('li');
    li.textContent = element[0];
    ul.appendChild(li);

    li = document.createElement('li');
    li.textContent = element[1];
    ul.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Όνομα στάσης";
    ul.appendChild(li);

    li = document.createElement('li');
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'waypoint_name_' + index);
    input.setAttribute('autocomplete' , 'off');

    li.appendChild(input);
    ul.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Μέσο μεταφοράς";
    ul.appendChild(li);

    li = document.createElement('li');
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'waypoin0t_mot_' + index);
    input.setAttribute('autocomplete' , 'off');

    li.appendChild(input);
    ul.appendChild(li);

    document.querySelector('main').appendChild(ul);

});

function Load_List() {
    let temp = JSON.parse(localStorage.getItem('save_routes'));
    if (temp.length > 0) return temp;
    else return [];
}

document.querySelector('#save_changes').addEventListener('click', () => {
    let inputs = document.querySelectorAll('input[type="text"]');
    let check = false;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.isEmpty()) {
            alert("Δεν επιτρέπονται άδεια πεδία.");
            check = true;
            break;
        }
    }
    if (!check) {
        //everything has a new value
        let waypoints = [];
        for (let i = 5; i < inputs.length; i += 2)
            waypoints.push([inputs[i], inputs[i + 1]]);



        let tmp = [
            route_id,
            inputs[0].value,
            inputs[1].value,
            inputs[2].value,
            inputs[3].value,
            inputs[4].value,
            waypoints
        ]
        //replace the route
        for( let i =0; i < routes.length; i ++){
            if(routes[i][0] === route_id)
                routes[i] = tmp;
        }
        Save_List();
        location.href = "show_list.html";
    }

});

String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};

function Save_List(){
    localStorage.removeItem('save_routes');
    localStorage.setItem('save_routes' , JSON.stringify(routes));
}