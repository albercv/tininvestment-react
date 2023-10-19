import axios from "axios";


export const fetchItems = () => {
    return axios.get("http://localhost:8080/api/pictures?offset=0&page=10")
            .then(res => {
                return res.data.data;
            })
            .catch(err => {
                console.table(err);
            })
            .finally(() => {
                console.log("Clean Up");
            })
  };