import {nanoid} from 'nanoid';

export const eventTypes = [
  {name: 'taxi', iconURL: 'img/icons/taxi.png', action: 'to'},
  {name: 'bus', iconURL: 'img/icons/bus.png', action: 'to'},
  {name: 'train', iconURL: 'img/icons/train.png', action: 'to'},
  {name: 'ship', iconURL: 'img/icons/ship.png', action: 'to'},
  {name: 'transport', iconURL: 'img/icons/transport.png', action: 'to'},
  {name: 'drive', iconURL: 'img/icons/drive.png', action: 'to'},
  {name: 'flight', iconURL: 'img/icons/flight.png', action: 'to'},
  {name: 'check-in', iconURL: 'img/icons/check-in.png', action: 'in'},
  {name: 'sightseeing', iconURL: 'img/icons/sightseeing.png', action: 'in'},
  {name: 'restaurant', iconURL: 'img/icons/restaurant.png', action: 'in'},
];

export const townArray = ['New-York', 'Dallas', 'Moscow', 'Tokyo', 'Madrid', 'Belgrad', 'Crimea', 'Oakland', 'Manila', 'Warsaw'];

class optionObject {
  constructor(newOption, newPrice, newType) {
    this.tripOffer = {
      type : newType,
      option : newOption,
      price : newPrice
    };
  }

  get type() {
    return this.tripOffer.type;
  }

  get tripOfer() {
    return this.tripOffer;
  }
}


export const allOffers = [
  new optionObject('Add breakfast', 50, 'restaurant').tripOffer,
  new optionObject('Add alchol', 50, 'restaurant').tripOffer,
  new optionObject('Add luggage', 50, 'flight').tripOffer,
  new optionObject('Rent a car', 80, 'drive').tripOffer,
  new optionObject('Add soft drinks', 15, 'bus').tripOffer,
  new optionObject('Book tickets', 40, 'sightseeing').tripOffer,
  new optionObject('Lunch in city', 30, 'sightseeing').tripOffer,
  new optionObject('Order Uber', 20, 'taxi').tripOffer,
  new optionObject('Add dinner', 20, 'train').tripOffer,
  new optionObject('Switch to comfort', 30, 'flight').tripOffer,
  new optionObject('Switch to luxe', 100, 'ship').tripOffer,
  new optionObject('Premium waiting area', 20, 'check-in').tripOffer,
  new optionObject('Switch to luxe', 50, 'transport').tripOffer,
  new optionObject('Add conditioner', 10, 'bus').tripOffer
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

const getOptionArray = (typeOfTrip) => {
  const arr = [];
  allOffers.forEach((offer) => offer.type === typeOfTrip ? arr.push(offer) : null);
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

export const getWeight = (dateA, dateB) => {
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
  const durationA = pointA.tripDuration;
  const durationB = pointB.tripDuration;

  const weight = getWeight(durationA, durationB);
  return weight ?? durationB - durationA;
};

export const sortPointPrice = (pointA, pointB) => {
  const weight = getWeight(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
};

export const generatePoint = () => {
  const dateAndDuration = generateTime();
  const newType = eventTypes[getRandomInt(0, eventTypes.length - 1)];
  return {
    description: descriptionArray[getRandomInt(0, 4)],
    townName: townArray[getRandomInt(0, townArray.length)],
    pictures: getImageArray(),
    offers : getOptionArray(newType.name),
    basePrice: getRandomInt(20, 2000),
    dateFrom: dateAndDuration[0],
    dateTo: dateAndDuration[1],
    tripDuration: dateAndDuration[2],
    isFavorite: Math.random() >= 0.7,
    type: newType,
    id: nanoid()
  };
};

export const generateClearPoint = () => {
  const dateFrom = new Date();
  const dateTo = new Date(new Date(dateFrom).setHours(dateFrom.getHours() + 6));
  return {
    description: descriptionArray[getRandomInt(0, 4)],
    townName: 'Crimea',
    pictures: [{src: '', description : ''}],
    offers : [],
    basePrice: 50,
    dateFrom: dateFrom,
    dateTo: dateTo,
    tripDuration: dateTo - dateFrom,
    isFavorite: false,
    type: eventTypes[0],
    id: nanoid()
  };
};
