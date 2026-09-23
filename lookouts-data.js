// Lookout + panorama photo data for firefinder_simulator.html
//
// Loaded via a plain <script> tag (not fetch/JSON), so the app keeps working
// when the HTML file is opened directly (file://) with no local server —
// same pattern used by panoramas-data.js for Know-your-territory.html.
//
// Structure:
//   LOOKOUTS[lookoutName]
//     lat, lng — the lookout tower's own real-world coordinates. Passed to
//                mapview.html (see openMapView() in firefinder_simulator.html)
//                so the map centers on and draws its sight-line from the
//                correct lookout instead of always defaulting to Delilah's.
//     inchesPerMile — the scale of this lookout's physical Firefinder map
//                (e.g. 0.5 means .5" = 1 mile). Passed to mapview.html so
//                the sight-line's index-mark labels read in inches on the
//                right scale. Defaults to 0.5 in mapview.html if omitted.
//     photos[] — one entry per photo in that lookout's 360° panorama set,
//                in left-to-right order
//       id            — unique identifier, referenced by scenarios-data.js
//       src           — path to the photo, relative to firefinder_simulator.html
//       width, height — native pixel dimensions of the photo (measured from
//                       the actual image files)
//       left_azimuth  — compass bearing in degrees at the LEFT edge of the photo
//       right_azimuth — compass bearing in degrees at the RIGHT edge of the photo
//

const LOOKOUTS = {
  "Delilah": {
    lat: 36.80454, lng: -119.11755,   // matches the point mapview.html/mapview's sight-line math was validated against
    inchesPerMile: 0.5,
    photos: [
      { id: "delilah_1",  src: "images/Landmarks_Delilah1.png",  width: 1920, height: 968,  left_azimuth: 223.11,  right_azimuth: 247.14},
      { id: "delilah_2",  src: "images/Landmarks_Delilah2.png",  width: 1920, height: 892,  left_azimuth: 247.0, right_azimuth: 271.16 },
      { id: "delilah_3",  src: "images/Landmarks_Delilah3.png",  width: 1920, height: 870,  left_azimuth: 271.38, right_azimuth: 295.36 },
// From image to bearing calc
//      { id: "delilah_3",  src: "images/Landmarks_Delilah3_narrow.png",  width: 1847, height: 870,  left_azimuth: 272.29, right_azimuth: 295.36},
      { id: "delilah_4",  src: "images/Landmarks_Delilah4.png",  width: 1920, height: 921,  left_azimuth: 293.82, right_azimuth: 321.12 }, 
      { id: "delilah_5",  src: "images/Landmarks_Delilah5.png",  width: 1920, height: 1009, left_azimuth: 317.41, right_azimuth: 338.55 }, 
      { id: "delilah_6",  src: "images/Landmarks_Delilah6.png",  width: 1920, height: 1146, left_azimuth: 338.55, right_azimuth: 359.03 }, 
      { id: "delilah_7",  src: "images/Landmarks_Delilah7.png",  width: 1920, height: 1014, left_azimuth: 359.03, right_azimuth: 21 },
      { id: "delilah_8",  src: "images/Landmarks_Delilah8.png",  width: 1920, height: 1344, left_azimuth: 21, right_azimuth: 42.4 }, 
      { id: "delilah_9",  src: "images/Landmarks_Delilah9.png",  width: 1919, height: 1009, left_azimuth: 41.21, right_azimuth: 66.71 },
      { id: "delilah_10", src: "images/Landmarks_Delilah10.png", width: 1919, height: 1042, left_azimuth: 66.71, right_azimuth: 91 },
      { id: "delilah_11", src: "images/Landmarks_Delilah11.png", width: 1919, height: 1265, left_azimuth: 91, right_azimuth: 116.63 },
      { id: "delilah_12", src: "images/Landmarks_Delilah12.png", width: 1919, height: 984,  left_azimuth: 116.63, right_azimuth: 142 },
      { id: "delilah_13", src: "images/Landmarks_Delilah13.png", width: 1920, height: 888,  left_azimuth: 140.28, right_azimuth: 162.43 }, 
      { id: "delilah_14", src: "images/Landmarks_Delilah14.png", width: 1920, height: 1004, left_azimuth: 162.41, right_azimuth: 184.73 }, 
      { id: "delilah_15", src: "images/Landmarks_Delilah15.png", width: 1920, height: 1006, left_azimuth: 185, right_azimuth: 214 }, 
      { id: "delilah_16", src: "images/Landmarks_Delilah16.png", width: 1920, height: 1007, left_azimuth: 206, right_azimuth: 229.5 }  
    ]
  },

  "Buck Rock": {
    lat: 36.73725, lng: -118.86064,
    inchesPerMile: 1,
    photos: [
      { id: "buckrock_1",  src: "images/Landmarks_BuckRock1.jpg",  width: 1920, height: 784,  left_azimuth: 99.89,  right_azimuth: 110.85},
    ]
  },

  "Park Ridge": {
    lat: 36.72447, lng: -118.94384,   
    inchesPerMile: 0.5,
    photos: [
      { id: "parkridge_1",  src: "images/ParkRidge1.jpg",  width: 1920, height: 870,  left_azimuth: 170.35,  right_azimuth: 195.09},
] 
  }
};
