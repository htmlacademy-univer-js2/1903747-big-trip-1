import { UpdateType } from '../const.js';
import Observer from '../utilities/observer.js';

export class PointsModel extends Observer {
    #points = [];
    #apiService = null;
    #offers = null;
    #destinations = null;

    constructor (apiService) {
      super();
      this.#apiService = apiService;
    }

    set points(points) {
      this.#points = [...points];
    }

    get points() {
      return this.#points;
    }

    get destinations() {
      return this.#destinations;
    }

    get offers() {
      return this.#offers;
    }

    init = async () => {
      try {
        const points = await this.#apiService.points;
        this.#points = points.map((point) => this.#adaptPointToClient(point));
      } catch (err) {
        this.#points = [];
      }
      try {
        const offers = await this.#apiService.offers;
        this.#offers = offers.map((offer) => this.#adaptOffersToClient(offer));
      } catch (err) {
        this.#offers = [];
      }

      this.#destinations = await this.#apiService.destinations;

      this._notify(UpdateType.INIT);
    }

    updatePoint = async (updateType, update) => {
      const index = this.#points.findIndex((point) => point.id === update.id);
      if (index === -1) {
        throw new Error('Can\'t update unexisting point');
      }
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = this.#adaptPointToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType, updatedPoint);
    }

    addPoint = async (updateType, update) => {
      const response = await this.#apiService.addPoint(update);
      const newPoint = this.#adaptPointToClient(response);
      this.#points = [
        newPoint,
        ...this.#points,
      ];
      this._notify(updateType, update);
    }

    deletePoint = async (updateType, update) => {
      const index = this.#points.findIndex((point) => point.id === update.id);

      if (index === -1) {
        throw new Error('Can\'t delete unexisting point');
      }
      await this.#apiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType);
    }

    #adaptPointToClient = (point) => {
      let action = 'to';
      const dateFrom = new Date(point['date_from']);
      const dateTo = new Date(point['date_to']);
      const offers = [];
      for (let i = 0; i < point.offers.length; i++) {
        offers.push({type : point.type, option : point.offers[i].title, price : point.offers[i].price, id : point.offers[i].id});
      }

      if (point['type'] === 'check-in' || point['type'] === 'sightseeing' || point['type'] === 'restaurant') {
        action = 'in';
      }
      const adaptedPoint = {...point,
        townName: point.destination.name,
        type : {
          name : point['type'],
          iconURL : `img/icons/${point['type']}.png`,
          action : action
        },
        dateFrom : dateFrom,
        dateTo : dateTo,
        tripDuration : dateFrom - dateTo,
        isFavorite : point['is_favorite'],
        description : point.destination.description,
        basePrice : point.base_price,
        offers : offers,
        pictures : point.destination.pictures
      };

      delete adaptedPoint.destination;
      delete adaptedPoint.date_from;
      delete adaptedPoint.date_to;
      delete adaptedPoint.is_favorite;
      delete adaptedPoint.base_price;

      return adaptedPoint;
    }

    static adaptPointsToServer = (point) => {
      const adaptedOffers = [];
      point.offers.forEach((offer) => {
        adaptedOffers.push({
          id : offer.id,
          price : offer.price,
          title : offer.option
        });
      });
      const adaptedPoint = {
        date_from : point.dateFrom.toISOString(),
        date_to : point.dateTo.toISOString(),
        base_price : Number(point.basePrice),
        destination : {
          description : point.description,
          pictures : point.pictures,
          name : point.townName
        },
        id : point.id,
        type : point.type.name,
        is_favorite : point.isFavorite,
        offers : adaptedOffers
      };
      return adaptedPoint;
    }

    #adaptOffersToClient = (elderOffer) => {
      for (const offer of elderOffer.offers) {
        offer.option = offer.title;
        delete offer.title;
      }
      return elderOffer;
    }
}
