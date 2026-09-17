// Named place labels for mapview.html
//
// Loaded via a plain <script> tag (not fetch/JSON), so the map keeps working
// when the HTML file is opened directly (file://) with no local server —
// same pattern used by lookouts-data.js and panoramas-data.js.
//
// Structure: one entry per labeled place.
//   name    — text shown on the map
//   lat, lng — coordinates of the place
//   minZoom — the zoom level you must reach by zooming in 
//             before the label starts, that is,
//             lowest map zoom level at which this label appears (inclusive).
//             Leave out for "always visible". Use a higher minZoom for
//             minor/cluttered places so they only show up once the user
//             has zoomed in close enough to need them.
//   maxZoom — highest map zoom level at which this label appears (inclusive).
//             Leave out for "no upper limit".
//
// ⚠ Sample entries below use placeholder coordinates near the Delilah
//   lookout center point — replace with real coordinates for the places
//   you want labeled.
const PLACES = [
  { name: "Delilah Lookout", lat: 36.802, lng: -119.11755, minZoom: 11, maxZoom: 15 },
  { name: "Park Ridge Lookout", lat: 36.72447, lng: -118.94384, minZoom: 11, maxZoom: 14 },
  { name: "Dollar General", lat: 36.73881,  lng: -119.25001,  minZoom: 14, maxZoom: 14 },
  { name: "Wonder Valley", lat: 36.79215,  lng: -119.30966,  minZoom: 12 },
  { name: "silo", lat: 36.74789,  lng: -119.45240,  minZoom: 14, maxZoom: 14 },
  { name: "Deer Crk Rec Area", lat: 36.85666,  lng: -119.33869,  minZoom: 13, maxZoom: 14 },
  { name: "Island Park", lat: 36.86364,  lng: -119.31217,  minZoom: 13, maxZoom: 14 },
  { name: "Bear Mtn", lat: 36.59632,  lng: -119.04731,  minZoom: 11, maxZoom: 13 },
  { name: "Rowell Meadow", lat: 36.71611, lng: -118.73654, minZoom: 14, maxZoom: 14 }
];
