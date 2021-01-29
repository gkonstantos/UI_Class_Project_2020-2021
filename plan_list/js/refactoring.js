let Created_Routes = Load_List_From_LocalStorage();
let Route_Waypoints = [];
let routeInformationBeforeShowDetails = [];
let modalAddWaypointButton = document.querySelector('#modal_add_waypoint');
let isAddWaypointModalVisible = false;
let route_ID = "";
let isRouteDetailsShown = false;

function Create_Pencil_IonIcon() {
    let ion_icon = document.createElement('ion-icon');
    ion_icon.setAttribute('name', 'pencil-outline');
    ion_icon.addEventListener('click', Edit_Route_Details)
    return ion_icon;
}

function Create_ArrowForward_IonIcon() {
    let ion_icon = document.createElement('ion-icon');
    ion_icon.setAttribute('name', 'arrow-forward-outline');
    ion_icon.addEventListener('click', Show_Route_Details);
    return ion_icon;
}

function Create_CloseCircle_IonIcon() {
    let ion_icon = document.createElement('ion-icon');
    ion_icon.setAttribute('name', 'close-circle-outline');
    ion_icon.addEventListener('click', Remove_Route_FromTheList);
    return ion_icon;
}

Generate_CreatedRoutes_ListHTML();

gsap.from('.list-item', {
    opacity: 0.5,
    x: -1000,
    duration: 1
});

document.querySelectorAll("[name='close-circle-outline']").forEach(close_ionicon => {
    close_ionicon.addEventListener('click', Remove_Route_FromTheList);
});

function Remove_Route_FromTheList() {
    let Route_Div_Container = this.parentElement.parentElement.parentElement;
    let Route_ShownText = this.parentElement.nextElementSibling;
    Animate_Route_Removal(Route_Div_Container, Route_ShownText);
    remove_route_from_routes_list(Route_Div_Container);
    Save_Route_List_ToWebStorage();
}

function Animate_Route_Removal(Route_Div_Container, Route_ShownText) {
    let timeline = new TimelineLite();
    timeline.to(Route_ShownText, {
        textDecoration: 'line-through',
        duration: 1
    }).
    to(Route_Div_Container, {
        y: -1000,
        duration: 2
    }).
    to(Route_Div_Container, {
        display: 'none'
    });
}

function remove_route_from_routes_list(Route_Div_Container) {
    if (Route_Div_Container.id !== "plus_button" && Route_Div_Container.id !== "drop_down_button" && Route_Div_Container.id !== "remove_button") {
        for (let i = 0; i < Created_Routes.length; i++) {
            if (Created_Routes[i][0] === Route_Div_Container.id) {
                Created_Routes.splice(i, 1);
                break;
            }
        }
    }
}

document.querySelectorAll("[name='pencil-outline']").forEach(pencil => {
    pencil.addEventListener('click', Edit_Route_Details);
});

function Edit_Route_Details() {
    let route_container_id = this.parentElement.parentElement.parentElement.id;
    if (route_container_id !== "plus_button" &&
        route_container_id !== "drop_down_button" && route_container_id === "remove_button")
        location.href = "change_route.html" + "#" + route_container_id;
}

document.querySelectorAll('[name="arrow-forward-outline"]').forEach(svg => {
    svg.addEventListener('click', Show_Route_Details);
});

function Show_Route_Details() {
    if (!isRouteDetailsShown) {
        Clear_RouteWaypoints_Details();
        Minimize_Route_Header_Information();
        Edit_SlidingUp_Window_Labels(this);
        isRouteDetailsShown = !isRouteDetailsShown;
    }
}

function Clear_RouteWaypoints_Details() {
    document.querySelector('#waypoints').innerHTML = "";
}

function Minimize_Route_Header_Information() {
    document.querySelectorAll('.list-item').forEach((route_div_container, index) => {
        routeInformationBeforeShowDetails.push(route_div_container.firstElementChild.lastElementChild.innerHTML);
        if (route_div_container.id === 'plus_button' || route_div_container.id === "drop_down_button" ||
            route_div_container.id === "remove_button")
            route_div_container.firstElementChild.lastElementChild.textContent = "Παράδειγμα " + (index + 1).toString();

        else
            route_div_container.firstElementChild.lastElementChild.textContent = "Διαδρομή " + (index - 2).toString();
        Animate_Route_Minimizing(route_div_container);
    });
}

function Animate_Route_Minimizing(route_div_container) {
    gsap.to(route_div_container, {
        width: "25%",
        x: -700
    });
}

function Edit_SlidingUp_Window_Labels(ionicon) {
    let routeDivId = ionicon.parentElement.parentElement.parentElement.id;
    if (routeDivId === "remove_button" || routeDivId === "drop_down_button" || routeDivId === "plus_button")
        View_Details_Of_Example_Route(routeDivId);
    else
        console.log(routeDivId);
    View_Details_Of_UserCreated_Route(routeDivId);
    Animate_SlidingUp_RouteInformation_Window();
}

function View_Details_Of_Example_Route() {
    document.querySelector("#begin").textContent = 'Τοποθεσία Αφετηρίας'
    document.querySelector("#end").textContent = 'Τοποθεσία Προορισμού'
    document.querySelector("#message").textContent = 'Είδος μηνύματος'
    document.querySelector('#waypoints').innerHTML += "Στάση 1<br>";
    document.querySelector('#waypoints').innerHTML += "Μέσο Μεταφοράς 1<br><br><br>"
    document.querySelector("#begin_hour").textContent = "Π.χ 7.30 πμ";
    document.querySelector("#end_hour").textContent = "Π.χ 9.30 πμ";
}

function View_Details_Of_UserCreated_Route(routeDivId) {
    for (let i = 0; i < Created_Routes.length; i++)
        if (Created_Routes[i][0] === routeDivId) {
            document.querySelector('#route_name').textContent = Created_Routes[i][1] + "," + Created_Routes[i][2];
            document.querySelector("#begin").textContent = Created_Routes[i][1];
            document.querySelector("#end").textContent = Created_Routes[i][2];
            document.querySelector("#message").textContent = Created_Routes[i][3];
            Created_Routes[i][7].forEach(waypoint => document.querySelector('#waypoints').innerHTML += waypoint[0] +"," + 
            waypoint[1] + "<br>");
            document.querySelector("#begin_hour").textContent = Created_Routes[i][5];
            document.querySelector("#end_hour").textContent = Created_Routes[i][6];
        }
}

function Animate_SlidingUp_RouteInformation_Window() {
    gsap.to(document.querySelector('.route-details'), {
        display: "block",
        y: -200
    });
}

document.querySelector('#close_route_details').addEventListener('click', Hide_Route_Details);

function Hide_Route_Details() {
    Expand_Route_Header_Information();
    routeInformationBeforeShowDetails = [];
    isRouteDetailsShown = !isRouteDetailsShown;
}

function Expand_Route_Header_Information() {
    document.querySelectorAll('.list-item').forEach((route_div_container, index) => {
        route_div_container.firstElementChild.lastElementChild.innerHTML = routeInformationBeforeShowDetails[index];
        Animate_Route_Expanding(route_div_container);
    });
}

function Animate_Route_Expanding(route_div_container) {
    let animations = new TimelineLite();
    animations.to(document.querySelector(".route-details"), {
        y: -1000,
        display: "none",
        duration: 1
    }).
    to(route_div_container, {
        clearProps: "x",
        width: "75%",
        duration: 0.5
    });
}

document.querySelector('#add_route').addEventListener('click', () => {
    document.querySelector('#route_modal').style.display = "block";
    Clear_Add_Route_Form();
});

function Clear_Add_Route_Form() {
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = "");
    document.querySelectorAll('input[type="time"]').forEach(input => input.value = "00:00:AM");
}

document.querySelector('#modal_cancel').addEventListener('click', () => {
    //close route creation modal
    document.querySelector('#route_modal').style.display = "none";
    Route_Waypoints = [];
});

modalAddWaypointButton.addEventListener('click', () => {
    document.querySelector('.modal-content-2').style.display = isAddWaypointModalVisible === false ? "block" : "none";
    isAddWaypointModalVisible = !isAddWaypointModalVisible;
    Clear_AddWaypoint_Form();
});

function Clear_AddWaypoint_Form() {
    document.querySelector('#waypoint_name').value = "";
    document.querySelector('#waypoint_mot').value = "";
}

document.querySelector('#cancel_waypoint').addEventListener('click', () => {
    document.querySelector('.modal-content-2').style.display = 'none';
    isAddWaypointModalVisible = false;
});

document.querySelector("#confirm_waypoint").addEventListener('click', () => {
    let waypoint_name = document.querySelector("#waypoint_name").value;
    let waypoint_MeansOfTransport = document.querySelector("#waypoint_mot").value;

    if (waypoint_name.isEmpty() || waypoint_MeansOfTransport.isEmpty())
        Show_ErrorMessage_forWaypoint();
    else
        Save_Temporarily_Waypoint(waypoint_name, waypoint_MeansOfTransport);
});

function Show_ErrorMessage_forWaypoint() {
    document.querySelector('#waypoint_alert').textContent = "Όλα τα πεδία είναι υποχρεωτικά.";
    setTimeout(() => {
        document.querySelector('#waypoint_alert').textContent = ""
    }, 1500);
}

function Save_Temporarily_Waypoint(waypoint_name, waypoint_MeansOfTransport) {
    let doesWaypointExist = false;
    for (let i = 0; i < waypoints.length; i++) {
        if (waypoint_name === Route_Waypoints[i][0] && waypoint_MeansOfTransport === Route_Waypoints[i][1]) {
            document.querySelector('#waypoint_alert').textContent = "Η στάση αυτή υπάρχει ήδη.";
            doesWaypointExist = true;
            break;
        }
    }
    if (!doesWaypointExist) {
        Route_Waypoints.push([waypoint_name, waypoint_MeansOfTransport]);
        Generate_Waypoints_Modal();
    }
}

function Generate_Waypoints_Modal() {

    let waypoints_list = document.querySelector('#waypoint_list');
    waypoints_list.innerHTML = "";

    Route_Waypoints.forEach(waypoint => {
        Create_Waypoint_Modal_List_Items(waypoints_list, waypoint);
        Create_Waypoint_Remove_Button(waypoints_list, waypoint);
    });
    Hide_CreateWaypointModal_ShowWaypointsList();
};

function Create_Waypoint_Modal_List_Items(waypoints_list, waypoint) {
    let li = document.createElement('li');
    li.textContent = waypoint[0];
    waypoints_list.appendChild(li);

    li = document.createElement('li');
    li.textContent = waypoint[1];
    waypoints_list.appendChild(li);
}

function Create_Waypoint_Remove_Button(waypoints_list, waypoint) {
    let remove_button = document.createElement('input');
    remove_button.type = "button";
    remove_button.value = "Αφαίρεση στάσης";
    remove_button.addEventListener('click', () => {
        Remove_Waypoint_From_List(remove_button);
    });
    waypoints_list.appendChild(remove_button);
}

function Remove_Waypoint_From_List(remove_button) {
    let waypoint_name = remove_button.previousElementSibling.previousElementSibling.textContent;
    let waypoint_MeansOfTransport = remove_button.previousElementSibling.textContent;
    for (let i = 0; i < Route_Waypoints.length; i++) {
        if (Route_Waypoints[i][0] === wn && Route_Waypoints[i][1] === wm) {
            Route_Waypoints.splice(i, 1);
            break;
        }
    }
    Generate_Waypoints_Modal();
}

function Hide_CreateWaypointModal_ShowWaypointsList() {
    document.querySelector('.modal-content-3').style.display = "block";
    document.querySelector('.modal-content-2').style.display = "none";
    isAddWaypointModalVisible = false;
}

document.querySelector('#modal_confirm').addEventListener('click', () => {
    let starting_point = document.querySelector('#begin_point').value;
    let termination = document.querySelector('#end_point').value;

    if (starting_point.isEmpty() || termination.isEmpty())
        document.querySelector('#route_alert_message').textContent = "Τα πεδία αφετηρίας,τερματισμού και μηνύματος στην υπηρεσία 13033 είναι υποχρεωτικά.";
    else {
        Save_Created_Route_Route_toArray(starting_point, termination);
        Create_Route_ListItemHTML(starting_point, termination);
        Save_Route_List_ToWebStorage();
    }
});

function Save_Created_Route_Route_toArray(starting_point, termination) {
    Produce_Route_ID();
    let route_phone_message = document.querySelector('#route_message').value;
    let general_meansOfTransport = document.querySelector('#general_mot').value;
    let starting_point_hour = document.querySelector('#hour_begin').value;
    let termination_hour = document.querySelector('#hour_end').value;
    Created_Routes.push(
        [
            route_ID,
            starting_point,
            termination,
            route_phone_message,
            general_meansOfTransport,
            starting_point_hour,
            termination_hour,
            Route_Waypoints
        ]
    );
}

function Produce_Route_ID() {
    route_ID = "";
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for (let i = 0; i < 10; i++) {
        let rarray = Math.floor(Math.random() * 2);
        switch (rarray) {
            case (0):
                route_ID += letters[Math.floor(Math.random() * 15)];
                break;
            case (1):
                route_ID += (numbers[Math.floor(Math.random() * 10)]).toString();
                break;
        }
    }
    console.log(route_ID);
}

function Create_Route_ListItemHTML(starting_point, termination) {
    let container = document.createElement('div');
    container.classList.add('list-item');
    container.id = route_ID;
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.appendChild(Create_Pencil_IonIcon());
    li.appendChild(Create_ArrowForward_IonIcon());
    li.appendChild(Create_CloseCircle_IonIcon());
    ul.appendChild(li);
    li = document.createElement('li');
    li.textContent = starting_point + "," + termination;
    ul.appendChild(li);
    container.appendChild(ul);
    document.querySelector('main').insertBefore(container,
        document.querySelector('main').lastElementChild);
    document.querySelector('#route_modal').style.display = "none";
}

function Save_Route_List_ToWebStorage() {
    let save_routes = JSON.stringify(Created_Routes);
    localStorage.removeItem('save_routes');
    localStorage.setItem('save_routes', save_routes);
}

String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};

// function getWidth() {
//     return Math.max(
//         document.body.scrollWidth,
//         document.documentElement.scrollWidth,
//         document.body.offsetWidth,
//         document.documentElement.offsetWidth,
//         document.documentElement.clientWidth
//     );
// }

function Load_List_From_LocalStorage() {
    let saved_routes = JSON.parse(localStorage.getItem('save_routes'));
    if (saved_routes !== null)
        return saved_routes;
    else return [];
}

function Generate_CreatedRoutes_ListHTML() {
    if (Created_Routes.length > 0) {
        Created_Routes.forEach(route => {
            let container = document.createElement('div');
            container.classList.add('list-item');
            container.id = route[0];
            console.log(route[0]);
            let ul = document.createElement('ul');
            let li = document.createElement('li');
            li.appendChild(Create_Pencil_IonIcon());
            li.appendChild(Create_ArrowForward_IonIcon());
            li.appendChild(Create_CloseCircle_IonIcon());
            ul.appendChild(li);
            li = document.createElement('li');
            li.textContent = route[1] + "," + route[2];
            ul.appendChild(li);
            container.appendChild(ul);
            document.querySelector('main').insertBefore(container,
                document.querySelector('main').lastElementChild);
        });
    }
}

function Edit_Route_Details() {
    let rid = this.parentElement.parentElement.parentElement.id;
    if (rid === "plus_button" || rid === "drop_down_button" || rid === "remove_button")
        console.log("###");
    else {
        location.href = "change_route.html" + "#" + rid;
    }
}

document.querySelector('#Clear_Route_List').addEventListener('click', () => {
    localStorage.removeItem('save_routes');
    location.reload();
});