const animalsArray = {
  'Antelope Jackrabbit': {
    title: 'Antelope Jackrabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.8, gold: 4.8, diamond: 6.3 },
    furtypes: null
  },
  'Axis Deer': {
    title: 'Axis Deer',
    animalclass: 3,
    trophytype: 'Antlers',
    trophyscore: { silver: 72.8, gold: 155.3, diamond: 217.2 },
    furtypes: [ 'Albino', 'Common', 'Dark', 'Melanistic', 'Orange', 'Piebald' ]
  },
  'Beceite Ibex': {
    title: 'Beceite Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 78, gold: 142.9, diamond: 191.6 },
    furtypes: [ 'Albino', 'Common', 'Melanistic' ]
  },
  'Bighorn Sheep': {
    title: 'Bighorn Sheep',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 90.3, gold: 132.7, diamond: 164.6 },
    furtypes: [ 'Albino', 'Black', 'Brown', 'Common', 'Dark Brown', 'Grey' ]
  },
  'Black Bear': {
    title: 'Black Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 14.4, gold: 19.2, diamond: 22.8 },
    furtypes: [ 'Brown', 'Blond', 'Common', 'Cinnamon' ]
  },
  Blackbuck: {
    title: 'Blackbuck',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 71.8, gold: 106.3, diamond: 132.2 },
    furtypes: [ 'Melanistic', 'Black', 'Leucistic', 'Brown', 'Dark' ]
  },
  'Blacktail Deer': {
    title: 'Blacktail Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 76.9, gold: 134.4, diamond: 177.5 },
    furtypes: [ 'Albino', 'Piebald', 'Common', 'Melanistic' ]
  },
  'Blue Wildebeest': {
    title: 'Blue Wildebeest',
    animalclass: 6,
    trophytype: 'Horns',
    trophyscore: { silver: 21.6, gold: 30.8, diamond: 37.7 },
    furtypes: [ 'Albino', 'Gold', 'Common', 'Crowned' ]
  },
  'Canada Goose': {
    title: 'Canada Goose',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 4.4, gold: 6.8, diamond: 8.5 },
    furtypes: [
      'Brown Hybrid',
      'Grey Hybrid',
      'Light grey',
      'Melanistic',
      'Common',
      'Bald leucistic'
    ]
  },
  'Cape Buffalo': {
    title: 'Cape Buffalo',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 73.3, gold: 117.9, diamond: 151.4 },
    furtypes: [ 'Black', 'Grey', 'Brown', 'Albino', 'Leucistic' ]
  },
  Caribou: {
    title: 'Caribou',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 152.5, gold: 311.2, diamond: 430.2 },
    furtypes: [ 'Melanistic', 'Common', 'Piebald', 'Albino', 'Leucistic' ]
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
      'Melanistic,Johnathan'
    ]
  },
  'Cinnamon Teal': {
    title: 'Cinnamon Teal',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.4, gold: 4.1, diamond: 4.6 },
    furtypes: [
      'Beige',
      'Common (Male',
      'Female)',
      'Melanistic',
      'Piebald',
      'Red'
    ]
  },
  Coyote: {
    title: 'Coyote',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 38.4, gold: 48.9, diamond: 56.8 },
    furtypes: [ 'Albino', 'Common', 'Melanistic', 'Piebald' ]
  },
  'Brown Bear': {
    title: 'Brown Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 18.6, gold: 23.8, diamond: 27.7 },
    furtypes: [
      'Albino',   'Spirit',
      'Cinnamon', 'Light brown',
      'Redbrown', 'Gold',
      'Grey',     'Melanistic',
      'Blond',    'Dark Brown'
    ]
  },
  Lynx: {
    title: 'Lynx',
    animalclass: 3,
    trophytype: 'Skull',
    trophyscore: { silver: 18.6, gold: 23.8, diamond: 27.7 },
    furtypes: [ 'Common', 'Piebald', 'Melanistic', 'Albino' ]
  },
  'European Bison': {
    title: 'European Bison',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 63.2, gold: 181.6, diamond: 270.4 },
    furtypes: [ 'Albino', 'Piebald', 'Common', 'Melanistic' ]
  },
  'European Hare': {
    title: 'European Hare',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.5, gold: 5, diamond: 6.5 },
    furtypes: [ 'Common', 'Albino', 'Melanistic' ]
  },
  'European Rabbit': {
    title: 'European Rabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 1, gold: 1.9, diamond: 2.4 },
    furtypes: [
      'Albino',
      'Brown',
      'Common',
      'Leucistic',
      'Light Grey',
      'Melanistic'
    ]
  },
  'Fallow Deer': {
    title: 'Fallow Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 68, gold: 173, diamond: 251.7 },
    furtypes: [ 'Albino', 'Piebald', 'Common', 'Melanistic' ]
  },
  'Feral Goat': {
    title: 'Feral Goat',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 89.4, gold: 157.6, diamond: 208.7 },
    furtypes: [
      'Black',       'Black-Brown',
      'Black-White', 'Blonde',
      'Brown',       'Dark-Brown',
      'White',       'White-Brown',
      'Mixed',       'Albino'
    ]
  },
  'Feral Pig': {
    title: 'Feral Pig',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 37.5, gold: 98.5, diamond: 144.2 },
    furtypes: [
      'Blackgold',
      'Black Spots',
      'Brown',
      'Brown Hybrid',
      'Dark Brown',
      'Pink',
      'Albino'
    ]
  },
  Gemsbok: {
    title: 'Gemsbok',
    animalclass: 8,
    trophytype: 'Horns',
    trophyscore: { silver: 194.8, gold: 276.3, diamond: 337.5 },
    furtypes: [ 'Dark', 'Common', 'Beige', 'Grey', 'Gold' ]
  },
  'Gray Wolf': {
    title: 'Gray Wolf',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: [ 'Melanistic', 'Common', 'Red Brown', 'Eggwhite', 'Albino' ]
  },
  'Gredos Ibex': {
    title: 'Gredos Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 54.3, gold: 80.5, diamond: 100.1 },
    furtypes: [ 'Albino', 'Common', 'Melanistic' ]
  },
  'Grizzly Bear': {
    title: 'Grizzly Bear',
    animalclass: 7,
    trophytype: 'Skull',
    trophyscore: { silver: 52.6, gold: 60.8, diamond: 67 },
    furtypes: [ 'Common', 'Melanistic', 'Brown', 'Albino' ]
  },
  'Harlequin Duck': {
    title: 'Harlequin Duck',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 5.3, gold: 6.4, diamond: 7.2 },
    furtypes: [ 'Common', 'Dark', 'Piebald', 'Grey', 'Albino', 'Melanistic' ]
  },
  'Iberian Mouflon': {
    title: 'Iberian Mouflon',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 97, gold: 144.2, diamond: 179.6 },
    furtypes: [ 'Albino', 'Common', 'Grey', 'Melanistic' ]
  },
  'Iberian Wolf': {
    title: 'Iberian Wolf',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: [
      'Albino',     'Common',
      'Fantasma',   'Grey',
      'Melanistic', 'Ogro',
      'Olive',      'Sombra',
      'Pristine',   'Winter'
    ]
  },
  Jackrabbit: {
    title: 'Jackrabbit',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.8, gold: 4.8, diamond: 6.3 },
    furtypes: [
      'Albino',
      'Grey',
      'Common',
      'Light Brown',
      'Brown',
      'Melanistic'
    ]
  },
  'Lesser Kudu': {
    title: 'Lesser Kudu',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 13.3, gold: 24.2, diamond: 32.2 },
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
    furtypes: [ 'Common', 'Albino', 'Dark Brown', 'Blonde' ]
  },
  Mallard: {
    title: 'Mallard',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 9.9, gold: 15.4, diamond: 19.6 },
    furtypes: [
      'Leucistic',
      'Common',
      'Piebald',
      'Melanistic',
      'Brown Hybrid',
      'Blonde'
    ]
  },
  'Mexican Bobcat': {
    title: 'Mexican Bobcat',
    animalclass: 3,
    trophytype: 'Skull',
    trophyscore: { silver: 18.5, gold: 23.7, diamond: 27.6 },
    furtypes: [ 'Blue', 'Common', 'Grey', 'Red', 'Tan' ]
  },
  Moose: {
    title: 'Moose',
    animalclass: 8,
    trophytype: 'Antlers',
    trophyscore: { silver: 86.2, gold: 194, diamond: 274.9 },
    furtypes: [
      'Albino',
      'Piebald',
      'Common',
      'Melanistic',
      'Mocha (Te Awaroa)'
    ]
  },
  'Mountain Goat': {
    title: 'Mountain Goat',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 52, gold: 84, diamond: 107 },
    furtypes: [
      'Beige',
      'Common',
      'Light Brown',
      'Melanistic',
      'White',
      'Albino'
    ]
  },
  'Mountain Lion': {
    title: 'Mountain Lion',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: [ 'Albino', 'Common', 'Dark Red', 'Grey', 'Melanistic' ]
  },
  'Mule Deer': {
    title: 'Mule Deer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 98.9, gold: 222.2, diamond: 314.8 },
    furtypes: [
      'Melanistic',
      'Common',
      'Dilute',
      'Albino',
      'Grey',
      'Blonde',
      'Piebald'
    ]
  },
  'Plains Bison': {
    title: 'Plains Bison',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 50.7, gold: 148.1, diamond: 221.1 },
    furtypes: [ 'Common', 'Albino', 'Leucistic', 'Melanistic' ]
  },
  Pronghorn: {
    title: 'Pronghorn',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 46, gold: 75.7, diamond: 98 },
    furtypes: [ 'Albino', 'Common', 'Dark', 'Piebald', 'Leucistic' ]
  },
  Puma: {
    title: 'Puma',
    animalclass: 5,
    trophytype: 'Skull',
    trophyscore: { silver: 32, gold: 36, diamond: 39 },
    furtypes: [ 'Albino', 'Common', 'Dark Red', 'Grey', 'Melanistic' ]
  },
  'Red Deer': {
    title: 'Red Deer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 90.5, gold: 182.2, diamond: 251.6 },
    furtypes: [ 'Albino', 'Piebald', 'Common', 'Melanistic' ]
  },
  'Red Fox': {
    title: 'Red Fox',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 4.7, gold: 10, diamond: 14.1 },
    furtypes: [ 'Albino', 'Common', 'Melanistic', 'Piebald' ]
  },
  Reindeer: {
    title: 'Reindeer',
    animalclass: 6,
    trophytype: 'Antlers',
    trophyscore: { silver: 152.5, gold: 311.2, diamond: 430.2 },
    furtypes: [ 'Albino', 'Common', 'Piebald', 'Melanistic', 'Leucistic' ]
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
    furtypes: [ 'Albino', 'Piebald', 'Common', 'Melanistic' ]
  },
  'Ronda Ibex': {
    title: 'Ronda Ibex',
    animalclass: 4,
    trophytype: 'Horns',
    trophyscore: { silver: 69.2, gold: 91.4, diamond: 107.9 },
    furtypes: [ 'Albino', 'Common', 'Melanistic' ]
  },
  'Roosevelt Elk': {
    title: 'Roosevelt Elk',
    animalclass: 8,
    trophytype: 'Antlers',
    trophyscore: { silver: 128.7, gold: 272.8, diamond: 380.8 },
    furtypes: [ 'Albino', 'Piebald', 'Common', 'Melanistic' ]
  },
  'Scrub Hare': {
    title: 'Scrub Hare',
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 2.4, gold: 4.1, diamond: 5.1 },
    furtypes: [
      'Albino',
      'Grey',
      'Light Grey',
      'Chestnut',
      'Brown',
      'Melanistic'
    ]
  },
  'Musk Deer': {
    title: 'Musk Deer',
    animalclass: 2,
    trophytype: 'Fangs',
    trophyscore: { silver: 60, gold: 168, diamond: 249 },
    furtypes: [ 'Common', 'Piebald', 'Melanistic', 'Albino' ]
  },
  'Side-Striped Jackal': {
    title: 'Side-Striped Jackal',
    animalclass: 2,
    trophytype: 'Weight',
    trophyscore: { silver: 16.8, gold: 23.8, diamond: 29.1 },
    furtypes: [ 'Albino', 'Common', 'Melanistic', 'Grey' ]
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
    furtypes: [ 'Albino', 'Common', 'Melanistic' ]
  },
  Springbok: {
    title: 'Springbok',
    animalclass: 3,
    trophytype: 'Horns',
    trophyscore: { silver: 69.4, gold: 93, diamond: 110.7 },
    furtypes: [ 'Albino', 'Common', 'Black-Brown', 'Dark-Brown' ]
  },
  "Merriam's Turkey": {
    title: "Merriam's Turkey",
    animalclass: 1,
    trophytype: 'Weight',
    trophyscore: { silver: 3.3, gold: 4, diamond: 4.6 },
    furtypes: [
      'Albino',
      'Common',
      'Grey',
      'Leucistic',
      'Light Brown',
      'Melanistic'
    ]
  },
  Warthog: {
    title: 'Warthog',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 24.6, gold: 43.8, diamond: 58.2 },
    furtypes: [ 'Albino', 'Grey', 'Common', 'Red Brown', 'Red' ]
  },
  'Water Buffalo': {
    title: 'Water Buffalo',
    animalclass: 9,
    trophytype: 'Horns',
    trophyscore: { silver: 84.2, gold: 138.1, diamond: 167.5 },
    furtypes: [ 'Black', 'Orange', 'Common', 'Brown', 'Albino' ]
  },
  'Whitetail Deer': {
    title: 'Whitetail Deer',
    animalclass: 4,
    trophytype: 'Antlers',
    trophyscore: { silver: 111, gold: 206, diamond: 255 },
    furtypes: [ 'Albino', 'Piebald', 'Common', 'Melanistic' ]
  },
  'Wild Boar': {
    title: 'Wild Boar',
    animalclass: 4,
    trophytype: 'Tusks',
    trophyscore: { silver: 37.5, gold: 98.5, diamond: 144.2 },
    furtypes: [ 'Common', 'Albino', 'Melanistic', 'Blackgold' ]
  }
};

export default animalsArray;