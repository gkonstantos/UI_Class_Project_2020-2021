let route_id = window.location.hash.substring(1);

document.querySelector('#route_id_message').textContent = "Διαδρομή με id " + route_id;

let routes = Load_List();
let route;
let waypoints = [];

for (let i = 0; i < routes.length; i++) {
    if (routes[i][0] === route_id) {
        route = routes[i];
        break;
    }
}

document.querySelector('#begin_area_label').textContent = route[1];
document.querySelector('#end_area_label').textContent = route[2];
document.querySelector('#message_label').textContent = route[3];
document.querySelector('#meansOfTransport_label').textContent = route[4];
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
    input.setAttribute('autocomplete', 'off');

    li.appendChild(input);
    ul.appendChild(li);

    li = document.createElement('li');
    li.textContent = "Μέσο μεταφοράς";
    ul.appendChild(li);

    li = document.createElement('li');
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'waypoint_mot_' + index);
    input.setAttribute('autocomplete', 'off');

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
    let waypoints = [];
    inputs.forEach( input => {
        if(input.id.includes("waypoint"))
            waypoints.push(input);
    });
    
    for (let i = 0; i < inputs.length; i++) 
        if (!inputs[i].id.includes("waypoint") && !inputs[i].value.isEmpty())
            route[i+1] = inputs[i].value;//+1 for leaving the route id untouched.
    let i = 0;
    route[7].forEach( (waypoint,index) => {
        waypoint[0] = waypoints[i].value;
        waypoint[1] = waypoints[i+1].value;
        i += 2;
    });

    let time_inputs = document.querySelectorAll("input[type='time']");
    
    route [5] = time_inputs[0].value.isEmpty() ? route[5] : time_inputs[0].value;
    route [6] = time_inputs[1].value.isEmpty() ? route[1] : time_inputs[0].value;
    
    Save_Route_To_Array();
    Save_List();
    Return_To_ePlanning();
});

function Save_Route_To_Array() {
    for (let i = 0; i < routes.length; i++) {
        if (routes[i][0] === route_id) {
            routes[i] = route;
            break;
        }
    }
}

function Save_List() {
    localStorage.removeItem('save_routes');
    localStorage.setItem('save_routes', JSON.stringify(routes));
}

function Return_To_ePlanning(){
    location.href = 'show_list.html'
}

String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};

document.querySelector('#e_planning_page').addEventListener('click', Return_To_ePlanning);
document.querySelector('#return_to_e_planning_page').addEventListener('click' , Return_To_ePlanning);