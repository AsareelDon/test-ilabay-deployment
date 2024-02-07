import { PiTrashSimpleFill } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { SiGoogleanalytics, SiGooglemaps } from "react-icons/si";
import { FaThList } from "react-icons/fa";

const ROLES = {
  hasPrivilege: function(role) {
    const roles = [
      'Administrator',      
      'Section Head',
      'Section Head Assistant',
    ];
    return roles.includes(role);
  },
  adminPrivilege: function(role) {
    const roles = [
      'Administrator', 
    ];
    return roles.includes(role);
  },
  secHeadPrivilege: function(role) {
    const roles = [
      'Section Head', 
    ];
    return roles.includes(role);
  },
  hasSectionPrivilege: function(role) {
    const roles = [
      'Section Head',
      'Section Head Assistant',
    ];
    return roles.includes(role);
  },
  hasNoPrivilege: function(role) {
    const roles = [
      'Section Head Assistant',
      'Garbage Collector',
      'Section Staff',
    ];
    return roles.includes(role);
  }
};

const utils = {
    sidebarMenu: [
        { 
            id: 1,
            Labels: 'Bins',
            submenu: true,
            type: 'public',
            icon: PiTrashSimpleFill,
            submenuItems: [
                { 
                    id: 1, 
                    path: 'analytics',
                    Labels: 'Analytics',
                    icons: SiGoogleanalytics,
                },
                { 
                    id: 2, 
                    path: 'collection_route',
                    Labels: 'IOT Bins location',
                    icons: SiGooglemaps,
                },
            ], 
        },
        { 
            id: 2,
            Labels: 'Users',
            icon: BsFillPeopleFill,
            submenu: true,
            type: 'private',
            submenuItems: [
                { 
                    id: 1, 
                    path: 'user_table',
                    Labels: 'View Records',
                    icons: FaThList,
                },
            ],
        },
        
    ]
}
export { ROLES, utils };