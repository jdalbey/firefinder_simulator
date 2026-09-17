// Training scenario data for firefinder_simulator.html
//
// Loaded via a plain <script> tag, same as lookouts-data.js — keeps working
// when the HTML file is opened directly (file://) with no local server.
//
// A scenario names one or more photos (by id, from LOOKOUTS in
// lookouts-data.js) to be navigable, and — if there's smoke to find —
// where it's composited on top of one of those photos and what the
// correctly-filled-out Smoke Report should say.
//
// Structure:
//   SCENARIOS[scenarioId]
//     label      — text shown in the Scenario dropdown
//     lookout    — which LOOKOUTS entry this scenario belongs to; used to
//                  filter the Scenario dropdown when a Lookout is selected
//     photoIds   — photos the trainee can page through (Prev/Next) during
//                  this scenario, in order; smoke (if any) appears on one
//                  of them
//     smoke      — omit entirely for a "no smoke" / false-alarm scenario.
//                    photoId      — which photo in photoIds shows the smoke
//                    overlayImage — transparent plume graphic composited
//                                   onto the panorama at (xPos, yPos)
//                    xPos, yPos   — where the BASE of the plume sits on the
//                                   photo, in PIXELS, measured on the photo
//                                   file at its native resolution (the same
//                                   width/height recorded for that photo in
//                                   lookouts-data.js) — the same convention
//                                   already used for landmark markers
//                                   (x1/y1/x2/y2) in panoramas-data.js. Open
//                                   the photo file in any image editor (e.g.
//                                   GIMP, Preview, Photoshop), hover the
//                                   pointer where the smoke's base should
//                                   sit, and read off its pixel coordinates
//                                   directly — no fractions or unit
//                                   conversion needed. (0, 0) is the photo's
//                                   top-left corner; x increases left→right,
//                                   y increases top→bottom.
//                                   firefinder_simulator.html converts these
//                                   native pixel coordinates to on-screen
//                                   position each time it positions the
//                                   overlay (see initFirefinder()): xPos /
//                                   photo.width and yPos / photo.height give
//                                   the fraction across the photo, which is
//                                   then scaled to however large the photo
//                                   is currently rendered — so the same
//                                   xPos/yPos stay correctly placed at any
//                                   window size or zoom level. The overlay
//                                   image itself is anchored by this point
//                                   at its bottom-center (CSS
//                                   translate(-50%,-100%) on #smoke-overlay),
//                                   like a map pin, so xPos/yPos mark where
//                                   the smoke touches the ground, not the
//                                   top-left corner of the graphic.
//                    widthPx      — overlay's displayed width, in pixels,
//                                   measured against the SAME native photo
//                                   resolution as xPos/yPos (e.g. if you
//                                   eyeball the plume as ~100px wide on the
//                                   full-size photo, use 100 here). Scaled
//                                   the same way as xPos/yPos at render
//                                   time; height follows automatically to
//                                   keep the overlay image's own aspect
//                                   ratio.
//                    closeupImage — shown when the trainee uses Binoculars
//     answers    — the graded Smoke Report answer key. `azimuth` is NOT
//                  stored redundantly here — it's derived at grading time
//                  from smoke.xPos (as a fraction of the photo's native
//                  width) plus the photo's left_azimuth/right_azimuth, so
//                  the answer key can never drift out of sync with where
//                  the smoke is actually drawn. Only its grading tolerance
//                  (azimuth_tolerance_min) lives here.
//
//   (Time/Date and Best Access have no answer key and are never graded.)
//
// "Random" in the Scenario dropdown is not a data entry here — the app
// picks a random scenario id (excluding itself) that matches the selected
// Lookout at runtime. See pickRandomScenario() in firefinder_simulator.html.

const SCENARIOS = {

  "d1": {
    label: "Delilah #1 (Easy)", // Island Park
    lookout: "Delilah",
    photoIds: ["delilah_3"],
    smoke: {
      photoId: "delilah_3",
      overlayImage: "assets/smoke_white.png",
      xPos: 1572, yPos: 429, widthPx: 174, // pixel coords on the 1920x968 native photo
      closeupImage: "images/closeups/scenario1_closeup.png"
    },
    answers: {  
      classification: "illegitimate",
      azimuth_tolerance_min: 10,
      distance: { miles: 12, tolerance: 0.5 },
      landmark: "Island Park",
      legal: { township: 12, range: 24, section: 25, quarter: "NW" },
      base_visible: "yes",
      volume: ["medium"],
      color: ["white"],
      character: ["billowing"],
      drift: "N",
      fuel: ["grass"],
      jurisdiction: "SNF",
      dispatcher: "Sierra"
    }
  },

  "d2": {
    label: "Delilah #2 (Easy)", // Wonder Valley
    lookout: "Delilah",
    photoIds: ["delilah_2"],
    smoke: {
      photoId: "delilah_2",
      overlayImage: "assets/smoke_black.png",
      xPos: 1450, yPos: 438, widthPx: 77,   // pixel coords on the 1920x968 native photo
      closeupImage: "images/closeups/scenario2_closeup.png"
    },
    answers: { 
      classification: "illegitimate",
      azimuth_tolerance_min: 10,
      distance: { miles: 5, tolerance: 0.5 },
      landmark: "Wonder Valley",
      legal: { township: 13, range: 28, section: 9, quarter: "SW" },
      base_visible: "yes",
      volume: ["medium"],
      color: ["black"],
      character: ["column"],
      drift: "S",
      fuel: ["brush"],
      jurisdiction: "FKU",
      dispatcher: "Porterville"
    }
  },

  "d3": { 
    label: "Delilah #3 (Medium)",  //Deer Crk Rec Area
    lookout: "Delilah",
    photoIds: ["delilah_3"],
    smoke: {
      photoId: "delilah_3",
      overlayImage: "assets/smoke_leaning.png",
      xPos: 1245, yPos: 396, widthPx: 312,   // deer crk
      closeupImage: "images/closeups/scenario3_closeup.png"
    },
    answers: { 
      classification: "illegitimate",
      azimuth_tolerance_min: 10,
      distance: { miles: 13, tolerance: 0.5 },
      landmark: "Deer Crk Rec Area",
      legal: { township: 12, range: 24, section: 27, quarter: "NW" },
      base_visible: "yes",
      volume: ["medium"],
      color: ["gray"],
      character: ["Billowing"],
      drift: "N",
      fuel: ["grass"],
      jurisdiction: "FKU",
      dispatcher: "sierra"
    }
  },

  "d4": {
    label: "Delilah #4 (Medium)",  //Piedra silo
    lookout: "Delilah",
    photoIds: ["delilah_2"],
    smoke: {
      photoId: "delilah_2",
      overlayImage: "assets/smoke_copfire.png",
      xPos: 835, yPos: 279, widthPx: 90,   // pixel coords on the 1920x968 native photo
      closeupImage: "images/closeups/scenario4_closeup.png"
    },
    answers: { 
      classification: "illegitimate",
      azimuth_tolerance_min: 10,
      distance: { miles: 19, tolerance: 0.5 },
      landmark: "Piedra road silo",
      legal: { township: 14, range: 23, section: 3, quarter: "NE" },
      base_visible: "yes",
      volume: ["medium"],
      color: ["gray"],
      character: ["Billowing"],
      drift: "S",
      fuel: ["brush"],
      jurisdiction: "FKU",
      dispatcher: "none"
    }
  },

  "d5": {
    label: "Delilah #5 (Medium)",  //Logger Pt
    lookout: "Delilah",
    photoIds: ["delilah_12"],
    smoke: {
      photoId: "delilah_12",
      overlayImage: "assets/smoke_forestfire.png",
      xPos: 1525, yPos: 350, widthPx: 125,  // pixel coords on the 1919x881 native photo
      closeupImage: "images/closeups/scenario5_closeup.png"
    },
    answers: { 
      classification: "illegitimate",
      azimuth_tolerance_min: 10,
      distance: { miles: 10, tolerance: 0.5 },
      landmark: "Logger Point",
      legal: { township: 14, range: 27, section: 13, quarter: "SW" },
      base_visible: "yes",
      volume: ["medium"],
      color: ["white"],
      character: ["Billowing"],
      drift: "E",
      fuel: ["timber"],
      jurisdiction: "SQF",
      dispatcher: "porterville"
    }
  },

  "d6": {
    label: "Delilah #6 (Difficult)",  //Manzanita Hill
    lookout: "Delilah",
    photoIds: ['delilah_8','delilah_9','delilah_10','delilah_11','delilah_12','delilah_13','delilah_14','delilah_15','delilah_16',"delilah_1",'delilah_2','delilah_3','delilah_4','delilah_5','delilah_6','delilah_7',],
    smoke: {
      photoId: "delilah_11",
      overlayImage: "assets/smoke_rockyfire.png",
      xPos: 1750, yPos: 245, widthPx: 77,   // pixel coords on the 1920x968 native photo
      closeupImage: "images/closeups/scenario6_closeup.png"
    },
    answers: { 
      classification: "illegitimate",
      azimuth_tolerance_min: 10,
      distance: { miles: 10, tolerance: 0.5 },
      landmark: "Manzanita Hill",
      legal: { township: 13, range: 28, section: 32, quarter: "SE" },
      base_visible: "yes",
      volume: ["small"],
      color: ["white"],
      character: ["column"],
      drift: "N",
      fuel: ["brush"],
      jurisdiction: "SEKI",
      dispatcher: "Ash Mtn Fire"
    }
  },

  "d7": {
    label: "Delilah #7 (Difficult)", //Rough
    lookout: "Delilah",
    photoIds: ["delilah_1",'delilah_2','delilah_3','delilah_4','delilah_5','delilah_6','delilah_7','delilah_8','delilah_9','delilah_10','delilah_11','delilah_12','delilah_13','delilah_14','delilah_15','delilah_16'],
    smoke: {
      photoId: "delilah_9",
      overlayImage: "assets/smoke_ridge.png",
      xPos: 1390, yPos: 428, widthPx: 85,   // pixel coords on the 1920x968 native photo
      closeupImage: "images/closeups/scenario7_closeup.png"
    },
    answers: { 
      classification: "illegitimate",
      azimuth_tolerance_min: 50,
      distance: { miles: 12, tolerance: 0.5 },
      landmark: "Rough Creek",
      legal: { township: 12, range: 28, section: 16, quarter: "NW" },
      base_visible: "no",
      volume: ["small"],
      color: ["white"],
      character: ["thin"],
      drift: "none",
      fuel: ["timber"],
      jurisdiction: "SNF",
      dispatcher: "Sierra"
    }
  },

  "d8": {
    label: "Delilah #8 (Medium)",  // Sequoia Highlands Camp
    lookout: "Delilah",
    photoIds: ["delilah_13"],
    smoke: {
      photoId: "delilah_13",
      overlayImage: "assets/dustcloud.png",
      xPos: 1320, yPos: 404, widthPx: 77,   // pixel coords on the 1920x968 native photo
      closeupImage: "images/closeups/scenario8_closeup.png"
    },
    answers: { 
      classification: "false",
      azimuth_tolerance_min: 10,  // tolerance in minutes
      distance: { miles: 3, tolerance: 0.6 },
      landmark: "Sequoia Highlands Camp",
      legal: { township: 13, range: 26, section: 25, quarter: "NE" },
      base_visible: "yes",
      volume: ["small"],
      color: ["brown"],
      character: ["column"],
      drift: "none",
      fuel: ["timber"],
      jurisdiction: "SQF",
      dispatcher: "Porterville"
    }
  },
  "b1": {
    label: "Buck Rock #1 (Easy)",  // Rowell Mdw
    lookout: "Buck Rock",
    photoIds: ["buckrock_1"],
    smoke: {
      photoId: "buckrock_1",
      overlayImage: "assets/smoke_dome.png",
      xPos: 351, yPos: 405, widthPx: 436,   // pixel coords on the 1920x968 native photo
      closeupImage: "images/closeups/scenarioBR1_closeup.png"
    },
    answers: { 
      classification: "illegitimate",
      azimuth_tolerance_min: 10,  // tolerance in minutes
      distance: { miles: 8, tolerance: 0.6 },
      landmark: "Rowell Meadow",
      legal: { township: 14, range: 30, section: 16, quarter: "NE" },
      base_visible: "no",
      volume: ["small"],
      color: ["gray"],
      character: ["billowing"],
      drift: "N",
      fuel: ["timber"],
      jurisdiction: "SQF",
      dispatcher: "Porterville"
    }
  },
  "p1": {
    label: "Park Ridge #1 (Easy)",  // Rowell Mdw
    lookout: "Park Ridge",
    photoIds: ["parkridge_1"],
    smoke: {
      photoId: "parkridge_1",
      overlayImage: "assets/smoke_chews.png",
      xPos: 1441, yPos: 748, widthPx: 539,   // pixel coords on the 1920x968 native photo
      closeupImage: null
    },
    answers: { 
      classification: "illegitimate",
      azimuth_tolerance_min: 10,  // tolerance in minutes
      distance: { miles: 2.5, tolerance: 0.6 },
      landmark: "Eshom Campground",
      legal: { township: 14, range: 28, section: 20, quarter: "SE" },
      base_visible: "no",
      volume: ["small"],
      color: ["gray"],
      character: ["billowing"],
      drift: "none",
      fuel: ["timber"],
      jurisdiction: "SQF",
      dispatcher: "Porterville"
    }
  },

};
