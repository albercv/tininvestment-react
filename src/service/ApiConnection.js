import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const username = 'Alber';
const password = '1234';

const token = btoa(`${username}:${password}`);

//TODO create a unique method
export const fetchItems = () => {

    return axios.get(`${API_URL}/picture?offset=0&page=10`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.table(err);
            return {"Error":JSON.stringify(err)};
        })
        .finally(() => {
            console.log("Clean Up");
        })
};

export const apiCreateNewPicture = (newPicture) => {
    return axios.post(`${API_URL}/picture/create`, JSON.stringify(newPicture), {
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            console.log(JSON.stringify(res));
            return res;
        })
        .catch(err => {
            console.table(err);
            return {"Error":JSON.stringify(err)};
        })
        .finally(() => {
            console.log("Clean Up");
        })
}

export const apiEditPicture = (editPicture) => {
    console.log(`Edit picture: ${JSON.stringify(editPicture)}`);
}