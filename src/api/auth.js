import axios from './axios';

const auth = {
    userAuth: async(userCredential) => {
        const response = await axios.post(`auth/signin`, userCredential, {
            headers: { 'Content-type': 'application/json', },
        });
        
        return response.data;
    },

    refreshToken: async() => {

    },

    logout: async() => {
        try {

        } catch (error) {
            console.log(error);
        }
    }
    
}

export default auth;