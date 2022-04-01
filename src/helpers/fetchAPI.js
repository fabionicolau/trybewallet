const fetchAPI = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchAPI;
