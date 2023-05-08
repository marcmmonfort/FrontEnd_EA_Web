
/*
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Network from '../Api/Network';
import CurrentUserStore from '../Stores/CurrentUserStore';
import EnvironmentStore from '../Stores/EnvironmentStore';

interface HTTPClient {
  wrapper(inner: (error: any, response: any) => void): (error: any, response: any) => void;
  addHeaders(req: AxiosRequestConfig): AxiosRequestConfig;
  fetch(req: AxiosRequestConfig, callback: (error: any, response: any) => void): void;
  url(path: string): string;
  post(path: string, values: any, callback: (error: any, response: any) => void): void;
  put(path: string, values: any, callback: (error: any, response: any) => void): void;
  get(path: string, params: any, callback: (error: any, response: any) => void): void;
}

const HTTPClient: HTTPClient = {
  wrapper: function (inner) {
    return function (error, response) {
      Network.completed();

      if (!inner) return;
      // chance to wrap and call original

      let parsed = null;
      if (response && response.data) {
        parsed = response.data;
      }

      let errorObj = null;
      let valueObj = null;

      if (error) {
        errorObj = {};
        if (error.response && error.response.status) {
          errorObj.status = error.response.status; // 422
        } else {
          errorObj.status = 520; // Unknown error
        }

        errorObj.errors = [];
        if (parsed && parsed.error) {
          errorObj.message = parsed.error;
        }
        if (!errorObj.message) {
          errorObj.message = 'Server Error: ' + errorObj.status;
        }
        console.log('http error (' + errorObj.status + '): ' + errorObj.message);
      } else {
        valueObj = parsed;
      }
      inner(errorObj, valueObj);
    };
  },

  addHeaders: function (req) {
    // TODO: load version from somewhere
    const appVersion = '1.0';
    const userAgent = 'Sample iPhone v' + appVersion;
    const locale = 'en-US';

    req = {
      ...req,
      headers: {
        ...req.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'X-CLIENT-VERSION': appVersion,
        'X-Sample-User-Agent': userAgent,
        'X-LOCALE': locale,
      },
    };

    const currentUser = CurrentUserStore.get();
    if (currentUser && currentUser.getToken()) {
      req.headers['Authorization'] = 'Bearer ' + currentUser.getToken();
    }

    // if (currentUser && currentUser.data.guid) {
    //   req.headers['X-GUID'] = currentUser.data.guid;
    // }
    // if (currentUser && currentUser.data.ab_decision_group_id) {
    //   req.headers['X-AB-DECISION-GROUP-ID'] = currentUser.data.ab_decision_group_id.toString();
    // }
    // if (currentUser && currentUser.data.ab_decision) {
    //   req.headers['X-AB-DECISION'] = currentUser.data.ab_decision;
    // }

    return req;
  },

  fetch: function (req, callback) {
    req = this.addHeaders(req);
    Network.started();
    axios(req)
      .then((response: AxiosResponse) => {
        this.wrapper(callback)(null, response);
      })
    */
     
