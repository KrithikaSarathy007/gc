const map = L.map("map").setView([13.0827, 80.2707], 13);

// Map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Traffic signals
const signals = [
  { pos: [13.083, 80.275], marker: null },
  { pos: [13.085, 80.28], marker: null },
];

signals.forEach((s) => {
  s.marker = L.circleMarker(s.pos, { color: "red" }).addTo(map);
});

// Routes
const route1 = [
  [13.0827, 80.2707],
  [13.0835, 80.275],
  [13.085, 80.28],
];

let route2 = [
  [13.0827, 80.2707],
  [13.0835, 80.275],
  [13.0865, 80.285],
];

const alternateRoute2 = [
  [13.0827, 80.2707],
  [13.081, 80.265],
  [13.0865, 80.285],
];

// Ambulances
let amb1 = L.marker(route1[0]).addTo(map).bindPopup("🚑 Ambulance 1");
let amb2 = L.marker(route2[0]).addTo(map).bindPopup("🚑 Ambulance 2");

let index = 0;

// UI messages
document.getElementById("log").innerHTML =
  "⚠️ Two high-priority ambulances detected";

setTimeout(() => {
  document.getElementById("log").innerHTML +=
    "<br>❌ Route collision detected. Rerouting Ambulance 2";
  route2 = alternateRoute2;
}, 2000);

// Movement simulation
setInterval(() => {
  if (index < route1.length) {
    amb1.setLatLng(route1[index]);
    amb2.setLatLng(route2[index] || route2[route2.length - 1]);

    signals.forEach((s) => {
      if (map.distance(route1[index], s.pos) < 200) {
        s.marker.setStyle({ color: "green" });
      } else {
        s.marker.setStyle({ color: "red" });
      }
    });

    index++;
  }
}, 2000);
