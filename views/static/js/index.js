let $ = e => document.querySelector(e);

document.addEventListener("DOMContentLoaded", function() {
    fetch('/get')
        .then(response => response.json())
        .then(data => {
            $("#s1").checked = data["1"];
            $("#s2").checked = data["2"];

            $("#s1").addEventListener("change", switchLights);
            $("#s2").addEventListener("change", switchLights);
        });
});

function switchLights(e) {
    console.log("switching");
    fetch('/set?first=' + $("#s1").checked + '&second=' + $("#s2").checked)
        .then(response => response.json())
        .then(data => console.log(data));
}