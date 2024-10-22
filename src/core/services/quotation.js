// https://ch.melhorcambio.com/ws/extension-v3/m/c2.json

export default {
  fetchLastQuotation({ from, to }) {
    const reqURL = `https://economia.awesomeapi.com.br/json/last/${from}-${to}`;

    return fetch(reqURL)
      .then((res) => res.json())
      .then((data) => data[`${from}${to}`]);
  },
};
