import api from "./api";

export const testGet = () => {
  return api
    .get("/")
    .then(function (response) {
      // handle success
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return null;
    });
};
