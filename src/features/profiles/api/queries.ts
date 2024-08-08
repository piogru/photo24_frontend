import api from "../../core/api/api";

export const getProfile = () => {
  api
    .get("/profile")
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};
