import axios from "./axios";

const user = {
    userProfile: async (token, userId) => {
        const response = await axios.get(`user/${userId}`, {
            headers: { Authorization: `Bearer ${token}`, }
        });
            
        return response;
    },
    fetchUsers: async (token) => {
        const response = await axios.get('users', {
            headers: { Authorization: `Bearer ${token}`, }
        });
        return response;

    },
    createUser: async ({ token, userData }) => {
        const response = await axios.post('protected/create-user', userData, {
            headers: { 
                'Content-type': 'application/json', 
                Authorization: `Bearer ${token}`, 
            }
        });
        return response.data;
    },

    userDelete: async (token, userId) => {
        const response = await axios.delete(`protected/delete/user/${userId}`, {
            headers: { 
                'Content-type': 'application/json', 
                Authorization: `Bearer ${token}`, 
            }
        });
        
        return response;
    },

    userReactivate: async (token, userId) => {
        const response = await axios.post(`protected/activate/user/${userId}`, {
            headers: { 
                'Content-type': 'application/json', 
                Authorization: `Bearer ${token}`, 
            }
        });
        
        return response;
    },

    userUpdate: async ({ token, userData }) => {
        const userId = userData['id'];
        const response = await axios.put(`protected/update/user/${userId}`, userData, {
            headers: { 
                'Content-type': 'application/json', 
                Authorization: `Bearer ${token}`, 
            }
        });
        
        return response.data;
    },

    confirmEmail: async (email) => {
        const payload = { userEmail: email};
        const response = await axios.post('request_password_reset', payload, {
            headers: { 
                'Content-type': 'application/json', 
            }
        });

        return response.data;
    },

    confirmOTPCode: async (otpCode) => {
        const pId = sessionStorage.getItem('resetPid');
        const payload = { otpCode: otpCode, pwd_Id: pId };
        const response = await axios.post('password_reset', payload, {
            headers: { 
                'Content-type': 'application/json', 
            }
        });

        return response.data;
    },

    passwordReset: async (newUserPassword) => {
        const uuid = sessionStorage.getItem('uuid');
        const payload = { password: newUserPassword };
        const response = await axios.post(`create_new_password/${uuid}`, payload, {
            headers: { 'Content-type': 'application/json', },
        });
        
        return response.data;
    },
} 

export default user;