const animalsArray = {
  'American Alligator': {
    title: 'American Alligator',
    animalclass: 6,
    trophytype: 'Length',
    trophyscore: { silver: 266, gold: 378, diamond: 492 },
    furtypes: ['Albino', 'Dark-Brown', 'Melanistic', 'Olive', 'Piebald']
  },
  'Antelope Jackrabbit': {
    title: 'Antelope Jackrabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.8, gold: 4.8, diamond: 6.3 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark Brown',
      'Grey',
      'Melanistic',
      'Mottled'
    ]
  },
  'Axis Deer': {
    title: 'Axis Deer',
    animalclass: 3,
    trophytype: 'Antlers',
    trophyscore: { silver: 72.8, gold: 155.3, diamond: 217.2 },
    furtypes: ['Albino', 'Dark', 'Melanistic', 'Orange', 'Piebald', 'Spotted']
  },
  'Beceite Ibex': {
    title: 'Beceite Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 78, gold: 142.9, diamond: 191.6 },
    furtypes: [
      'Albino',
      'Brown Hybrid',
      'Buff',
      'Grey',
      'Grey-Brown',
      'Light Brown',
      'Melanistic',
      'Orange'
    ]
  },
  'Bighorn Sheep': {
    title: 'Bighorn Sheep',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 90.3, gold: 132.7, diamond: 164.6 },
    furtypes: ['Albino', 'Black', 'Bronze', 'Brown', 'Grey-Brown']
  },
  'Black Bear': {
    title: 'Black Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 14.4, gold: 19.2, diamond: 22.8 },
    furtypes: ['Black', 'Blonde', 'Brown', 'Cinnamon', 'Dark', 'Dusky']
  },
  Blackbuck: {
    title: 'Blackbuck',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 71.8, gold: 106.3, diamond: 132.2 },
    furtypes: ['Melanistic', 'Black', 'Leucistic', 'Brown', 'Dark']
  },
  'Blacktail Deer': {
    title: 'Blacktail Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 76.9, gold: 134.4, diamond: 177.5 },
    furtypes: [
      'Albino',
      'Dark Grey',
      'Grey',
      'Grey-Brown',
      'Melanistic',
      'Piebald',
      'Tan'
    ]
  },
  'Blue Wildebeest': {
    title: 'Blue Wildebeest',
    animalclass: 6,
    trophytype: 'Horns',
    trophyscore: { silver: 21.6, gold: 30.8, diamond: 37.7 },
    furtypes: ['Albino', 'Crowned', 'Gold', 'Grey']
  },
  'Bobwhite Quail': {
    title: 'Bobwhite Quail',
    animalclass: 1,
    trophytype: 'Combined',
    trophyscore: { silver: 159, gold: 217, diamond: 260.5 },
    furtypes: ['Brown', 'Grey', 'Red', 'Red-Brown', 'Albino']
  },
  'Canada Goose': {
    title: 'Canada Goose',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 4.4, gold: 6.8, diamond: 8.5 },
    furtypes: [
      'Bald Leucistic',
      'Brown Hybrid',
      'Grey',
      'Grey-Brown',
      'Light Grey Leucistic',
      'Melanistic'
    ]
  },
  'Cape Buffalo': {
    title: 'Cape Buffalo',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 73.3, gold: 117.9, diamond: 151.4 },
    furtypes: ['Black', 'Grey', 'Brown', 'Albino', 'Leucistic']
  },
  Caribou: {
    title: 'Caribou',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 152.5, gold: 311.2, diamond: 430.2 },
    furtypes: ['Albino', 'Dark-Brown', 'Leucistic', 'Melanistic', 'Piebald']
  },
  Chamois: {
    title: 'Chamois',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 30.8, gold: 46.3, diamond: 58 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Grey Brown',
      'Honeytones',
      'Leucistic',
      'Melanistic',
      'Tan'
    ]
  },
  'Cinnamon Teal': {
    title: 'Cinnamon Teal',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.4, gold: 4.1, diamond: 4.6 },
    furtypes: ['Beige', 'Cinnamon', 'Melanistic', 'Piebald', 'Red']
  },
  'Collared Peccary': {
    title: 'Collared Peccary',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 37.5, gold: 98.5, diamond: 144.20 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Dark-Grey',
      'Grey',
      'Leucistic',
      'Melanistic',
      'Ochre'
    ]
  },
  'Common Raccoon': {
    title: 'Common Raccoon',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 5, gold: 9, diamond: 12 },
    furtypes: [
      'Albino',
      'Blonde',
      'Brown',
      'Grey',
      'Melanistic',
      'Blonde Piebald',
      'Brown Piebald',
      'Grey Piebald'
    ]
  },
  Coyote: {
    title: 'Coyote',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 38.4, gold: 48.9, diamond: 56.8 },
    furtypes: [
      'Albino',
      'Dark-Grey',
      'Grey-Brown',
      'Light Grey',
      'Melanistic',
      'Orange',
      'Piebald'
    ]
  },
  'Eastern Wild Turkey': {
    title: 'Eastern Wild Turkey',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.5, gold: 3.7, diamond: 4.6 },
    furtypes: ['Bronze', 'Brown', 'Light Bronze', 'Light Brown']
  },
  'Brown Bear': {
    title: 'Brown Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 18.6, gold: 23.8, diamond: 27.7 },
    furtypes: [
      'Albino',
      'Blond',
      'Cinnamon',
      'Dark-Brown',
      'Gold',
      'Grey',
      'Light Brown',
      'Melanistic',
      'Red-Brown'
    ]
  },
  Lynx: {
    title: 'Lynx',
    animalclass: 3,
    trophytype: 'Skull',
    trophyscore: { silver: 18.6, gold: 23.8, diamond: 27.7 },
    furtypes: ['Albino', 'Grey', 'Light Brown', 'Melanistic', 'Piebald']
  },
  'European Bison': {
    title: 'European Bison',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 63.2, gold: 181.6, diamond: 270.4 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Light Brown',
      'Melanistic',
      'Piebald'
    ]
  },
  'European Hare': {
    title: 'European Hare',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.5, gold: 5, diamond: 6.5 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Grey',
      'Light Brown',
      'Melanistic'
    ]
  },
  'European Rabbit': {
    title: 'European Rabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 1, gold: 1.9, diamond: 2.4 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Leucistic',
      'Light Brown',
      'Light Grey',
      'Melanistic',
      'Tan'
    ]
  },
  'Fallow Deer': {
    title: 'Fallow Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 68, gold: 173, diamond: 251.7 },
    furtypes: [
      'Albino',
      'Dark',
      'Dark Spotted',
      'Melanistic',
      'Piebald',
      'Red Spotted',
      'Spotted'
    ]
  },
  'Feral Goat': {
    title: 'Feral Goat',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 89.4, gold: 157.6, diamond: 208.7 },
    furtypes: [
      'Albino', 'Black',
      'Black-Brown', 'Black-White',
      'Blonde', 'Brown',
      'Dark-Brown', 'Mixed',
      'White', 'White-Brown'
    ]
  },
  'Feral Pig': {
    title: 'Feral Pig',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 37.5, gold: 98.5, diamond: 144.2 },
    furtypes: [
      'Albino',
      'Blackgold',
      'Black Spots',
      'Brown',
      'Brown Hybrid',
      'Dark Brown',
      'Pink'
    ]
  },
  Gemsbok: {
    title: 'Gemsbok',
    animalclass: 8,
    trophytype: 'Horns',
    trophyscore: { silver: 194.8, gold: 276.3, diamond: 337.5 },
    furtypes: ['Dark', 'Common', 'Beige', 'Grey', 'Gold']
  },
  'Gray Fox': {
    title: 'Gray Fox',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 3.8, gold: 5.3, diamond: 6.4 },
    furtypes: [
      'Albino',
      'Grey',
      'Leucistic',
      'Piebald',
      'Red',
      'Two Tones',
      'Melanistic'
    ]
  },
  'Gray Wolf': {
    title: 'Gray Wolf',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: ['Albino', 'Eggwhite', 'Grey', 'Melanistic', 'Red Brown']
  },
  'Gredos Ibex': {
    title: 'Gredos Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 54.3, gold: 80.5, diamond: 100.1 },
    furtypes: [
      'Albino',
      'Brown Hybrid',
      'Buff',
      'Gray-Brown',
      'Grey',
      'Light Brown',
      'Light Grey',
      'Melanistic'
    ]
  },
  'Grizzly Bear': {
    title: 'Grizzly Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 52.6, gold: 60.8, diamond: 67 },
    furtypes: ['Common', 'Melanistic', 'Brown', 'Albino']
  },
  'Harlequin Duck': {
    title: 'Harlequin Duck',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 5.3, gold: 6.4, diamond: 7.2 },
    furtypes: ['Common', 'Dark', 'Piebald', 'Grey', 'Albino', 'Melanistic']
  },
  'Iberian Mouflon': {
    title: 'Iberian Mouflon',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 97, gold: 144.2, diamond: 179.6 },
    furtypes: ['Albino', 'Brown', 'Grey', 'Light Brown', 'Melanistic']
  },
  'Iberian Wolf': {
    title: 'Iberian Wolf',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: [
      'Albino',
      'Fantasma',
      'Grey',
      'Grey-Brown',
      'Melanistic',
      'Ogro',
      'Olive',
      'Sombra',
      'Pristine',
      'Winter'
    ]
  },
  'White-tailed Jackrabbit': {
    title: 'White-tailed Jackrabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.8, gold: 4.8, diamond: 6.3 },
    furtypes: ['Albino', 'Brown', 'Grey', 'Light Brown']
  },
  'Lesser Kudu': {
    title: 'Lesser Kudu',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 107.8, gold: 132.8, diamond: 151.6 },
    furtypes: [
      'Albino',
      'Grey',
      'Common',
      'Dark Brown',
      'Dusky',
      'Melanistic',
      'Red Brown'
    ]
  },
  Lion: {
    title: 'Lion',
    animalclass: 9,
    trophytype: 'Skull',
    trophyscore: { silver: 38, gold: 44, diamond: 48.5 },
    furtypes: ['Albino', 'Blonde', 'Dark-Brown', 'Light Brown', 'Tan']
  },
  Mallard: {
    title: 'Mallard',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 9.9, gold: 15.4, diamond: 19.6 },
    furtypes: [
      'Black-Brown',
      'Blonde',
      'Brown Hybrid',
      'Leucistic',
      'Melanistic',
      'Piebald'
    ]
  },
  "Merriam's Turkey": {
    title: "Merriam's Turkey",
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.3, gold: 4, diamond: 4.6 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Grey ?',
      'Leucistic',
      'Light Brown',
      'Melanistic'
    ]
  },
  'Mexican Bobcat': {
    title: 'Mexican Bobcat',
    animalclass: 3,
    trophytype: 'Skull',
    trophyscore: { silver: 18.5, gold: 23.7, diamond: 27.6 },
    furtypes: [
      'Albino',
      'Blue',
      'Brown',
      'Light Brown',
      'Melanistic',
      'Red',
      'Tan'
    ]
  },
  Moose: {
    title: 'Moose',
    animalclass: 8,
    trophytype: 'Antlers',
    trophyscore: { silver: 86.2, gold: 194, diamond: 274.9 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Light Brown',
      'Melanistic',
      'Mocha',
      'Piebald',
      'Tan'
    ]
  },
  'Mountain Goat': {
    title: 'Mountain Goat',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 52.7, gold: 84.1, diamond: 107.6 },
    furtypes: [
      'Albino',
      'Beige',
      'Light Brown',
      'Light Grey',
      'Melanistic',
      'White'
    ]
  },
  'Mountain Lion': {
    title: 'Mountain Lion',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: ['Albino', 'Dark Red', 'Grey', 'Light Brown', 'Melanistic']
  },
  'Mule Deer': {
    title: 'Mule Deer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 98.9, gold: 222.2, diamond: 314.8 },
    furtypes: [
      'Albino',
      'Blonde',
      'Brown',
      'Dilute',
      'Grey',
      'Melanistic',
      'Piebald'
    ]
  },
  'Plains Bison': {
    title: 'Plains Bison',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 50.7, gold: 148.1, diamond: 221.1 },
    furtypes: ['Common', 'Albino', 'Leucistic', 'Melanistic']
  },
  Pronghorn: {
    title: 'Pronghorn',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 46, gold: 75.7, diamond: 98 },
    furtypes: ['Dark', 'Tan', 'Piebald', 'Albino', 'Leucistic']
  },
  Puma: {
    title: 'Puma',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: ['Albino', 'Dark Red', 'Grey', 'Light Brown', 'Melanistic']
  },
  'Red Deer': {
    title: 'Red Deer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 90.5, gold: 182.2, diamond: 251.6 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark Brown',
      'Grey',
      'Light Brown',
      'Melanistic',
      'Piebald',
      'Spotted (Fabled)'
    ]
  },
  'Red Fox': {
    title: 'Red Fox',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 4.7, gold: 10, diamond: 14.1 },
    furtypes: ['Albino', 'Dark Red', 'Melanistic', 'Orange', 'Piebald', 'Red']
  },
  Reindeer: {
    title: 'Reindeer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 152.5, gold: 311.2, diamond: 430.2 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Leucistic',
      'Light Brown',
      'Melanistic',
      'Piebald',
      'Tan'
    ]
  },
  'Ring-Necked Pheasant': {
    title: 'Ring-Necked Pheasant',
    animalclass: 1,
    trophytype: 'Combined',
    trophyscore: { silver: 9.1, gold: 15.5, diamond: 20.3 },
    furtypes: ['Albino', 'Brown', 'Grey', 'Leucistic', 'Melanistic', 'Molting']
  },
  'Rio Grande Turkey': {
    title: 'Rio Grande Turkey',
    animalclass: 1,
    trophytype: 'Combined',
    trophyscore: { silver: 3.3, gold: 4, diamond: 4.6 },
    furtypes: [
      'Albino',
      'Buff',
      'Brown',
      'Leucistic',
      'Light Brown',
      'Light Buff',
      'Light Copper',
      'Melanistic'
    ]
  },
  'Rocky Mountain Elk': {
    title: 'Rocky Mountain Elk',
    animalclass: 8,
    trophytype: 'Antlers',
    trophyscore: { silver: 177.8, gold: 351.3, diamond: 481.4 },
    furtypes: [
      'Albino',
      'Brown',
      'Common',
      'Light Grey',
      'Piebald',
      'Melanistic'
    ]
  },
  'Roe Deer': {
    title: 'Roe Deer',
    animalclass: 3,
    trophytype: 'Antlers',
    trophyscore: { silver: 41, gold: 64.3, diamond: 81.8 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Dark-Grey',
      'Melanistic',
      'Orange',
      'Piebald',
      'Tan'
    ]
  },
  'Ronda Ibex': {
    title: 'Ronda Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 69.2, gold: 91.4, diamond: 107.9 },
    furtypes: [
      'Albino',
      'Brown',
      'Brown Hybrid',
      'Buff',
      'Grey',
      'Grey-Brown',
      'Melanistic'
    ]
  },
  'Roosevelt Elk': {
    title: 'Roosevelt Elk',
    animalclass: 8,
    trophytype: 'Antlers',
    trophyscore: { silver: 128.7, gold: 272.8, diamond: 380.8 },
    furtypes: ['Albino', 'Brown', 'Melanistic', 'Orange', 'Piebald', 'Tan']
  },
  'Scrub Hare': {
    title: 'Scrub Hare',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.4, gold: 4.1, diamond: 5.3 },
    furtypes: ['Grey', 'Light Grey', 'Chestnut', 'Brown']
  },
  'Musk Deer': {
    title: 'Musk Deer',
    animalclass: 2,
    trophytype: 'Tusks',
    trophyscore: { silver: 60, gold: 168, diamond: 249 },
    furtypes: [
      'Albino',
      'Dark-Brown',
      'Grey-Brown',
      'Melanistic',
      'Orange',
      'Piebald'
    ]
  },
  'Side-Striped Jackal': {
    title: 'Side-Striped Jackal',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 16.8, gold: 23.8, diamond: 29.1 },
    furtypes: ['Grey', 'Light Brown', 'Grey Brown', 'Albino', 'Melanistic']
  },
  'Sika Deer': {
    title: 'Sika Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 53.2, gold: 136.4, diamond: 198.7 },
    furtypes: [
      'Albino',
      'Black',
      'Brown',
      'Dark Spotted',
      'Red Spotted',
      'Spotted'
    ]
  },
  'Southeastern Spanish Ibex': {
    title: 'Southeastern Spanish Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 49.7, gold: 72.5, diamond: 89.6 },
    furtypes: [
      'Albino',
      'Brown Hybrid',
      'Buff',
      'Grey-Brown',
      'Light Brown',
      'Light Grey',
      'Melanistic',
      'Orange'
    ]
  },
  Springbok: {
    title: 'Springbok',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 69.4, gold: 93, diamond: 110.7 },
    furtypes: ['Albino', 'Black-Brown', 'Dark-Brown', 'Orange']
  },
  Warthog: {
    title: 'Warthog',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 24.6, gold: 43.8, diamond: 58.2 },
    furtypes: ['Albino', 'Grey', 'Common', 'Red Brown', 'Red']
  },
  'Water Buffalo': {
    title: 'Water Buffalo',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 84.2, gold: 138.1, diamond: 167.5 },
    furtypes: ['Albino', 'Black', 'Brown', 'Grey', 'Orange']
  },
  'Whitetail Deer': {
    title: 'Whitetail Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 112, gold: 193.7, diamond: 255 },
    furtypes: [
      'Albino',
      'Brown',
      'Dark-Brown',
      'Melanistic',
      'Piebald',
      'Red-Brown',
      'Tan',
      'Fabled Piebald'
    ]
  },
  'Wild Boar': {
    title: 'Wild Boar',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 37.5, gold: 98.5, diamond: 144.2 },
    furtypes: [
      'Albino',
      'Blackgold',
      'Brown',
      'Dark-Brown',
      'Light Brown',
      'Melanistic'
    ]
  }
}

export default animalsArray;