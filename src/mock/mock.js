import {nanoid} from 'nanoid';

const tripTypeArray = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const townArray = ['New-York', 'Dallas', 'Moscow', 'Tokyo', 'Madrid', 'Belgrad', 'Crimea', 'Oakland', 'Manila', 'Warsaw'];

function optionObject(newOption, newPrice, newType) {
  this.option = newOption;
  this.price = newPrice;
  this.type = newType;
}

const optionsArray = [
  new optionObject('Add breakfast', 50, 'restaurant'),
  new optionObject('Add luggage', 50, 'flight'),
  new optionObject('Rent a car', 80, 'drive'),
  new optionObject('Add soft drinks', 10, 'bus'),
  new optionObject('Book tickets', 40, 'sightseeing'),
  new optionObject('Lunch in city', 30, 'sightseeing'),
  new optionObject('Order Uber', 20, 'taxi'),
  new optionObject('Switch to comfort', 30, 'flight'),
  new optionObject('Switch to luxe', 100, 'ship'),
  new optionObject('Premium waiting area', 20, 'check-in')
];

const descriptionArray = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus'
];

const getImageArray = () => {
  const arr = [];
  for (let i = 0; i < getRandomInt(0, 3); i++) {arr.push(`http://picsum.photos/248/152?${  getRandomInt(0, 20)}`);}
  return arr;
};

const getOptionArray = () => {
  const arr = [];
  for (let i = 0; i < getRandomInt(0, 5); i++) {
    arr.push(optionsArray[getRandomInt(0, optionsArray.length - 1)]);
  }
  return arr;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateTime = () => {
  const month = getRandomInt(0, 11);
  const day = getRandomInt(0, 31);
  const hours = getRandomInt(0, 17);
  const minutes = getRandomInt(0, 10);
  const startTime = new Date(2022, month, day, hours, minutes);
  const endTime = new Date(2022, month, day, hours + getRandomInt(1, 7), minutes + getRandomInt(10, 45));
  //console.log(startTime, endTime);
  const duration = new Date(endTime - startTime - 18000000);
  return [startTime, endTime, duration];
};

const getWeight = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortPointTime = (pointA, pointB) => {
  const durationA = pointA.point.tripDuration;
  const durationB = pointB.point.tripDuration;

  const weight = getWeight(durationA, durationB);
  return weight ?? durationB - durationA;
};

export const sortPointPrice = (pointA, pointB) => {
  const weight = getWeight(pointA.point.basePrice, pointB.point.basePrice);

  return weight ?? pointB.point.basePrice - pointA.point.basePrice;
};

export const generatePoint = () => {
  const dateAndDuration = generateTime();
  return {
    destination : {
      description: descriptionArray[getRandomInt(0, 4)],
      townName: townArray[getRandomInt(0, townArray.length)],
      pictures: getImageArray()
    },
    offers : getOptionArray(),
    point : {
      basePrice: getRandomInt(20, 2000),
      dateFrom: dateAndDuration[0],
      dateTo: dateAndDuration[1],
      tripDuration: dateAndDuration[2],
      isFavorite: Math.random() >= 0.7,
      type: tripTypeArray[getRandomInt(0, tripTypeArray.length)]
    },
    id: nanoid()
  };
};
