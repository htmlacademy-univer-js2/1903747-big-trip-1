const tripTypeArray = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const townArray = ['New-York', 'Dallas', 'Moscow', 'Tokyo', 'Madrid', 'Belgrad', 'Crimea', 'Oakland', 'Manila', 'Warsaw'];

function optionObject(newOption, newPrice, newType) {
    this.option = newOption;
    this.price = newPrice;
    this.type = newType
}

const optionsArray = [
    new optionObject('Add breakfast', 50, "restaurant"),
    new optionObject('Add luggage', 50, "flight"),
    new optionObject('Rent a car', 80, "drive"),
    new optionObject('Add soft drinks', 10, "bus"),
    new optionObject('Book tickets', 40, "sightseeing"),
    new optionObject('Lunch in city', 30, "sightseeing"),
    new optionObject('Order Uber', 20, "taxi"),
    new optionObject('Switch to comfort', 30, "flight"),
    new optionObject('Switch to luxe', 100, "ship"),
    new optionObject('Premium waiting area', 20, "check-in")
]

const descriptionArray = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus'
]

const getImageArray = () => {
    let arr = [];
    for (let i = 0; i < getRandomInt(0, 3); i++) arr.push('http://picsum.photos/248/152?' + getRandomInt(0, 20));
    return arr;
}

const getOptionArray = () => {
    let arr = [];
    for (let i = 0; i < getRandomInt(0, 5); i++) {
        arr.push(optionsArray[getRandomInt(0, optionsArray.length - 1)]);
    }
    return arr;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

const generateDay = (month) => {
    return month + " " + getRandomInt(1, 30);
}

const generateTime = () => {
    const month = getRandomInt(0, 11);
    const day = getRandomInt(0, 31);
    const hours = getRandomInt(0, 19);
    const minutes = getRandomInt(0, 10);
    var startTime = new Date(2022, month, day, hours, minutes);
    var endTime = new Date(2022, month, day, hours + getRandomInt(1, 4), minutes + getRandomInt(0, 45));
    return [startTime, endTime];
}

export const generatePoint = () => ({
        destination: {
            description: descriptionArray[getRandomInt(0, 4)],
            town_name: townArray[getRandomInt(0, townArray.length)],
            pictures: getImageArray()
        },
        offers: getOptionArray(),
        point: {
            base_price: getRandomInt(20, 1000),
            date_from: generateTime()[0],
            date_to: generateTime()[1],
            trip_duration: "some",
            is_favorite: Boolean(getRandomInt(0, 1)),
            type: tripTypeArray[getRandomInt(0, tripTypeArray.length)]
        }
    }
);