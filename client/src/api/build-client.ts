import axios from 'axios';

const buildClient = ({ req }:any) => {

  const isServer = typeof window === 'undefined';
  const url =
    isServer
      ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
      : '/';

      return axios.create({ baseURL: url, headers: req?.headers})

};

export default buildClient;