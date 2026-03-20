// ZIP code to approximate latitude/longitude mapping for Kansas and Missouri
// Comprehensive dataset covering major cities and counties across both states
const zipCodeCoordinates: Record<string, { lat: number; lng: number }> = {
  // ========== MISSOURI ==========
  
  // Kansas City Metro Area
  '64105': { lat: 39.0997, lng: -94.5786 },
  '64106': { lat: 39.1034, lng: -94.5688 },
  '64108': { lat: 39.0869, lng: -94.5744 },
  '64109': { lat: 39.0600, lng: -94.5658 },
  '64110': { lat: 39.0392, lng: -94.5689 },
  '64111': { lat: 39.0519, lng: -94.5889 },
  '64112': { lat: 39.0412, lng: -94.5937 },
  '64113': { lat: 39.0141, lng: -94.5947 },
  '64114': { lat: 38.9453, lng: -94.5889 },
  '64116': { lat: 39.1428, lng: -94.5583 },
  '64117': { lat: 39.1772, lng: -94.5214 },
  '64118': { lat: 39.2233, lng: -94.5636 },
  '64119': { lat: 39.2342, lng: -94.4942 },
  '64120': { lat: 39.1069, lng: -94.5344 },
  '64123': { lat: 39.0981, lng: -94.5458 },
  '64124': { lat: 39.1150, lng: -94.5500 },
  '64125': { lat: 39.0917, lng: -94.5219 },
  '64126': { lat: 39.0839, lng: -94.4972 },
  '64127': { lat: 39.0608, lng: -94.5317 },
  '64128': { lat: 39.0389, lng: -94.5483 },
  '64129': { lat: 39.0247, lng: -94.5214 },
  '64130': { lat: 38.9936, lng: -94.5486 },
  '64131': { lat: 38.9772, lng: -94.5797 },
  '64132': { lat: 38.9539, lng: -94.5356 },
  '64133': { lat: 39.0044, lng: -94.4711 },
  '64134': { lat: 38.9619, lng: -94.4944 },
  '64136': { lat: 38.9164, lng: -94.4856 },
  '64137': { lat: 38.8989, lng: -94.5347 },
  '64138': { lat: 38.8672, lng: -94.5519 },
  '64139': { lat: 38.9319, lng: -94.4356 },
  '64145': { lat: 38.9144, lng: -94.5894 },
  '64146': { lat: 38.8939, lng: -94.6339 },
  '64147': { lat: 38.8622, lng: -94.6214 },
  '64149': { lat: 38.8078, lng: -94.5208 },
  '64151': { lat: 39.2556, lng: -94.6656 },
  '64152': { lat: 39.2781, lng: -94.6336 },
  '64153': { lat: 39.2211, lng: -94.6419 },
  '64154': { lat: 39.2789, lng: -94.5731 },
  '64155': { lat: 39.2447, lng: -94.5350 },
  '64156': { lat: 39.2914, lng: -94.5064 },
  '64157': { lat: 39.3383, lng: -94.5856 },
  '64158': { lat: 39.3117, lng: -94.5194 },
  '64161': { lat: 39.1019, lng: -94.5783 },
  '64163': { lat: 39.2500, lng: -94.4833 },
  '64164': { lat: 39.2831, lng: -94.4625 },
  '64165': { lat: 39.3206, lng: -94.6261 },
  '64166': { lat: 39.2000, lng: -94.7000 },
  '64167': { lat: 39.3500, lng: -94.4500 },
  
  // Independence, MO
  '64050': { lat: 39.0836, lng: -94.3503 },
  '64051': { lat: 39.0708, lng: -94.4153 },
  '64052': { lat: 39.0283, lng: -94.4308 },
  '64053': { lat: 38.9736, lng: -94.4200 },
  '64054': { lat: 38.9489, lng: -94.3547 },
  '64055': { lat: 39.0686, lng: -94.3644 },
  '64056': { lat: 39.1119, lng: -94.3764 },
  '64057': { lat: 39.1053, lng: -94.2881 },
  '64058': { lat: 39.0500, lng: -94.2500 },
  
  // Lee's Summit, MO
  '64063': { lat: 38.9108, lng: -94.3822 },
  '64064': { lat: 38.9261, lng: -94.3469 },
  '64081': { lat: 38.9108, lng: -94.3822 },
  '64082': { lat: 38.9506, lng: -94.4172 },
  '64086': { lat: 38.8794, lng: -94.2889 },
  
  // Blue Springs, MO
  '64013': { lat: 39.0169, lng: -94.2819 },
  '64014': { lat: 39.0000, lng: -94.2500 },
  '64015': { lat: 39.0294, lng: -94.2186 },
  
  // Liberty & Excelsior Springs, MO
  '64060': { lat: 39.2464, lng: -94.4192 },
  '64068': { lat: 39.3386, lng: -94.2261 },
  '64069': { lat: 39.3394, lng: -94.1633 },
  '64024': { lat: 39.3503, lng: -94.0336 },
  
  // St. Louis Metro Area
  '63101': { lat: 38.6272, lng: -90.1978 },
  '63102': { lat: 38.6322, lng: -90.1928 },
  '63103': { lat: 38.6347, lng: -90.2164 },
  '63104': { lat: 38.6094, lng: -90.2153 },
  '63105': { lat: 38.6450, lng: -90.3403 },
  '63106': { lat: 38.6686, lng: -90.2081 },
  '63107': { lat: 38.6681, lng: -90.2364 },
  '63108': { lat: 38.6400, lng: -90.2300 },
  '63109': { lat: 38.5886, lng: -90.2831 },
  '63110': { lat: 38.6186, lng: -90.2478 },
  '63111': { lat: 38.5447, lng: -90.2586 },
  '63112': { lat: 38.6558, lng: -90.2603 },
  '63113': { lat: 38.6558, lng: -90.2258 },
  '63114': { lat: 38.7208, lng: -90.3342 },
  '63115': { lat: 38.7036, lng: -90.2189 },
  '63116': { lat: 38.5850, lng: -90.2450 },
  '63117': { lat: 38.6497, lng: -90.3244 },
  '63118': { lat: 38.5956, lng: -90.2211 },
  '63119': { lat: 38.5697, lng: -90.3294 },
  '63120': { lat: 38.7003, lng: -90.2492 },
  '63121': { lat: 38.7336, lng: -90.2953 },
  '63122': { lat: 38.5975, lng: -90.4008 },
  '63123': { lat: 38.5461, lng: -90.3161 },
  '63124': { lat: 38.6664, lng: -90.3750 },
  '63125': { lat: 38.5208, lng: -90.2750 },
  '63126': { lat: 38.5439, lng: -90.3922 },
  '63127': { lat: 38.5492, lng: -90.4486 },
  '63128': { lat: 38.4953, lng: -90.3872 },
  '63129': { lat: 38.4761, lng: -90.3033 },
  '63130': { lat: 38.6667, lng: -90.3153 },
  '63131': { lat: 38.6300, lng: -90.4533 },
  '63132': { lat: 38.6833, lng: -90.3756 },
  '63133': { lat: 38.7236, lng: -90.2583 },
  '63134': { lat: 38.7456, lng: -90.3686 },
  '63135': { lat: 38.7442, lng: -90.2825 },
  '63136': { lat: 38.7547, lng: -90.2364 },
  '63137': { lat: 38.7683, lng: -90.2328 },
  '63138': { lat: 38.7778, lng: -90.2742 },
  '63139': { lat: 38.6106, lng: -90.2928 },
  '63140': { lat: 38.6950, lng: -90.2900 },
  '63141': { lat: 38.6619, lng: -90.4486 },
  '63143': { lat: 38.6200, lng: -90.3800 },
  '63144': { lat: 38.6186, lng: -90.3350 },
  '63146': { lat: 38.7000, lng: -90.4667 },
  '63147': { lat: 38.7289, lng: -90.2194 },
  
  // St. Charles County, MO
  '63301': { lat: 38.7836, lng: -90.4972 },
  '63303': { lat: 38.7878, lng: -90.5303 },
  '63304': { lat: 38.8106, lng: -90.5658 },
  '63330': { lat: 38.8942, lng: -90.8192 },
  '63341': { lat: 38.7867, lng: -90.7186 },
  '63348': { lat: 38.9172, lng: -90.6597 },
  '63357': { lat: 38.9583, lng: -90.7556 },
  '63366': { lat: 38.7472, lng: -90.6272 },
  '63367': { lat: 38.7206, lng: -90.6908 },
  '63368': { lat: 38.7597, lng: -90.7889 },
  '63373': { lat: 38.9608, lng: -90.8644 },
  '63376': { lat: 38.7364, lng: -90.4514 },
  '63385': { lat: 38.9872, lng: -91.0308 },
  
  // Jefferson County, MO
  '63010': { lat: 38.4383, lng: -90.6142 },
  '63012': { lat: 38.5039, lng: -90.5778 },
  '63019': { lat: 38.4150, lng: -90.7600 },
  '63020': { lat: 38.3656, lng: -90.7739 },
  '63021': { lat: 38.3450, lng: -90.6800 },
  '63023': { lat: 38.3428, lng: -90.8397 },
  '63025': { lat: 38.2539, lng: -90.7378 },
  '63028': { lat: 38.4517, lng: -90.7328 },
  '63043': { lat: 38.2900, lng: -90.5100 },
  '63048': { lat: 38.2083, lng: -90.7194 },
  '63049': { lat: 38.2372, lng: -90.8531 },
  '63050': { lat: 38.1281, lng: -90.7397 },
  '63051': { lat: 38.1708, lng: -90.5750 },
  
  // Columbia, MO
  '65201': { lat: 38.9517, lng: -92.3341 },
  '65202': { lat: 38.9886, lng: -92.3297 },
  '65203': { lat: 38.9289, lng: -92.3394 },
  '65211': { lat: 38.9442, lng: -92.3269 },
  '65215': { lat: 38.9400, lng: -92.3200 },
  
  // Jefferson City, MO
  '65101': { lat: 38.5767, lng: -92.1736 },
  '65109': { lat: 38.5656, lng: -92.1875 },
  
  // Springfield, MO
  '65802': { lat: 37.2153, lng: -93.2983 },
  '65803': { lat: 37.1719, lng: -93.2914 },
  '65804': { lat: 37.1644, lng: -93.3464 },
  '65806': { lat: 37.2333, lng: -93.2889 },
  '65807': { lat: 37.2481, lng: -93.3394 },
  '65809': { lat: 37.1306, lng: -93.2672 },
  '65810': { lat: 37.2700, lng: -93.2400 },
  
  // Joplin, MO
  '64801': { lat: 37.0842, lng: -94.5133 },
  '64802': { lat: 37.0614, lng: -94.4883 },
  '64803': { lat: 37.0383, lng: -94.4828 },
  '64804': { lat: 37.1167, lng: -94.5167 },
  
  // Cape Girardeau, MO
  '63701': { lat: 37.3058, lng: -89.5181 },
  '63703': { lat: 37.2958, lng: -89.5606 },
  
  // St. Joseph, MO
  '64501': { lat: 39.7683, lng: -94.8467 },
  '64503': { lat: 39.7594, lng: -94.8161 },
  '64504': { lat: 39.7550, lng: -94.7933 },
  '64505': { lat: 39.7300, lng: -94.8200 },
  '64506': { lat: 39.6900, lng: -94.8800 },
  
  // Sedalia, MO
  '65301': { lat: 38.7044, lng: -93.2283 },
  
  // Rolla, MO
  '65401': { lat: 37.9514, lng: -91.7713 },
  
  // Warrensburg, MO
  '64093': { lat: 38.7628, lng: -93.7361 },
  
  // Branson, MO
  '65616': { lat: 36.6436, lng: -93.2185 },
  
  // West Plains, MO
  '65775': { lat: 36.7272, lng: -91.8526 },
  
  // Sikeston, MO
  '63801': { lat: 36.8767, lng: -89.5878 },
  
  // Poplar Bluff, MO
  '63901': { lat: 36.7570, lng: -90.3929 },
  
  // Hannibal, MO
  '63401': { lat: 39.7084, lng: -91.3585 },
  
  // Kirksville, MO
  '63501': { lat: 40.1947, lng: -92.5833 },
  
  // Moberly, MO
  '65270': { lat: 39.4186, lng: -92.4382 },
  
  // Mexico, MO
  '65265': { lat: 39.1697, lng: -91.8829 },
  
  // Chillicothe, MO
  '64601': { lat: 39.7953, lng: -93.5524 },
  
  // Marshall, MO
  '65340': { lat: 39.1231, lng: -93.1969 },
  
  // Cameron, MO
  '64429': { lat: 39.7403, lng: -94.2408 },
  
  // Maryville, MO
  '64468': { lat: 40.3461, lng: -94.8725 },
  
  // Lebanon, MO
  '65536': { lat: 37.6806, lng: -92.6638 },
  
  // Washington, MO
  '63090': { lat: 38.5581, lng: -91.0126 },
  
  // Farmington, MO
  '63640': { lat: 37.7806, lng: -90.4218 },
  
  // Park Hills, MO
  '63601': { lat: 37.8547, lng: -90.5187 },
  
  // Fulton, MO
  '65251': { lat: 38.8469, lng: -91.9479 },
  
  // Boonville, MO
  '65233': { lat: 38.9736, lng: -92.7433 },
  
  // Raymore, MO
  '64083': { lat: 38.8028, lng: -94.4522 },
  
  // Belton, MO
  '64012': { lat: 38.8119, lng: -94.5319 },
  
  // Grain Valley, MO
  '64029': { lat: 39.0153, lng: -94.1994 },
  
  // Harrisonville, MO
  '64701': { lat: 38.6533, lng: -94.3489 },
  
  // Clinton, MO
  '64735': { lat: 38.3686, lng: -93.7783 },
  
  // Neosho, MO
  '64850': { lat: 36.8689, lng: -94.3680 },
  
  // Carthage, MO
  '64836': { lat: 37.1645, lng: -94.3269 },
  
  // Nevada, MO
  '64772': { lat: 37.8392, lng: -94.3547 },
  
  // Butler, MO
  '64730': { lat: 38.2597, lng: -94.3297 },
  
  // Bolivar, MO
  '65613': { lat: 37.6147, lng: -93.4105 },
  
  // Aurora, MO
  '65605': { lat: 36.9706, lng: -93.7183 },
  
  // Monett, MO
  '65708': { lat: 36.9289, lng: -93.9277 },
  
  // Mountain Grove, MO
  '65711': { lat: 37.1306, lng: -92.2632 },
  
  // Ava, MO
  '65608': { lat: 36.9519, lng: -92.6604 },
  
  // Camdenton, MO
  '65020': { lat: 38.0081, lng: -92.7449 },
  
  // Osage Beach, MO
  '65065': { lat: 38.1519, lng: -92.6266 },
  
  // Eldon, MO
  '65026': { lat: 38.3486, lng: -92.5816 },
  
  // California, MO
  '65018': { lat: 38.6275, lng: -92.5677 },
  
  // Versailles, MO
  '65084': { lat: 38.4317, lng: -92.8422 },
  
  // Warrenton, MO
  '63383': { lat: 38.8103, lng: -91.1393 },
  
  // Troy, MO
  '63379': { lat: 38.9806, lng: -90.9782 },
  
  // Union, MO
  '63084': { lat: 38.4506, lng: -91.0093 },
  
  // Hermann, MO
  '65041': { lat: 38.7044, lng: -91.4371 },
  
  // Owensville, MO
  '65066': { lat: 38.3458, lng: -91.5013 },
  
  // Sullivan, MO
  '63080': { lat: 38.2078, lng: -91.1604 },
  
  // Cuba, MO
  '65453': { lat: 38.0631, lng: -91.4018 },
  
  // Salem, MO
  '65560': { lat: 37.6461, lng: -91.5354 },
  
  // Houston, MO
  '65483': { lat: 37.3253, lng: -91.9568 },
  
  // Willow Springs, MO
  '65793': { lat: 36.9922, lng: -91.9693 },
  
  // Marshfield, MO
  '65706': { lat: 37.3386, lng: -92.9077 },
  
  // Nixa, MO
  '65714': { lat: 37.0414, lng: -93.2952 },
  
  // Ozark, MO
  '65721': { lat: 37.0206, lng: -93.2063 },
  
  // Republic, MO
  '65738': { lat: 37.1206, lng: -93.4788 },
  
  // Carl Junction, MO
  '64834': { lat: 37.1764, lng: -94.5655 },
  
  // Webb City, MO
  '64870': { lat: 37.1467, lng: -94.4655 },
  
  // Kennett, MO
  '63857': { lat: 36.2361, lng: -90.0551 },
  
  // Dexter, MO
  '63841': { lat: 36.7959, lng: -89.9579 },
  
  // Perryville, MO
  '63775': { lat: 37.7242, lng: -89.8612 },
  
  // Ste. Genevieve, MO
  '63670': { lat: 37.9814, lng: -90.0418 },
  
  // Jackson, MO
  '63755': { lat: 37.3822, lng: -89.6662 },
  
  // Scott City, MO
  '63780': { lat: 37.2136, lng: -89.5229 },
  
  // New Madrid, MO
  '63869': { lat: 36.5867, lng: -89.5279 },
  
  // Charleston, MO
  '63834': { lat: 36.9206, lng: -89.3506 },
  
  // Malden, MO
  '63863': { lat: 36.5567, lng: -89.9665 },
  
  // Trenton, MO
  '64683': { lat: 40.0769, lng: -93.6166 },
  
  // Brookfield, MO
  '64628': { lat: 39.7833, lng: -93.0719 },
  
  // Milan, MO
  '63556': { lat: 40.2014, lng: -93.1244 },
  
  // Richmond, MO
  '64085': { lat: 39.2794, lng: -93.9783 },
  
  // Lexington, MO
  '64067': { lat: 39.1839, lng: -93.8797 },
  
  // Higginsville, MO
  '64037': { lat: 39.0725, lng: -93.7174 },
  
  // Odessa, MO
  '64076': { lat: 38.9997, lng: -93.9549 },
  
  // Oak Grove, MO
  '64075': { lat: 39.0047, lng: -94.1289 },
  
  // Pleasant Hill, MO
  '64080': { lat: 38.7853, lng: -94.2694 },
  
  // Greenwood, MO
  '64034': { lat: 38.8514, lng: -94.3436 },
  
  // Peculiar, MO
  '64078': { lat: 38.7192, lng: -94.4572 },
  
  // Platte City, MO
  '64079': { lat: 39.3700, lng: -94.7825 },
  
  // Smithville, MO
  '64089': { lat: 39.3869, lng: -94.5811 },
  
  // Riverside, MO
  '64150': { lat: 39.1708, lng: -94.6136 },
  
  // Grandview, MO
  '64030': { lat: 38.8858, lng: -94.5333 },
  
  
  // ========== KANSAS ==========
  
  // Kansas City Metro Area (KS side)
  '66061': { lat: 38.8764, lng: -94.8192 }, // Olathe
  '66062': { lat: 38.8747, lng: -94.7403 },
  '66063': { lat: 38.8194, lng: -94.8139 },
  '66085': { lat: 38.9917, lng: -94.6850 }, // Shawnee
  '66203': { lat: 38.9942, lng: -94.6758 }, // Shawnee
  '66204': { lat: 39.0236, lng: -94.6736 }, // Overland Park
  '66205': { lat: 38.9867, lng: -94.6422 },
  '66206': { lat: 38.9631, lng: -94.6422 },
  '66207': { lat: 38.9419, lng: -94.6697 },
  '66208': { lat: 39.0539, lng: -94.6358 }, // Prairie Village
  '66209': { lat: 38.9331, lng: -94.6894 },
  '66210': { lat: 38.9094, lng: -94.7344 },
  '66211': { lat: 38.9614, lng: -94.6186 }, // Leawood
  '66212': { lat: 38.9239, lng: -94.6206 },
  '66213': { lat: 38.8947, lng: -94.6486 },
  '66214': { lat: 38.9592, lng: -94.7283 },
  '66215': { lat: 38.8886, lng: -94.7628 },
  '66216': { lat: 38.9825, lng: -94.7600 },
  '66217': { lat: 39.0581, lng: -94.7481 },
  '66218': { lat: 39.0564, lng: -94.7014 },
  '66219': { lat: 38.8478, lng: -94.7186 },
  '66220': { lat: 38.8294, lng: -94.8139 },
  '66221': { lat: 38.8439, lng: -94.6994 },
  '66223': { lat: 38.9000, lng: -94.7833 },
  '66224': { lat: 38.9833, lng: -94.7000 },
  '66226': { lat: 38.9500, lng: -94.8167 },
  '66227': { lat: 38.9297, lng: -94.8003 },
  
  // Gardner, KS
  '66030': { lat: 38.8108, lng: -94.9275 },
  
  // Spring Hill, KS
  '66083': { lat: 38.7500, lng: -94.8167 },
  
  // Bonner Springs, KS
  '66012': { lat: 39.0586, lng: -94.8833 },
  
  // Basehor, KS
  '66007': { lat: 39.1414, lng: -94.9381 },
  
  // Lansing, KS
  '66043': { lat: 39.2486, lng: -94.9003 },
  
  // Leavenworth, KS
  '66048': { lat: 39.3111, lng: -94.9225 },
  
  // Tonganoxie, KS
  '66086': { lat: 39.1097, lng: -95.0869 },
  
  // Lawrence, KS
  '66044': { lat: 38.9717, lng: -95.2353 },
  '66045': { lat: 38.9586, lng: -95.2361 },
  '66046': { lat: 38.9197, lng: -95.2694 },
  '66047': { lat: 38.9400, lng: -95.2700 },
  '66049': { lat: 39.0194, lng: -95.2858 },
  
  // Topeka, KS
  '66601': { lat: 39.0558, lng: -95.6775 },
  '66603': { lat: 39.0486, lng: -95.6778 },
  '66604': { lat: 39.0686, lng: -95.6764 },
  '66605': { lat: 39.0142, lng: -95.6869 },
  '66606': { lat: 39.0319, lng: -95.7264 },
  '66607': { lat: 38.9800, lng: -95.6800 },
  '66608': { lat: 39.0900, lng: -95.7500 },
  '66609': { lat: 39.0061, lng: -95.6542 },
  '66610': { lat: 39.0883, lng: -95.6283 },
  '66611': { lat: 39.0100, lng: -95.7400 },
  '66612': { lat: 39.0497, lng: -95.6778 },
  '66614': { lat: 39.0378, lng: -95.7611 },
  
  // Manhattan, KS
  '66502': { lat: 39.1836, lng: -96.5717 },
  '66503': { lat: 39.2164, lng: -96.5964 },
  '66506': { lat: 39.1500, lng: -96.6000 },
  
  // Junction City, KS
  '66441': { lat: 39.0286, lng: -96.8314 },
  
  // Wichita, KS
  '67201': { lat: 37.6872, lng: -97.3301 },
  '67202': { lat: 37.6889, lng: -97.3386 },
  '67203': { lat: 37.7042, lng: -97.2797 },
  '67204': { lat: 37.7233, lng: -97.4003 },
  '67205': { lat: 37.7492, lng: -97.4286 },
  '67206': { lat: 37.6886, lng: -97.2475 },
  '67207': { lat: 37.6433, lng: -97.2761 },
  '67208': { lat: 37.7200, lng: -97.3544 },
  '67209': { lat: 37.6631, lng: -97.4069 },
  '67210': { lat: 37.6558, lng: -97.3494 },
  '67211': { lat: 37.6319, lng: -97.3728 },
  '67212': { lat: 37.7097, lng: -97.3931 },
  '67213': { lat: 37.6653, lng: -97.2383 },
  '67214': { lat: 37.7533, lng: -97.2714 },
  '67215': { lat: 37.6044, lng: -97.4200 },
  '67216': { lat: 37.6494, lng: -97.2986 },
  '67217': { lat: 37.5797, lng: -97.3139 },
  '67218': { lat: 37.6828, lng: -97.2750 },
  '67219': { lat: 37.7458, lng: -97.3686 },
  '67220': { lat: 37.7567, lng: -97.2186 },
  '67226': { lat: 37.6900, lng: -97.2100 },
  '67228': { lat: 37.7800, lng: -97.2300 },
  
  // Derby, KS
  '67037': { lat: 37.5453, lng: -97.2689 },
  
  // Andover, KS
  '67002': { lat: 37.7083, lng: -97.1364 },
  
  // Hutchinson, KS
  '67501': { lat: 38.0608, lng: -97.9297 },
  '67502': { lat: 38.0400, lng: -97.9000 },
  
  // Salina, KS
  '67401': { lat: 38.8403, lng: -97.6114 },
  '67402': { lat: 38.8750, lng: -97.6667 },
  
  // Emporia, KS
  '66801': { lat: 38.4039, lng: -96.1817 },
  
  // Newton, KS
  '67114': { lat: 38.0467, lng: -97.3450 },
  
  // El Dorado, KS
  '67042': { lat: 37.8172, lng: -96.8656 },
  
  // Arkansas City, KS
  '67005': { lat: 37.0619, lng: -97.0386 },
  
  // Winfield, KS
  '67156': { lat: 37.2403, lng: -96.9956 },
  
  // McPherson, KS
  '67460': { lat: 38.3708, lng: -97.6642 },
  
  // Great Bend, KS
  '67530': { lat: 38.3647, lng: -98.7648 },
  
  // Garden City, KS
  '67846': { lat: 37.9717, lng: -100.8726 },
  
  // Dodge City, KS
  '67801': { lat: 37.7528, lng: -100.0171 },
  
  // Liberal, KS
  '67901': { lat: 37.0431, lng: -100.9210 },
  
  // Hays, KS
  '67601': { lat: 38.8792, lng: -99.3268 },
  
  // Pittsburg, KS
  '66762': { lat: 37.4108, lng: -94.7050 },
  
  // Parsons, KS
  '67357': { lat: 37.3403, lng: -95.2614 },
  
  // Coffeyville, KS
  '67337': { lat: 37.0372, lng: -95.6164 },
  
  // Independence, KS
  '67301': { lat: 37.2242, lng: -95.7083 },
  
  // Chanute, KS
  '66720': { lat: 37.6794, lng: -95.4589 },
  
  // Fort Scott, KS
  '66701': { lat: 37.8381, lng: -94.7081 },
  
  // Atchison, KS
  '66002': { lat: 39.5631, lng: -95.1217 },
  
  // Ottawa, KS
  '66067': { lat: 38.6156, lng: -95.2678 },
  
  // Paola, KS
  '66071': { lat: 38.5722, lng: -94.8794 },
  
  // Louisburg, KS
  '66053': { lat: 38.6194, lng: -94.6819 },
  
  // Eudora, KS
  '66025': { lat: 38.9433, lng: -95.0989 },
  
  // Baldwin City, KS
  '66006': { lat: 38.7750, lng: -95.1864 },
  
  // De Soto, KS
  '66018': { lat: 38.9792, lng: -94.9678 },
  
  // Edgerton, KS
  '66021': { lat: 38.7644, lng: -95.0086 },
  
  // Wellsville, KS
  '66092': { lat: 38.7181, lng: -95.0808 },
  
  // Osawatomie, KS
  '66064': { lat: 38.4972, lng: -94.9511 },
  
  // Garnett, KS
  '66032': { lat: 38.2803, lng: -95.2419 },
  
  // Iola, KS
  '66749': { lat: 37.9242, lng: -95.3989 },
  
  // Pratt, KS
  '67124': { lat: 37.6431, lng: -98.7378 },
  
  // Lyons, KS
  '67554': { lat: 38.3436, lng: -98.2017 },
  
  // Sterling, KS
  '67579': { lat: 38.2108, lng: -98.2075 },
  
  // Larned, KS
  '67550': { lat: 38.1808, lng: -99.0998 },
  
  // Colby, KS
  '67701': { lat: 39.3958, lng: -101.0521 },
  
  // Goodland, KS
  '67735': { lat: 39.3506, lng: -101.7104 },
  
  // Ulysses, KS
  '67880': { lat: 37.5819, lng: -101.3543 },
  
  // Scott City, KS
  '67871': { lat: 38.4822, lng: -100.9071 },
  
  // Russell, KS
  '67665': { lat: 38.8953, lng: -98.8581 },
  
  // Ellsworth, KS
  '67439': { lat: 38.7308, lng: -98.2281 },
  
  // Abilene, KS
  '67410': { lat: 38.9172, lng: -97.2142 },
  
  // Concordia, KS
  '66901': { lat: 39.5708, lng: -97.6625 },
  
  // Beloit, KS
  '67420': { lat: 39.4550, lng: -98.1081 },
  
  // Osborne, KS
  '67473': { lat: 39.4392, lng: -98.6981 },
  
  // Smith Center, KS
  '66967': { lat: 39.7708, lng: -98.7842 },
  
  // Norton, KS
  '67654': { lat: 39.8333, lng: -99.8915 },
  
  // Phillipsburg, KS
  '67661': { lat: 39.7558, lng: -99.3243 },
  
  // Hill City, KS
  '67642': { lat: 39.3628, lng: -99.8426 },
  
  // Oakley, KS
  '67748': { lat: 39.1264, lng: -100.8543 },
  
  // WaKeeney, KS
  '67672': { lat: 39.0247, lng: -99.8790 },
  
  // Holton, KS
  '66436': { lat: 39.4653, lng: -95.7361 },
  
  // Hiawatha, KS
  '66434': { lat: 39.8531, lng: -95.5356 },
  
  // Seneca, KS
  '66538': { lat: 39.8347, lng: -96.0642 },
  
  // Horton, KS
  '66439': { lat: 39.6650, lng: -95.5253 },
  
  // Sabetha, KS
  '66534': { lat: 39.9019, lng: -95.8003 },
  
  // Marysville, KS
  '66508': { lat: 39.8411, lng: -96.6472 },
  
  // Clay Center, KS
  '67432': { lat: 39.3769, lng: -97.1239 },
  
  // Washington, KS
  '66968': { lat: 39.8178, lng: -97.0506 },
  
  // Belleville, KS
  '66935': { lat: 39.8231, lng: -97.6317 },
  
  // Council Grove, KS
  '66846': { lat: 38.6614, lng: -96.4908 },
  
  // Burlington, KS
  '66839': { lat: 38.1953, lng: -95.7436 },
  
  // Eureka, KS
  '67045': { lat: 37.8239, lng: -96.2892 },
  
  // Augusta, KS
  '67010': { lat: 37.6867, lng: -96.9756 },
  
  // Mulvane, KS
  '67110': { lat: 37.4744, lng: -97.2442 },
  
  // Wellington, KS
  '67152': { lat: 37.2656, lng: -97.0389 },
  
  // Anthony, KS
  '67003': { lat: 37.1539, lng: -98.0317 },
  
  // Kingman, KS
  '67068': { lat: 37.6453, lng: -98.1139 },
  
  // Medicine Lodge, KS
  '67104': { lat: 37.2808, lng: -98.5803 },
  
  // Kiowa, KS
  '67070': { lat: 37.0172, lng: -98.4853 },
  
  // Greensburg, KS
  '67054': { lat: 37.6031, lng: -99.2929 },
  
  // Meade, KS
  '67864': { lat: 37.2856, lng: -100.3401 },
  
  // Hugoton, KS
  '67951': { lat: 37.1756, lng: -101.3499 },
  
  // Sublette, KS
  '67877': { lat: 37.4806, lng: -100.8482 },
};

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Get distance between two ZIP codes
export function getDistanceBetweenZips(
  fromZip: string,
  toZip: string
): string {
  const fromCoords = zipCodeCoordinates[fromZip];
  const toCoords = zipCodeCoordinates[toZip];
  
  // If either ZIP code is not in our database, return an estimate
  if (!fromCoords || !toCoords) {
    return "~5-10 miles";
  }
  
  const distance = calculateDistance(
    fromCoords.lat,
    fromCoords.lng,
    toCoords.lat,
    toCoords.lng
  );
  
  // Round to 1 decimal place
  const roundedDistance = Math.round(distance * 10) / 10;
  
  return `${roundedDistance} miles`;
}

// Get coordinates for a ZIP code (useful for future enhancements)
export function getCoordinatesForZip(zip: string): { lat: number; lng: number } | null {
  return zipCodeCoordinates[zip] || null;
}

// Check if a ZIP code is in our database
export function isZipCodeSupported(zip: string): boolean {
  return zip in zipCodeCoordinates;
}