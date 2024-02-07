import { useEffect, useState } from "react";
import user from "../../api/user";
import toast from '../../templates/toastify';
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
    const [profile, setUser] = useState([]);
    const { auth } = useAuth();
    
    useEffect(() => {
        const profile = async () => {
            await user.userProfile(auth['token']['accessToken'], auth['id'])
            .then(response => response?.data?.user)
            .then(user => {
                console.log(user)
            })
            .catch((error) => {
                toast.error(error.response?.data?.message);
            });
        }
        profile();
        
    }, [profile]);

    return (
        <div className="mx-4 my-4 bg-white h-full rounded-lg p-5 shadow">
            <div className="flex flex-row justify-between mb-3">
                <h1 className="text-gray-700 font-medium text-xl underline">Profile</h1>
                <h1 className="text-gray-700 font-medium text-xl underline">Edit</h1>
            </div>
            <div className="flex items-center justify-center h-52 w-52 bg-cgreen rounded-full shadow-lg">
                Image
            </div>
            {/* <ul className="mt-4">
                <li>Name: {`${profile['firstname']} ${profile['lastname']}`}</li>
                <li>Email: {profile['email']}</li>
                <li>Status: {profile['status']}</li>
                <li>Role {profile['roleId'] === 1? 'admin': 'employee'}</li>
            </ul> */}
        </div>
    );
}
export default UserProfile;