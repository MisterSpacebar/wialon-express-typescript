// Units.tsx
import React, { useState, useEffect, useContext } from 'react';
import { server, DataContext } from '../App.tsx';
import UnitModal from './unitModal.tsx';

import { Modal, Button } from 'react-bootstrap';
import '../styles/pageHeader.css';
import '../styles/unitTable.css';

interface UnitsData {
  nm: string; // Name
  cls: number; // Class
  id: number; // Unit ID
  hw: number; // Hardware ID
  // Add more properties as needed
}

let loadedUnits = [];

const Units = () => {
    console.log('Units component mounted');
    // state to store the units data
    const { data } = useContext(DataContext);
    const [units, setUnits] = useState<UnitsData[] | null>(null);
    const [totalUnits, setTotalUnits] = useState<number>(0);
    // state for modal
    const [modalShow, setModalShow] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<UnitsData | null>(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log('user data (context):', data);
        if(data){
            fetch(server.port+"/units/all-units/"+data.session_id)
            .then(response => response.json())
            .then(unitData => {
                // Handle the data
                console.log('Unit data:', unitData);
                setTotalUnits(unitData.totalItemsCount);
                setUnits(unitData.items);
                loadedUnits = unitData.items;
            })
            .catch(unitData => {
                // Handle the error
                console.error('Failed to fetch units:', unitData);
            });
        } else {
            console.error('No user data available', data);
        }
    }, []);

    return (
        <div>
         <div className='page-header '>
          <h1>Units</h1>
          <p>Total Templates: {totalUnits}</p>
         </div>
          <div className='container'>
            <table className='table table-striped unit-table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>ID</th>
                  <th>Hardware ID</th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {units?.map((item, index) => (
                  <tr className='unit' key={index}>
                    <td>{index}</td>
                    <td>{item.nm}</td>
                    <td>{item.cls}</td>
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