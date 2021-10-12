import http from './http-common';

const get = () => {
  return http.get(`/cardapio`);
};

export default {
  get,
};
