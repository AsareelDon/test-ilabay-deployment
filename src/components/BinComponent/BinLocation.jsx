import { useState } from 'react';
import RouteCollection from '../BinComponent/RouteCollection';
import useAuth from '../../hooks/useAuth';
import { fetchBinLists } from '../../api/bin';
import CreateBinModal from '../modals/CreateNewBin';
import { useQuery } from 'react-query';
import { ROLES } from '../../context/MenuContext';

const BinLocation = () => {
  const { auth } = useAuth();
  const [show, setShow] = useState(false);
  const [binMetaData, setMetaData] = useState([{
    binName: '',
    address: '',
    lat: '',
    long: '',
  }]);

  const { data: bins, refetch } = useQuery('binData', () => fetchBinLists(auth?.token.accessToken));

  const handleMapClick = (e) => {
    if (ROLES.hasPrivilege(auth?.userRole)) {
      const { lat, lng } = e.latlng;
      // updates previous metadata state
      setMetaData(prevState => [
        ...prevState,
        {
          ...prevState[prevState.length - 1],
          lat: lat,
          long: lng
        }
      ]);
      setShow(true);
    }
  }
  
  // handling inputs by taking onchange e.target.value and e.target.name
  const handleOnChange = (inputName) => (e) => {
    const { value } = e.target;
    // updates previous metadata state
    setMetaData(prevState => [
      ...prevState,
      {
        ...prevState[prevState.length - 1],
        [inputName]: value
      }
    ]);
  }

  const handleCancel = () => {
    setShow(!show);
    setMetaData(prevState => {
      const newState = prevState.slice(0, prevState.length - 1);
      return newState;
    });
  };
  
  const refreshData = () => {
    setShow(!show);
    refetch();
  };

  return (
    <div className='flex flex-col items-start h-full gap-y-2'>
      <div className='flex flex-col items-start gap-y-1 w-full'>
        <h1 className='text-gray-700 text-xl tracking-wide'>Bins Location</h1>
        {ROLES.hasPrivilege(auth?.userRole) && 
          <p className='text-sm text-gray-500'>
            <span className='text-sm text-blue-500'>Note</span>: You can create a new location marker on the map by simply tapping on the desired area.
          </p>
        }
      </div>
      <RouteCollection 
        handleMapClick={handleMapClick} 
        binMetaData={bins}
      />
      <CreateBinModal 
        handleOnChange={handleOnChange}
        binMetaData={binMetaData}
        show={show}
        setShow={setShow}
        handleCancel={handleCancel}
        refreshData={refreshData}
      />
    </div>
  );

}

export default BinLocation;

// credits to the owner of the icon
// <a href="https://www.flaticon.com/free-icons/garbage" title="garbage icons">Garbage icons created by max.icons - Flaticon</a>