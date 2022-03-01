const animalsArray =
{
  'American Alligator': {
    title: 'American Alligator',
    animalclass: 6,
    trophytype: 'Length',
    trophyscore: { silver: 266, gold: 378, diamond: 492 },
    furtypes: ['Common', 'Albino', 'Dark-Brown', 'Melanistic', 'Olive', 'Piebald'],
    reserves: ['Mississippi Acres']
  },
  'Antelope Jackrabbit': {
    title: 'Antelope Jackrabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.8, gold: 4.8, diamond: 6.3 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark Brown',
      'Grey',
      'Melanistic',
      'Mottled'
    ],
    reserves: ['Rancho del Arroyo']
  },
  'Axis Deer': {
    title: 'Axis Deer',
    animalclass: 3,
    trophytype: 'Antlers',
    trophyscore: { silver: 72.8, gold: 155.3, diamond: 217.2 },
    furtypes: ['Common', 'Albino', 'Dark', 'Melanistic', 'Orange', 'Piebald', 'Spotted'],
    reserves: ['Parque Fernando']
  },
  'Beceite Ibex': {
    title: 'Beceite Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 78, gold: 142.9, diamond: 191.6 },
    furtypes: ['Common',
      'Albino',
      'Brown Hybrid',
      'Buff',
      'Grey',
      'Grey-Brown',
      'Light Brown',
      'Melanistic',
      'Orange'
    ],
    reserves: ['Cuatro Colinas']
  },
  'Bighorn Sheep': {
    title: 'Bighorn Sheep',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 90.3, gold: 132.7, diamond: 164.6 },
    furtypes: ['Common', 'Albino', 'Black', 'Bronze', 'Brown', 'Grey-Brown'],
    reserves: ['Silver Ridge Peaks', 'Rancho del Arroyo']
  },
  'Black Bear': {
    title: 'Black Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 14.4, gold: 19.2, diamond: 22.8 },
    furtypes: ['Common', 'Black', 'Blonde', 'Brown', 'Cinnamon', 'Dark', 'Dusky'],
    reserves: ['Layton Lake', 'Silver Ridge Peaks', 'Mississippi Acres']
  },
  Blackbuck: {
    title: 'Blackbuck',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 71.8, gold: 106.3, diamond: 132.2 },
    furtypes: ['Common', 'Melanistic', 'Black', 'Leucistic', 'Brown', 'Dark'],
    reserves: ['Parque Fernando']
  },
  'Blacktail Deer': {
    title: 'Blacktail Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 76.9, gold: 134.4, diamond: 177.5 },
    furtypes: ['Common',
      'Albino',
      'Dark Grey',
      'Grey',
      'Grey-Brown',
      'Melanistic',
      'Piebald',
      'Tan'
    ],
    reserves: ['Layton Lake']
  },
  'Blue Wildebeest': {
    title: 'Blue Wildebeest',
    animalclass: 6,
    trophytype: 'Horns',
    trophyscore: { silver: 21.6, gold: 30.8, diamond: 37.7 },
    furtypes: ['Common', 'Albino', 'Crowned', 'Gold', 'Grey'],
    reserves: ['Vurhonga Savanna']
  },
  'Bobwhite Quail': {
    title: 'Bobwhite Quail',
    animalclass: 1,
    trophytype: 'Combined',
    trophyscore: { silver: 159, gold: 217, diamond: 260.5 },
    furtypes: ['Common', 'Brown', 'Grey', 'Red', 'Red-Brown', 'Albino'],
    reserves: ['Mississippi Acres']
  },
  'Canada Goose': {
    title: 'Canada Goose',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 4.4, gold: 6.8, diamond: 8.5 },
    furtypes: ['Common',
      'Bald Leucistic',
      'Brown Hybrid',
      'Grey',
      'Grey-Brown',
      'Light Grey Leucistic',
      'Melanistic'
    ],
    reserves: ['Hirschfelden']
  },
  'Cape Buffalo': {
    title: 'Cape Buffalo',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 73.3, gold: 117.9, diamond: 151.4 },
    furtypes: ['Common', 'Black', 'Grey', 'Brown', 'Albino', 'Leucistic'],
    reserves: ['Vurhonga Savanna']
  },
  Caribou: {
    title: 'Caribou',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 152.5, gold: 311.2, diamond: 430.2 },
    furtypes: ['Common', 'Albino', 'Dark-Brown', 'Leucistic', 'Melanistic', 'Piebald'],
    reserves: ['Yukon Valley']
  },
  Chamois: {
    title: 'Chamois',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 30.8, gold: 46.3, diamond: 58 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Grey Brown',
      'Honeytones',
      'Leucistic',
      'Melanistic',
      'Tan'
    ],
    reserves: ['Te Awaroa']
  },
  'Cinnamon Teal': {
    title: 'Cinnamon Teal',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.4, gold: 4.1, diamond: 4.6 },
    furtypes: ['Common', 'Beige', 'Cinnamon', 'Melanistic', 'Piebald', 'Red'],
    reserves: ['Parque Fernando']
  },
  'Collared Peccary': {
    title: 'Collared Peccary',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 37.5, gold: 98.5, diamond: 144.2 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Dark-Grey',
      'Grey',
      'Leucistic',
      'Melanistic',
      'Ochre'
    ],
    reserves: ['Rancho del Arroyo']
  },
  'Common Raccoon': {
    title: 'Common Raccoon',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 5, gold: 9, diamond: 12 },
    furtypes: ['Common',
      'Albino',
      'Blonde',
      'Brown',
      'Grey',
      'Melanistic',
      'Blonde Piebald',
      'Brown Piebald',
      'Grey Piebald'
    ],
    reserves: ['Mississippi Acres']
  },
  Coyote: {
    title: 'Coyote',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 38.4, gold: 48.9, diamond: 56.8 },
    furtypes: ['Common',
      'Albino',
      'Dark-Grey',
      'Grey-Brown',
      'Light Grey',
      'Melanistic',
      'Orange',
      'Piebald'
    ],
    reserves: ['Layton Lake', 'Rancho del Arroyo']
  },
  'Eastern Cottontail Rabbit': {
    title: 'Eastern Cottontail Rabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 1, gold: 1.5, diamond: 1.9 },
    furtypes: ['Common', 'Brown', 'Grey', 'Light Brown'],
    reserves: ['Mississippi Acres']
  },
  'Eastern Wild Turkey': {
    title: 'Eastern Wild Turkey',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.5, gold: 3.7, diamond: 4.6 },
    furtypes: ['Common', 'Bronze', 'Brown', 'Light Bronze', 'Light Brown'],
    reserves: ['Mississippi Acres']
  },
  'Brown Bear': {
    title: 'Brown Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 18.6, gold: 23.8, diamond: 27.7 },
    furtypes: ['Common',
      'Albino',
      'Blond',
      'Cinnamon',
      'Dark-Brown',
      'Gold',
      'Grey',
      'Light Brown',
      'Melanistic',
      'Red-Brown'
    ],
    reserves: ['Medved Taiga']
  },
  Lynx: {
    title: 'Lynx',
    animalclass: 3,
    trophytype: 'Skull',
    trophyscore: { silver: 18.6, gold: 23.8, diamond: 27.7 },
    furtypes: ['Common', 'Albino', 'Grey', 'Light Brown', 'Melanistic', 'Piebald'],
    reserves: ['Medved Taiga']
  },
  'European Bison': {
    title: 'European Bison',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 63.2, gold: 181.6, diamond: 270.4 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Light Brown',
      'Melanistic',
      'Piebald'
    ],
    reserves: ['Hirschfelden']
  },
  'European Hare': {
    title: 'European Hare',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.5, gold: 5, diamond: 6.5 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Grey',
      'Light Brown',
      'Melanistic'
    ],
    reserves: ['Cuatro Colinas']
  },
  'European Rabbit': {
    title: 'European Rabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 1, gold: 1.9, diamond: 2.4 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Leucistic',
      'Light Brown',
      'Light Grey',
      'Melanistic',
      'Tan'
    ],
    reserves: ['Hirschfelden', 'Te Awaroa']
  },
  'Fallow Deer': {
    title: 'Fallow Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 68, gold: 173, diamond: 251.7 },
    furtypes: ['Common',
      'Albino',
      'Dark',
      'Dark Spotted',
      'Melanistic',
      'Piebald',
      'Red Spotted',
      'Spotted'
    ],
    reserves: ['Hirschfelden', 'Te Awaroa']
  },
  'Feral Goat': {
    title: 'Feral Goat',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 89.4, gold: 157.6, diamond: 208.7 },
    furtypes: ['Common',
      'Albino', 'Black',
      'Black-Brown', 'Black-White',
      'Blonde', 'Brown',
      'Dark-Brown', 'Mixed',
      'White', 'White-Brown'
    ],
    reserves: ['Te Awaroa']
  },
  'Feral Pig': {
    title: 'Feral Pig',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 37.5, gold: 98.5, diamond: 144.2 },
    furtypes: ['Common',
      'Albino',
      'Blackgold',
      'Black Spots',
      'Brown',
      'Brown Hybrid',
      'Dark Brown',
      'Pink'
    ],
    reserves: ['Te Awaroa', 'Mississippi Acres']
  },
  Gemsbok: {
    title: 'Gemsbok',
    animalclass: 8,
    trophytype: 'Horns',
    trophyscore: { silver: 194.8, gold: 276.3, diamond: 337.5 },
    furtypes: ['Common', 'Dark', 'Common', 'Beige', 'Grey', 'Gold'],
    reserves: ['Vurhonga Savanna']
  },
  'Gray Fox': {
    title: 'Gray Fox',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 3.8, gold: 5.3, diamond: 6.4 },
    furtypes: ['Common',
      'Albino',
      'Grey',
      'Leucistic',
      'Piebald',
      'Red',
      'Two Tones',
      'Melanistic'
    ],
    reserves: ['Mississippi Acres']
  },
  'Gray Wolf': {
    title: 'Gray Wolf',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: ['Common', 'Albino', 'Eggwhite', 'Grey', 'Melanistic', 'Red Brown'],
    reserves: ['Yukon Valley']
  },
  'Gredos Ibex': {
    title: 'Gredos Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 54.3, gold: 80.5, diamond: 100.1 },
    furtypes: ['Common',
      'Albino',
      'Brown Hybrid',
      'Buff',
      'Gray-Brown',
      'Grey',
      'Light Brown',
      'Light Grey',
      'Melanistic'
    ],
    reserves: ['Cuatro Colinas']
  },
  'Grizzly Bear': {
    title: 'Grizzly Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 52.6, gold: 60.8, diamond: 67 },
    furtypes: ['Common', 'Common', 'Melanistic', 'Brown', 'Albino'],
    reserves: ['Yukon Valley']
  },
  'Harlequin Duck': {
    title: 'Harlequin Duck',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 5.3, gold: 6.4, diamond: 7.2 },
    furtypes: ['Common', 'Common', 'Dark', 'Piebald', 'Grey', 'Albino', 'Melanistic'],
    reserves: ['Yukon Valley']
  },
  'Iberian Mouflon': {
    title: 'Iberian Mouflon',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 97, gold: 144.2, diamond: 179.6 },
    furtypes: ['Common', 'Albino', 'Brown', 'Grey', 'Light Brown', 'Melanistic'],
    reserves: ['Cuatro Colinas']
  },
  'Iberian Wolf': {
    title: 'Iberian Wolf',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: ['Common',
      'Albino', 'Fantasma',
      'Grey', 'Grey-Brown',
      'Melanistic', 'Ogro',
      'Olive', 'Sombra',
      'Pristine', 'Winter'
    ],
    reserves: ['Cuatro Colinas']
  },
  'White-tailed Jackrabbit': {
    title: 'White-tailed Jackrabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.8, gold: 4.8, diamond: 6.3 },
    furtypes: ['Common', 'Albino', 'Brown', 'Grey', 'Light Brown'],
    reserves: ['Layton Lake']
  },
  'Lesser Kudu': {
    title: 'Lesser Kudu',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 107.8, gold: 132.8, diamond: 151.6 },
    furtypes: ['Common',
      'Albino',
      'Grey',
      'Common',
      'Dark Brown',
      'Dusky',
      'Melanistic',
      'Red Brown'
    ],
    reserves: ['Vurhonga Savanna']
  },
  Lion: {
    title: 'Lion',
    animalclass: 9,
    trophytype: 'Skull',
    trophyscore: { silver: 38, gold: 44, diamond: 48.5 },
    furtypes: ['Common', 'Albino', 'Blonde', 'Dark-Brown', 'Light Brown', 'Tan'],
    reserves: ['Vurhonga Savanna']
  },
  Mallard: {
    title: 'Mallard',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 9.9, gold: 15.4, diamond: 19.6 },
    furtypes: ['Common',
      'Black-Brown',
      'Blonde',
      'Brown Hybrid',
      'Leucistic',
      'Melanistic',
      'Piebald'
    ],
    reserves: ['Layton Lake']
  },
  "Merriam's Turkey": {
    title: "Merriam's Turkey",
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.3, gold: 4, diamond: 4.6 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Grey ?',
      'Leucistic',
      'Light Brown',
      'Melanistic'
    ],
    reserves: ['Silver Ridge Peaks', 'Te Awaroa']
  },
  'Mexican Bobcat': {
    title: 'Mexican Bobcat',
    animalclass: 3,
    trophytype: 'Skull',
    trophyscore: { silver: 18.5, gold: 23.7, diamond: 27.6 },
    furtypes: ['Common',
      'Albino',
      'Blue',
      'Brown',
      'Light Brown',
      'Melanistic',
      'Red',
      'Tan'
    ],
    reserves: ['Rancho del Arroyo']
  },
  Moose: {
    title: 'Moose',
    animalclass: 8,
    trophytype: 'Antlers',
    trophyscore: { silver: 86.2, gold: 194, diamond: 274.9 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Light Brown',
      'Melanistic',
      'Mocha',
      'Piebald',
      'Tan'
    ],
    reserves: ['Layton Lake', 'Medved Taiga', 'Yukon Valley']
  },
  'Mountain Goat': {
    title: 'Mountain Goat',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 52.7, gold: 84.1, diamond: 107.6 },
    furtypes: ['Common',
      'Albino',
      'Beige',
      'Light Brown',
      'Light Grey',
      'Melanistic',
      'White'
    ],
    reserves: ['Silver Ridge Peaks']
  },
  'Mountain Lion': {
    title: 'Mountain Lion',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: ['Common', 'Albino', 'Dark Red', 'Grey', 'Light Brown', 'Melanistic'],
    reserves: ['Silver Ridge Peaks']
  },
  'Mule Deer': {
    title: 'Mule Deer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 98.9, gold: 222.2, diamond: 314.8 },
    furtypes: ['Common',
      'Albino',
      'Blonde',
      'Brown',
      'Dilute',
      'Grey',
      'Melanistic',
      'Piebald'
    ],
    reserves: ['Parque Fernando', 'Silver Ridge Peaks', 'Rancho del Arroyo']
  },
  'Plains Bison': {
    title: 'Plains Bison',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 50.7, gold: 148.1, diamond: 221.1 },
    furtypes: ['Common', 'Common', 'Albino', 'Leucistic', 'Melanistic'],
    reserves: ['Yukon Valley', 'Silver Ridge Peaks']
  },
  Pronghorn: {
    title: 'Pronghorn',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 46, gold: 75.7, diamond: 98 },
    furtypes: ['Common', 'Dark', 'Tan', 'Piebald', 'Albino', 'Leucistic'],
    reserves: ['Silver Ridge Peaks']
  },
  Puma: {
    title: 'Puma',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: ['Common', 'Albino', 'Dark Red', 'Grey', 'Light Brown', 'Melanistic'],
    reserves: ['Parque Fernando']
  },
  'Red Deer': {
    title: 'Red Deer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 90.5, gold: 182.2, diamond: 251.6 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark Brown',
      'Grey',
      'Light Brown',
      'Melanistic',
      'Piebald',
      'Spotted (Fabled)'
    ],
    reserves: [
      'Hirschfelden',
      'Parque Fernando',
      'Cuatro Colinas',
      'Te Awaroa'
    ]
  },
  'Red Fox': {
    title: 'Red Fox',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 4.7, gold: 10, diamond: 14.1 },
    furtypes: ['Common', 'Albino', 'Dark Red', 'Melanistic', 'Orange', 'Piebald', 'Red'],
    reserves: ['Hirschfelden', 'Yukon Valley']
  },
  Reindeer: {
    title: 'Reindeer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 152.5, gold: 311.2, diamond: 430.2 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Leucistic',
      'Light Brown',
      'Melanistic',
      'Piebald',
      'Tan'
    ],
    reserves: ['Medved Taiga']
  },
  'Ring-Necked Pheasant': {
    title: 'Ring-Necked Pheasant',
    animalclass: 1,
    trophytype: 'Combined',
    trophyscore: { silver: 9.1, gold: 15.5, diamond: 20.3 },
    furtypes: ['Common', 'Albino', 'Brown', 'Grey', 'Leucistic', 'Melanistic', 'Molting'],
    reserves: ['Rancho del Arroyo']
  },
  'Rio Grande Turkey': {
    title: 'Rio Grande Turkey',
    animalclass: 1,
    trophytype: 'Combined',
    trophyscore: { silver: 3.3, gold: 4, diamond: 4.6 },
    furtypes: ['Common',
      'Albino',
      'Buff',
      'Brown',
      'Leucistic',
      'Light Brown',
      'Light Buff',
      'Light Copper',
      'Melanistic'
    ],
    reserves: ['Rancho del Arroyo']
  },
  'Rocky Mountain Elk': {
    title: 'Rocky Mountain Elk',
    animalclass: 8,
    trophytype: 'Antlers',
    trophyscore: { silver: 177.8, gold: 351.3, diamond: 481.4 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Common',
      'Light Grey',
      'Piebald',
      'Melanistic'
    ],
    reserves: ['Silver Ridge Peaks']
  },
  'Roe Deer': {
    title: 'Roe Deer',
    animalclass: 3,
    trophytype: 'Antlers',
    trophyscore: { silver: 41, gold: 64.3, diamond: 81.8 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Dark-Grey',
      'Melanistic',
      'Orange',
      'Piebald',
      'Tan'
    ],
    reserves: ['Hirschfelden', 'Cuatro Colinas']
  },
  'Ronda Ibex': {
    title: 'Ronda Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 69.2, gold: 91.4, diamond: 107.9 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Brown Hybrid',
      'Buff',
      'Grey',
      'Grey-Brown',
      'Melanistic'
    ],
    reserves: ['Cuatro Colinas']
  },
  'Roosevelt Elk': {
    title: 'Roosevelt Elk',
    animalclass: 8,
    trophytype: 'Antlers',
    trophyscore: { silver: 128.7, gold: 272.8, diamond: 380.8 },
    furtypes: ['Common', 'Albino', 'Brown', 'Melanistic', 'Orange', 'Piebald', 'Tan'],
    reserves: ['Layton Lake']
  },
  'Scrub Hare': {
    title: 'Scrub Hare',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.4, gold: 4.1, diamond: 5.3 },
    furtypes: ['Common', 'Grey', 'Light Grey', 'Chestnut', 'Brown'],
    reserves: ['Vurhonga Savanna']
  },
  'Musk Deer': {
    title: 'Musk Deer',
    animalclass: 2,
    trophytype: 'Tusks',
    trophyscore: { silver: 60, gold: 168, diamond: 249 },
    furtypes: ['Common',
      'Albino',
      'Dark-Brown',
      'Grey-Brown',
      'Melanistic',
      'Orange',
      'Piebald'
    ],
    reserves: ['Medved Taiga']
  },
  'Side-Striped Jackal': {
    title: 'Side-Striped Jackal',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 16.8, gold: 23.8, diamond: 29.1 },
    furtypes: ['Common', 'Grey', 'Light Brown', 'Grey Brown', 'Albino', 'Melanistic'],
    reserves: ['Vurhonga Savanna']
  },
  'Sika Deer': {
    title: 'Sika Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 53.2, gold: 136.4, diamond: 198.7 },
    furtypes: ['Common',
      'Albino',
      'Black',
      'Brown',
      'Dark Spotted',
      'Red Spotted',
      'Spotted'
    ],
    reserves: ['Te Awaroa']
  },
  'Southeastern Spanish Ibex': {
    title: 'Southeastern Spanish Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 49.7, gold: 72.5, diamond: 89.6 },
    furtypes: ['Common',
      'Albino',
      'Brown Hybrid',
      'Buff',
      'Grey-Brown',
      'Light Brown',
      'Light Grey',
      'Melanistic',
      'Orange'
    ],
    reserves: ['Cuatro Colinas']
  },
  Springbok: {
    title: 'Springbok',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 69.4, gold: 93, diamond: 110.7 },
    furtypes: ['Common', 'Albino', 'Black-Brown', 'Dark-Brown', 'Orange'],
    reserves: ['Vurhonga Savanna']
  },
  Warthog: {
    title: 'Warthog',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 24.6, gold: 43.8, diamond: 58.2 },
    furtypes: ['Common', 'Albino', 'Grey', 'Common', 'Red Brown', 'Red'],
    reserves: ['Vurhonga Savanna']
  },
  'Water Buffalo': {
    title: 'Water Buffalo',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 84.2, gold: 138.1, diamond: 167.5 },
    furtypes: ['Common', 'Albino', 'Black', 'Brown', 'Grey', 'Orange'],
    reserves: ['Parque Fernando']
  },
  'Whitetail Deer': {
    title: 'Whitetail Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 112, gold: 193.7, diamond: 255 },
    furtypes: ['Common',
      'Albino',
      'Brown',
      'Dark-Brown',
      'Melanistic',
      'Piebald',
      'Red-Brown',
      'Tan',
      'Fabled Piebald'
    ],
    reserves: ['Layton Lake', 'Rancho del Arroyo', 'Mississippi Acres']
  },
  'Wild Boar': {
    title: 'Wild Boar',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 37.5, gold: 98.5, diamond: 144.2 },
    furtypes: ['Common',
      'Albino',
      'Blackgold',
      'Brown',
      'Dark-Brown',
      'Light Brown',
      'Melanistic'
    ],
    reserves: ['Hirschfelden', 'Medved Taiga', 'Cuatro Colinas']
  }
}

export default animalsArray;
