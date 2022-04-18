const availableAmmoList = {
  '.223 Docent': {
    title: '.223 Docent',
    ammo: ['.223 Soft-Point', '.223 Polymer-Tip']
  },
  '.270 Huntsman': {
    title: '.270 Huntsman',
    ammo: ['.270 Soft-Point', '.270 Polymer-Tip']
  },
  '.300 Canning Magnum': {
    title: '.300 Canning Magnum',
    ammo: ['.300 Magnum Soft-Point', '.300 Magnum Polymer-Tip']
  },
  '.44 Panther Magnum': {
    title: '.44 Panther Magnum',
    ammo: ['.44 Flat Nose Hard-Cast', '.44 Jacketed Hollow-Point']
  },
  '7mm Regent Magnum': {
    title: '7mm Regent Magnum',
    ammo: ['7mm Mag. Soft-Point', '7mm Mag. Polymer-Tip']
  },
  'Alexander Longbow': {
    title: 'Alexander Longbow',
    ammo: [
      '350 Grain Broadhead',
      '540 Grain Broadhead',
      '700 Grain Broadhead'
    ]
  },
  'Andersson .22LR': { 
    title: 'Andersson .22LR',
    ammo: ['.22LR Jacketed Hollow-Point'] 
  },
  'Bearclaw Lite CB-60': {
    title: 'Bearclaw Lite CB-60',
    ammo: [
      '300 gr. Small Game Point',
      '420 gr. Broadhead',
      '600 gr. Broadhead'
    ]
  },
  'Cacciatore 12G': {
    title: 'Cacciatore 12G',
    ammo: ['12 GA Birdshot', '12 GA Buckshot', '12 GA Slug']
  },
  'Caversham Steward 12G': {
    title: 'Caversham Steward 12G',
    ammo: ['12 GA Birdshot', '12 GA Buckshot', '12 GA Slug']
  },
  'Coachmate Lever .45-70': {
    title: 'Coachmate Lever .45-70',
    ammo: ['.45-70 Hollow-Point', '.45-70 Soft-Point Flat Nose']
  },
  'Couso Model 1897 Vaquero': {
    title: 'Couso Model 1897 Vaquero',
    ammo: ['16 GA Birdshot', '16 GA Buckshot', '16 GA Slug']
  },
  'Crosspoint CB-165': {
    title: 'Crosspoint CB-165',
    ammo: [
      '300 gr. Small Game Point',
      '420 gr. Broadhead',
      '600 gr. Broadhead'
    ]
  },
  'Eckers .30-06 Prestige': {
    title: 'Eckers .30-06 Prestige',
    ammo: ['.30-06 Soft-Point', '.30-06 Polymer-Tip']
  },
  'F.L. Sporter .303': {
    title: 'F.L. Sporter .303',
    ammo: ['.303 British Soft-Point', '.303 British Polymer-Tip']
  },
  'Focoso 357': {
    title: 'Focoso 357',
    ammo: ['.357 Jacketed Hollow-Point', '.357 Flat Nose Hard-Cast']
  },
  'Grelck Drilling Rifle Classic': {
    title: 'Grelck Drilling Rifle Classic',
    ammo: [
      '16 GA Birdshot',
      '16 GA Buckshot',
      '16 GA Slug',
      '9.3x74R Soft Point',
      '9.3x74R Polymer-Tip'
    ]
  },
  'Hawk Edge CB-70': {
    title: 'Hawk Edge CB-70',
    ammo: [
      '300 gr. Small Game Point',
      '420 gr. Broadhead',
      '600 gr. Broadhead'
    ]
  },
  'Houyi Recurve Bow': {
    title: 'Houyi Recurve Bow',
    ammo: [
      '350 Grain Broadhead',
      '540 Grain Broadhead',
      '700 Grain Broadhead'
    ]
  },
  'Hudzik .50 Caplock Terra': {
    title: 'Hudzik .50 Caplock Terra',
    ammo: ['.50 Caliber Minié', '.50 Caliber Round']
  },
  'King 470DB Zenith': {
    title: 'King 470DB Zenith',
    ammo: [
      '.470 Nitro Express Soft Point',
      '.470 Nitro Express Full Metal Jacket'
    ]
  },
  'Koter CB-65 Bow': {
    title: 'Koter CB-65 Bow',
    ammo: [
      '300 gr. Small Game Point',
      '420 gr. Broadhead',
      '600 gr. Broadhead'
    ]
  },
  'Kullman .22H': {
    title: 'Kullman .22H',
    ammo: ['.22H Soft-Point', '.22H Polymer-Tip']
  },
  'M1 Iwaniec': {
    title: 'M1 Iwaniec',
    ammo: ['.30-06 Soft-Point', '.30-06 Polymer-Tip']
  },
  'Mangiafico 410/45 Colt': {
    title: 'Mangiafico 410/45 Colt',
    ammo: ['.45 Colt Flat Nose Hard-Cast', '.410 Birdshot']
  },
  'Martensson 6.5mm Thunder': {
    title: 'Martensson 6.5mm Thunder',
    ammo: ['6.5mm Soft-Point', '6.5mm Polymer-Tip']
  },
  'Miller Model 1891 Rancher': {
    title: 'Miller Model 1891 Rancher',
    ammo: [
      '10 GA Brass Birdshot',
      '10 GA Brass Buckshot',
      '10 GA Brass Slug'
    ]
  },
  'Nordin 20SA Serviceman': {
    title: 'Nordin 20SA Serviceman',
    ammo: [
      '20 GA Birdshot',
      '20 GA Buckshot',
      '20 GA Slug',
      '20 GA Steel Birdshot'
    ]
  },
  'Rangemaster 338': {
    title: 'Rangemaster 338',
    ammo: ['.338 Mag. Soft-Point', '.338 Mag. Polymer-Tip']
  },
  'Ranger .243': {
    title: 'Ranger .243',
    ammo: ['.243 Soft-Point', '.243 Polymer-Tip']
  },
  'Razorback Lite CB-60': {
    title: 'Razorback Lite CB-60',
    ammo: [
      '300 gr. Small Game Point',
      '420 gr. Broadhead',
      '600 gr. Broadhead'
    ]
  },
  'Rhino 454': {
    title: 'Rhino 454',
    ammo: ['.454 Flat Nose Hard-Cast', '.454 Jacketed Hollow-Point']
  },
  'Solokhin MN1890 Assembly Line': {
    title: 'Solokhin MN1890 Assembly Line',
    ammo: ['7.62x54R Soft-Point']
  },
  'Strecker SxS 20G Scarlett': {
    title: 'Strecker SxS 20G Scarlett',
    ammo: [
      '20 GA Birdshot',
      '20 GA Buckshot',
      '20 GA Slug',
      '20 GA Steel Birdshot'
    ]
  },
  'Sundberg 454': {
    title: 'Sundberg 454',
    ammo: ['.454 Flat Nose Hard-Cast', '.454 Jacketed Hollow-Point']
  },
  'Vasquez Cyclone .45': {
    title: 'Vasquez Cyclone .45',
    ammo: ['.45 Hollow-Point', '.45 Round Nose']
  },
  'Virant .22LR': {
    title: 'Virant .22LR',
    ammo: ['.22LR Jacketed Hollow-Point']
  },
  'Whitlock Model 86': {
    title: 'Whitlock Model 86',
    ammo: ['.30-30 Hollow-Point', '.30-30 Soft-Point Round Nose']
  },
  'ZARZA-10 .308': {
    title: 'ZARZA-10 .308',
    ammo: ['.308 Soft-Point', '.308 Polymer-Tip']
  },
  'ZARZA-15 .223': {
    title: 'ZARZA-15 .223',
    ammo: ['.223 Soft-Point', '.223 Polymer-Tip']
  },
  'ZARZA-15 .22LR': {
    title: 'ZARZA-15 .22LR',
    ammo: ['.22LR Truncated Cone', '.22LR Jacketed Hollow-Point']
  }
}

export default availableAmmoList;