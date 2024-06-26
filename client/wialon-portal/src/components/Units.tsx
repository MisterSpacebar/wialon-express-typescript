// Units.tsx
import { useState, useEffect, useContext } from 'react';
import { server, DataContext } from '../App.tsx';
import UnitModal from './unitModal.tsx';

import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../styles/pageHeader.css';
import '../styles/unitTable.css';

interface UnitsData {
  nm: string; // Name
  cls: number; // Class
  id: number; // Unit ID
  hw: number; // Hardware ID
  // Add more properties as needed
}
// let loadedUnits = [];

const Units = () => {
    console.log('Units component mounted');
    // state to store the units data
    const { data } = useContext(DataContext);
    const [units, setUnits] = useState<UnitsData[] | null>(null);
    const [totalUnits, setTotalUnits] = useState<number>(0);
    // state for modal
    const [modalShow, setModalShow] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<UnitsData | null>(null);
    const [hardwareIDs, setHardwareIDs] = useState<number[]>([]);
    //const [hardwareNames, setHardwareNames] = useState<String[]>([]);

    const [searchUnit, setSearchUnit] = useState('template');
    const [unitSearch, setUnitSearch] = useState(searchUnit);
    const [searchTrigger, setSearchTrigger] = useState(false);

    // Function to handle the search unit, search is triggered by state change
    const handleSearchUnit = () => {
      setSearchTrigger(!searchTrigger)
      if (searchUnit !== '') {
        setUnitSearch(searchUnit);
      } else if(searchUnit === '') {
        setUnitSearch('*');
      }
    }

    // Fetch unit data from the server and update component state
    // useEffect hook is used to fetch data when the component is mounted
    // The hook will also fetch data when the search trigger state changes
    // The search trigger state changes when the search button is clicked
    // The search button click triggers the handleSearchUnit function
    // The handleSearchUnit function changes the search trigger state
    useEffect(() => {
        console.log('user data (context):', data);
        if(data){
            fetch(`${server.port}/units/all-units/${data.session_id}/${searchUnit || ''}`)
            .then(response => response.json())
            .then(unitData => {
                // Handle the data
                console.log('Unit data:', unitData);
                setTotalUnits(unitData.totalItemsCount);
                setUnits(unitData.items);

                let hardware_ids: number[] = [];
                for (let i = 0; i < unitData.items.length; i++) {
                  console.log('Hardware ID:', unitData.items[i].hw);
                  hardware_ids.push(unitData.items[i].hw);
                }
                setHardwareIDs(hardware_ids);
                console.log('Hardware IDs:', hardware_ids);

            })
            .catch(unitData => {
                // Handle the error
                console.error('Failed to fetch units:', unitData);
            });
        } else {
            console.error('No user data available', data);
        }
    }, [searchTrigger]);

    useEffect(() => {
      console.log('Hardware IDs (saved):', hardwareIDs);
      if(hardwareIDs.length > 0) {
        fetch(`${server.port}/hardwareID/${data?.session_id}/${hardwareIDs}`)
        .then(response => response.json())
        .then(hardwareData => {
          console.log('Hardware data:', hardwareData);
        });
      }
  }, [hardwareIDs]);

    return (
        <div>
         <div className='page-header '>
          <h1>{unitSearch}</h1>
          <p>Units Found: {totalUnits}</p>
          <InputGroup className="mb-3 unit-search-bar">
            <Form.Control
              placeholder="Search for a unit"
              aria-label="Search for a unit"
              aria-describedby="basic-addon2"
              onChange={e => setSearchUnit(e.target.value)}
            />
            <Button variant="primary" id="button-addon2" onClick={handleSearchUnit}>
              Search
            </Button>
          </InputGroup>
         </div>
          <div className='container'>
            <table className='table table-striped unit-table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  {/* <th>Class</th> */}
                  <th>Unit ID</th>
                  <th>Hardware ID</th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {units?.map((item, index) => (
                  <tr className='unit' key={index}>
                    <td>{index+1}</td>
                    <td>{item.nm}</td>
                    {/* <td>{item.cls}</td> */}
                    <td>{item.id}</td>
                    <td>{item.hw}</td>
                    {/* Add more cells as needed */}
                    <td>
                      <Button
                        variant="outline-primary btn-sm"
                        onClick={() => {
                          setSelectedUnit(item);
                          setModalShow(true);
                        }}>
                        Apply
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UnitModal show={modalShow} onHide={() => setModalShow(false)} unit={selectedUnit} session_id={data?.session_id || ''} />
      </div>
    );
};

export default Units;