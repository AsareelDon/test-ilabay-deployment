import { useState, useEffect } from 'react';
import toast from '../../templates/toastify';
import useAuth from '../../hooks/useAuth';
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiCloseFill } from "react-icons/ri";
import { useMutation } from 'react-query';
import { registerNewBin } from '../../api/bin';

const CreateBinModal = ({ handleOnChange, binMetaData, show, setShow, handleCancel, refreshData }) => {
    const { auth } = useAuth();

    const { mutate, isLoading } = useMutation(registerNewBin, {
        onSuccess: (data) => {
            toast.success(data.message);
            refreshData();
        },
        onError: (error) => {
            // for debugging purposes only
            toast.error(error?.response?.data?.errorMessage);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMetaData = binMetaData.filter(data => data.binName && data.address && data.lat && data.long).pop();
        if (newMetaData) {
            mutate({ token: auth?.token.accessToken, binData: newMetaData });
        } else {
            console.log('error');
        }
    };

    return (
        <>
            { show ? (
                <>
                    <div className="flex backdrop-brightness-75 justify-center items-center fixed inset-0 z-50" style={{ zIndex: 2000 }}>
                        <div className="relative w-full md:w-2/4 lg:w-2/6 lg:mx-5 mx-4">
                            <div className="flex flex-col rounded-lg shadow-lg bg-white">
                                <div className="border-b rounded-t-md bg-gray-100 px-6">
                                    <span className='flex items-center justify-between'>
                                        <h1 className="heading mb-2 pt-3 text-gray-700 text-2xl">Create a new Marker</h1>
                                        <RiCloseFill
                                            title='Close'
                                            onClick={handleCancel}
                                            className='cursor-pointer text-3xl text-red-500'
                                        />
                                    </span>
                                    <p className='text-md text-gray-600 mb-2'>
                                        <span className='text-blue-500 tracking-wide mr-1'>Note:</span>You are going to register new bin designation. 
                                        Before confirming, please double check the inputs you made.
                                    </p>
                                </div>
                                <div className="">
                                    <form onSubmit={handleSubmit} className='p-6 flex flex-col'>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <label className='block text-md font-medium text-gray-700 mb-2' htmlFor="binName">
                                                    Device name
                                                </label>
                                                <input 
                                                    id="binName"
                                                    name='binName'
                                                    type="text" 
                                                    autoComplete='off' 
                                                    required
                                                    onChange={handleOnChange('binName')}
                                                    className={`shadow border border-gray-300 rounded w-full h-12 py-1 px-3 text-gray-900 focus:shadow-outline 
                                                    focus:outline-none focus:ring-2 ring-cgreen ring-offset-2`} 
                                                     
                                                />
                                            </div>
                                        </div>
                                        <div className='inline-flex gap-x-4 mb-2 w-full'>
                                            <div className='w-full'>
                                                <label className='block text-md font-medium text-gray-700 mb-2' htmlFor="address">
                                                    Address
                                                </label>
                                                <input 
                                                    id="address"
                                                    name='address'
                                                    type="address" 
                                                    required
                                                    onChange={handleOnChange('address')}
                                                    className={`shadow border border-gray-300 rounded w-full h-12 py-1 px-3 text-gray-900 focus:shadow-outline 
                                                    focus:outline-none focus:ring-2 ring-cgreen ring-offset-2`} 
                                                     
                                                />
                                            </div>
                                        </div>
                                        <div className="flex mt-2 items-center justify-end rounded-b">
                                            <button
                                                disabled={isLoading}
                                                title='Create Marker'
                                                className={`${isLoading && 'bg-dark-green cursor-not-allowed'} mb-2 border 
                                                border-cgreen bg-cgreen text-white hover:bg-dark-green text-md font-medium
                                                outline-cgreen focus:outline focus:outline-offset-2 rounded-lg shadow 
                                                hover:shadow-md w-full px-10 py-3`}
                                                type="submit">
                                                { isLoading? <div className="inline-flex justify-center items-center gap-3">
                                                    <AiOutlineLoading3Quarters className="animate-spin font-bold"/>
                                                        Saving...
                                                    </div> : 'Create Marker'
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default CreateBinModal;