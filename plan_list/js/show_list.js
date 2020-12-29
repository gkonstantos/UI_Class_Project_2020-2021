let edit_icon = document.createElement('ion-icon');
edit_icon.setAttribute('name', 'pencil-outline');
edit_icon.addEventListener('click', Change_Route);

let expand_icon = document.createElement('ion-icon');
expand_icon.setAttribute('name', 'arrow-forward-outline');
expand_icon.addEventListener('click', expand_Route_Details);

let delete_icon = document.createElement('ion-icon');
delete_icon.setAttribute('name', 'close-circle-outline');
delete_icon.addEventListener('click', remove_list_item);

let routes = Load_List();
Generate_List();

gsap.from('.list-item', {
    opacity: 0.5,
    x: -1000,
    duration: 1
});

let waypoints = [];

let route_initial_information = [];
let route_clicked = false;

document.querySelectorAll("[name='close-circle-outline']").forEach(svg => {
    svg.addEventListener('click', remove_list_item);
});

function remove_list_item() {
    let div = this.parentElement.parentElement.parentElement;
    let paragraph_text = this.parentElement.nextElementSibling;

    let timeline = new TimelineLite();

    timeline.to(paragraph_text, {
        textDecoration: 'line-through',
        duration: 1
    }).
    to(div, {
        y: -1000,
        duration: 2
    }).
    to(div, {
        display: 'none'
    });
    if (div.id !== "plus_button" && div.id !== "drop_down_button" && div.id !== "remove_button") {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i][0] === div.id) {
                routes.splice(i, 1);
                break;
            }
        }
    }
    Save_List();
}

document.querySelectorAll("[name='pencil-outline']").forEach( pencil  => {
    pencil.addEventListener('click' , Change_Route);
})

document.querySelectorAll('[name="arrow-forward-outline"]').forEach(svg => {
    svg.addEventListener('click', expand_Route_Details);
});

function expand_Route_Details() {
    if (!route_clicked) {
        document.querySelectorAll('.list-item').forEach((div, index) => {
            route_initial_information.push(div.firstElementChild.lastElementChild.innerHTML);
            if (div.id === 'plus_button' || div.id === "drop_down_button" || div.id === "remove_button")
                div.firstElementChild.lastElementChild.textContent = "Παράδειγμα " + (index + 1).toString();

            else
                div.firstElementChild.lastElementChild.textContent = "Διαδρομή " + (index - 2).toString();
            gsap.to(div, {
                width: "25%",
                x: -700
            });
        });
        route_clicked = true;

        Show_Route_Details(this);

    } else {
        document.querySelectorAll('.list-item').forEach((div, index) => {
            div.firstElementChild.lastElementChild.innerHTML = route_initial_information[index];
            let animations = new TimelineLite();
            animations.to(document.querySelector(".route-details"), {
                y: -1000,
                display: "none",
                duration: 1
            }).
            to(div, {
                clearProps: "x",
                width: "75%",
                duration: 0.5
            });
        });
        route_clicked = false;
        route_initial_information = [];
    }
}
/*
<summary>
Called every time the user clicks the arrow ion-icon in a list-item.
Minimizes the list-items and shows the selected item's details.
</summary
*/
function Show_Route_Details(svg) {
    let container = svg.parentElement.parentElement.parentElement.id;
    console.log(container);
    if (container === "remove_button" || container === "drop_down_button" || container === "plus_button") {
        document.querySelector("#begin").textContent = 'Τοποθεσία Αφετηρίας'
        document.querySelector("#end").textContent = 'Τοποθεσία Προορισμού'
        document.querySelector("#message").textContent = 'Είδος μηνύματος'

        document.querySelector('#waypoints').innerHTML += "Στάση 1<br>";

        document.querySelector('#waypoints').innerHTML += "Μέσο Μεταφοράς 1<br><br><br>"

        document.querySelector("#begin_hour").textContent = "Π.χ 7.30 πμ";
        document.querySelector("#end_hour").textContent = "Π.χ 9.30 πμ";
    } else {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i][0] === container) {
                document.querySelector('#route_name').textContent = routes[i][1] + "," + routes[i][2];
                document.querySelector("#begin").textContent = routes[i][1];
                document.querySelector("#end").textContent = routes[i][2];
                document.querySelector("#message").textContent = routes[i][3];

                routes[i][7].forEach(text => document.querySelector('#waypoints').innerHTML += text + "<br>");

                document.querySelector("#begin_hour").textContent = routes[i][5];
                document.querySelector("#end_hour").textContent = routes[i][6];
            }
        }
    }
    gsap.to(document.querySelector('.route-details'), {
        display: "block",
        y: -200
    });
}
/*
<summary>
Opens the new route's modal.
</summary
*/
document.querySelector('#add_route').addEventListener('click', () => {
    document.querySelector('#route_modal').style.display = "block";
    Clear_Fields();
});
/*
<summary>
Closes the new route's modal.
</summary
*/
document.querySelector('#modal_cancel').addEventListener('click', () => {
    document.querySelector('#route_modal').style.display = "none";
    waypoints = [];
});
/*
<summary>
Opens or closes the waypoints' modal.
</summary
*/
let button = document.querySelector('#modal_add_waypoint');
let flag = false;
button.addEventListener('click', () => {
    document.querySelector('.modal-content-2').style.display = flag === false ? "block" : "none";
    flag = !flag;
    document.querySelector('#waypoint_name').value = "";
    document.querySelector('#waypoint_mot').value = "";
})
/*
<summary>
Closes the waypoints' modal.
</summary
*/
document.querySelector('#cancel_waypoint').addEventListener('click', () => {
    document.querySelector('.modal-content-2').style.display = 'none';
    flag = false;
});
/*
<summary>
Saves the waypoit the user just created.
GenerateWaypoints in order to show them to the user.
</summary
*/
document.querySelector("#confirm_waypoint").addEventListener('click', () => {
    let waypoint = document.querySelector("#waypoint_name").value;
    let waypoint_mot = document.querySelector("#waypoint_mot").value;
    if (waypoint.isEmpty() || waypoint.isEmpty()) {
        document.querySelector('#waypoint_alert').textContent = "Όλα τα πεδία είναι υποχρεωτικά.";
        setTimeout(() => {
            document.querySelector('#waypoint_alert').textContent = ""
        }, 1500);
    } else {
        let exists = false;
        for (let i = 0; i < waypoints.length; i++) {
            if (waypoint === waypoints[i][0] && waypoint_mot === waypoints[i][1]) {
                document.querySelector('#waypoint_alert').textContent = "Η στάση αυτή υπάρχει ήδη.";
                exists = true;
                break;
            }
        }
        if (!exists) {
            waypoints.push([waypoint, waypoint_mot]);
            GenerateWaypoints();
        }
    }
});
/*
<summary>
First save the route in the routes array.
Then save the array to local storage by getting currently saved routes,removing them and re-placing them to the storage.
</summary
*/
document.querySelector('#modal_confirm').addEventListener('click', () => {
    let begin_point = document.querySelector('#begin_point').value;
    let end_point = document.querySelector('#end_point').value;
    let route_message = document.querySelector('#route_message').value;
    let general_mot = document.querySelector('#general_mot').value;
    let begin_hour = document.querySelector('#hour_begin').value;
    let end_hour = document.querySelector('#hour_end').value;

    if (begin_point.isEmpty() || end_point.isEmpty() || route_message.isEmpty()) {
        document.querySelector('#route_alert_message').textContent = "Όλα τα πεδία εκτός από αυτό του γενικού μέσου μεταφοράς είναι υποχρεωτικά.";
    } else {
        let route_id = ProduceId();
        routes.push(
            [
                route_id,
                begin_point,
                end_point,
                route_message,
                general_mot,
                begin_hour,
                end_hour,
                waypoints
            ]
        );
        let container = document.createElement('div');
        container.classList.add('list-item');
        container.id = route_id;

        let ul = document.createElement('ul');

        let li = document.createElement('li');
        li.appendChild(edit_icon);
        li.appendChild(expand_icon);
        li.appendChild(delete_icon);

        ul.appendChild(li);

        li = document.createElement('li');
        li.textContent = begin_point + "," + end_point;

        ul.appendChild(li);

        container.appendChild(ul);

        document.querySelector('main').appendChild(container);
        document.querySelector('#route_modal').style.display = "none";

        Save_List();
    }
});
/*
<summary>
Called every time the user leaves the input field of either hour_end or hour_begin.
Pseudo warns the user for the crowding an area has at these hours.
</summary
*/
let initial_end_point = "";

document.querySelector('#end_point').addEventListener('focusout', () => {
    let location = document.querySelector('#end_point').value;
    if (location.isEmpty()) {
        document.querySelector('#end_point_area_alert').textContent = "";
    } else if (location !== initial_end_point) {
        initial_end_point = location;
        let degree = Math.floor(Math.random() * 3);
        switch (degree) {
            case 0:
                document.querySelector('#end_point_area_alert').textContent = "Επίπεδο συνωστισμού: Χαμηλό.";
                document.querySelector('#end_point_area_alert').style.color = "green";
                break;
            case 1:
                document.querySelector('#end_point_area_alert').textContent = "Επίπεδο συνωστισμού: Μεσαίο.";
                document.querySelector('#end_point_area_alert').style.color = "purple";
                break;
            case 2:
                document.querySelector('#end_point_area_alert').textContent = "Επίπεδο συνωστισμού: Υψηλό.";
                document.querySelector('#end_point_area_alert').style.color = "red";
                break;
        }
    }
});
/*
<summary>
Called every time the user leaves the input field of either hour_end or hour_begin.
Pseudo warns the user for the crowding an area has at these hours.
</summary
*/
let initial_hour_begin = "";

document.querySelector('#hour_begin').addEventListener('focusout', () => {
    let hour = document.querySelector('#hour_begin').value;
    if (hour.isEmpty()) {
        document.querySelector('#hour_begin_alert').textContent = "";
    } else if (hour !== initial_hour_begin) {
        initial_hour_begin = hour;
        let degree = Math.floor(Math.random() * 3);
        switch (degree) {
            case 0:
                document.querySelector('#hour_begin_alert').textContent = "Πρόβλεψη συνωστισμού: Χαμηλός.";
                document.querySelector('#hour_begin_alert').style.color = "green";
                break;
            case 1:
                document.querySelector('#hour_begin_alert').textContent = "Πρόβλεψη συνωστισμού: Μεσαίος.";
                document.querySelector('#hour_begin_alert').style.color = "purple";
                break;
            case 2:
                document.querySelector('#hour_begin_alert').textContent = "Πρόβλεψη συνωστισμού: Υψηλός.";
                document.querySelector('#hour_begin_alert').style.color = "red";
                break;
        }
    }
});
/*
<summary>
Called every time the user leaves the input field of either hour_end or hour_begin.
Pseudo warns the user for the crowding an area has at these hours.
</summary
*/
let initial_hour_end = "";

document.querySelector('#hour_end').addEventListener('focusout', () => {
    let hour = document.querySelector('#hour_end').value;
    if (hour.isEmpty()) {
        document.querySelector('#hour_end_alert').textContent = "";
    } else if (hour !== initial_hour_end) {
        initial_hour_end = hour;
        let degree = Math.floor(Math.random() * 3);
        switch (degree) {
            case 0:
                document.querySelector('#hour_end_alert').textContent = "Πρόβλεψη συνωστισμού: Χαμηλός.";
                document.querySelector('#hour_end_alert').style.color = "green";
                break;
            case 1:
                document.querySelector('#hour_end_alert').textContent = "Πρόβλεψη συνωστισμού: Μεσαίος.";
                document.querySelector('#hour_end_alert').style.color = "purple";
                break;
            case 2:
                document.querySelector('#hour_end_alert').textContent = "Πρόβλεψη συνωστισμού: Υψηλός.";
                document.querySelector('#hour_end_alert').style.color = "red";
                break;
        }
    }
});
/*
<summary>
Produces a unique(pseudo-random) id for every route.
</summary
*/
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

function Clear_Fields() {
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.value = "";
    })
}
/*
<summary>
Shows the waypoints during the 'create route' phase.
</summary
*/
function GenerateWaypoints() {

    let waypoints_list = document.querySelector('#waypoint_list');
    waypoints_list.innerHTML = "";

    if (waypoints.length === 0) {
        document.querySelector('.modal-content-3').style.display = "none";
    } else {
        waypoints.forEach(waypoint => {
            let li = document.createElement('li');
            li.textContent = waypoint[0];
            waypoints_list.appendChild(li);

            li = document.createElement('li');
            li.textContent = waypoint[1];
            waypoints_list.appendChild(li);

            let remove_button = document.createElement('input');
            remove_button.type = "button";
            remove_button.value = "Αφαίρεση στάσης";
            remove_button.addEventListener('click', () => {
                let wn = remove_button.previousElementSibling.previousElementSibling.textContent;
                let wm = remove_button.previousElementSibling.textContent;
                for (let i = 0; i < waypoints.length; i++) {
                    if (waypoints[i][0] === wn && waypoints[i][1] === wm) {
                        waypoints.splice(i, 1);
                        break;
                    }
                }
                GenerateWaypoints();
            })
            waypoints_list.appendChild(remove_button);
        });
        document.querySelector('.modal-content-3').style.display = "block";
        document.querySelector('.modal-content-2').style.display = "none";
    }
    flag = false;
};
/*
<summary>
Simple isEmpty function.Checks if a string === " " or "".
</summary
*/
String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};
/*
<summary>
Gets the width of the browser window.Used for making the website responsive and primarily changing gsap animations
</summary
*/
function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}
/*
<summary>
Saves user list whenever they update,save or delete an item from the list
</summary
*/
function Save_List() {
    let save_routes = JSON.stringify(routes);
    localStorage.removeItem('save_routes');
    localStorage.setItem('save_routes', save_routes);
}
/*
<summary>
Retrieves the saved list from local storage
</summary
*/
function Load_List() {
    let saved_routes = JSON.parse(localStorage.getItem('save_routes'));
    if (saved_routes !== null)
        return saved_routes;
    else return [];
}
/*
<summary>
Generates the saved list after it has been loaded from local storage
</summary
*/
function Generate_List() {
    if (routes.length > 0) {
        routes.forEach(route => {
            let container = document.createElement('div');
            container.classList.add('list-item');
            container.id = route[0];
            let ul = document.createElement('ul');
            let li = document.createElement('li');
            li.appendChild(edit_icon);
            li.appendChild(expand_icon);
            li.appendChild(delete_icon);
            ul.appendChild(li);
            li = document.createElement('li');
            li.textContent = route[1] + "," + route[2];
            ul.appendChild(li);
            container.appendChild(ul);
            document.querySelector('main').appendChild(container);
        })
    }
}
/*
<summary>
Change routes details.Then save the list and reload the page.Much easier.
</summary
*/
function Change_Route(){
    let rid = this.parentElement.parentElement.parentElement.id;
    if(rid === "plus_button" || rid === "drop_down_button" || rid === "remove_button")
        console.log("###");
    else{
        location.href = "change_route.html" + "#" +rid;
    }
}