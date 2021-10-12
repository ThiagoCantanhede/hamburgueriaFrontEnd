import http from './http-common';

const get = () => {
  return http.get(`/ingredientes`);
};

export default {
  get,
};
