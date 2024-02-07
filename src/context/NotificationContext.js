import { IoDocumentTextOutline, IoCheckmarkDoneCircleOutline, IoWarningOutline } from "react-icons/io5";

const notif = {
    icons: [
        { 
            id: 1,
            Labels: 'Added a new user',
            icon: IoDocumentTextOutline,
            iconColor: 'bg-blue-700',
        },
        { 
            id: 2,
            Labels: 'Pending Collection',
            icon: IoWarningOutline,
            iconColor: 'bg-yellow-400',
        },
        { 
            id: 3,
            Labels: 'Collected',
            icon: IoCheckmarkDoneCircleOutline,
            iconColor: 'bg-cgreen',
        },
    ]
}

export default notif;