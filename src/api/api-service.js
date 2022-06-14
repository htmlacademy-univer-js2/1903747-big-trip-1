import { PointsModel } from '../model/point-model';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export class ApiService {
    #endPoint = null;
    #authorization = null;

    constructor (endPoint, authorization) {
      this.#endPoint = endPoint;
      this.#authorization = authorization;
    }

    get points() {
      return this.#load({url: 'points'}).then(ApiService.parseResponse);
    }

    get offers() {
      return this.#load({url: 'offers'}).then(ApiService.parseResponse);
    }

    get destinations() {
      return this.#load({url: 'destinations'}).then(ApiService.parseResponse);
    }

    addPoint = async (point) => {
      const response = await this.#load({
        url: 'points',
        method: Method.POST,
        body: JSON.stringify(PointsModel.adaptPointsToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'})
      });
      const parsedResponse = await ApiService.parseResponse(response);
      return parsedResponse;
    }

    deletePoint = async (point) => {
      const response = await this.#load({
        url: `points/${point.id}`,
        method: Method.DELETE
      });
      return response;
    }

    updatePoint = async (point) => {
      const response = await this.#load({
        url: `points/${point.id}`,
        method: Method.PUT,
        body: JSON.stringify(PointsModel.adaptPointsToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'})
      });
      const parsedResponse = await ApiService.parseResponse(response);
      return parsedResponse;
    }

    #load = async ({
      url,
      method = Method.GET,
      body = null,
      headers = new Headers(),
    }) => {
      headers.append('Authorization', this.#authorization);

      const response = await fetch(
        `${this.#endPoint}/${url}`,
        {method, body, headers},
      );
      try {
        ApiService.checkStatus(response);
        return response;
      }   catch (err) {
        ApiService.catchError(err);
      }
    }

    static parseResponse = (response) => response.json();

    static catchError(err) {
      throw err;
    }

    static checkStatus = (response) => {
      if (
        response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
      ) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }
}
