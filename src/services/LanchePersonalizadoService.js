import http from './http-common';

const post = (data) => {
  return http.post('/calcularTotalLanchePersonalizado', data);
};

export default {
  post,
};
