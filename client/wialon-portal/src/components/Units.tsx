// Units.tsx
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../App.tsx';

interface UnitsData {
    nm: string; // Name
    cls: number; // Class
    id: number; // Unit ID
    hw: number; // Hardware ID
    // Add more properties as needed
  }

const Units = () => {
    console.log('Units component mounted');
    const { data } = useContext(DataContext);
    const [units, setUnits] = useState<UnitsData[] | null>(null);
    const [totalUnits, setTotalUnits] = useState<number>(0);

    useEffect(() => {
        console.log('user data (context):', data);
        if(data){
            fetch("http://localhost:3000/units/all-units/"+data.session_id)
            .then(response => response.json())
            .then(unitData => {
                // Handle the data
                console.log('Unit data:', unitData);
                setTotalUnits(unitData.totalItemsCount);
                setUnits(unitData.items);
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
        <h1>Units</h1>
        <p>Total Units: {totalUnits}</p>
        <table className='pure-table'>
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
            {units && units.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.nm}</td>
                <td>{item.cls}</td>
                <td>{item.id}</td>
                <td>{item.hw}</td>
                {/* Add more cells as needed */}
                <div>
                  <a className="pure-button button-secondary" href="#">Apply</a>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Units;