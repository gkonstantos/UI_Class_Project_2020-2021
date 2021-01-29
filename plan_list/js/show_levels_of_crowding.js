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