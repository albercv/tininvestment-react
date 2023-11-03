import axios from "axios";
import CookieProvider, { useCookies } from "../provider/CookieProvider";

const API_URL = process.env.REACT_APP_API_URL;

export const useApi = () => {
    const { getCookie, setCookie } = useCookies();

    const getToken = () => {
        return getCookie('token');
    };


    const token = useCookies().getCookie('token');

    //TODO create a unique method for calling the api
     const fetchItems = () => {

        return axios.get(`${API_URL}/picture?offset=0&page=10`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.table(err);
                return { "Error": JSON.stringify(err) };
            })
            .finally(() => {
                console.log("Clean Up");
            })
    };

     const apiCreateNewPicture = (newPicture) => {
        return axios.post(`${API_URL}/picture/create`, JSON.stringify(newPicture), {
            headers: {
                'Authorization': `Bearer ${getToken('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(JSON.stringify(res));
                return res;
            })
            .catch(err => {
                console.table(err);
                return { "Error": JSON.stringify(err) };
            })
            .finally(() => {
                console.log("Clean Up");
            })
    }

     const apiEditPicture = (editPicture) => {
        console.log(`Edit picture: ${JSON.stringify(editPicture)}`);
        return axios.put(`${API_URL}/picture/edit/${editPicture.id}`, JSON.stringify(editPicture), {
            headers: {
                'Authorization': `Bearer ${getToken('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(JSON.stringify(res));
                return res;
            })
            .catch(err => {
                console.table(err);
                return { "Error": JSON.stringify(err) };
            })
            .finally(() => {
                console.log("Clean Up");
            })
    }

     const apiDeletePicture = (id) => {
        console.log(`Delete picture: ${id}`);
        return axios.delete(`${API_URL}/picture/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(JSON.stringify(res));
                return res;
            })
            .catch(err => {
                console.table(`Error: ${JSON.stringify(err)}`);
                return { "Error": JSON.stringify(err) };
            })
            .finally(() => {
                console.log("Clean Up");
            })
    }

     const apiCreateUser = (newUser) => {

        console.log(`NEW USER: ${JSON.stringify(newUser)}`);

        return axios.post(`${API_URL}/auth/register/google`, JSON.stringify(newUser), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                apiAuthenticateToken(newUser);
                return res;
            })
            .catch(err => {
                console.table(err);
                return { "Error": JSON.stringify(err) };
            })
            .finally(() => {
                console.log("Clean Up");
            })
    }

     const apiAuthenticateToken = (newUser) => {

        return axios.post(`${API_URL}/auth/authenticate/google`, JSON.stringify(newUser), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                //TODO save token in local storage
                console.table(`Succes: ${JSON.stringify(res.data.token)}`);
                setCookie('token', res.data.token);
                return res;
            })
            .catch(err => {
                console.table(err);
                return { "Error": JSON.stringify(err) };
            })
            .finally(() => {
                console.log("Clean Up");
            })
    }
    return {
        fetchItems,
        apiCreateNewPicture,
        apiEditPicture,
        apiDeletePicture,
        apiCreateUser,
        apiAuthenticateToken
      };
}