import React, { useState, useEffect } from 'react';
import './TableRepresentation.css';
import { useSelector } from 'react-redux';

const TableRepresentation = ({ columnname }) => {
  const data = useSelector((state) => state.Empdata);

  const getCountsByCountry = () => {
    const counts = {};
    data.forEach((item) => {
      const country = item.Country;
      counts[country] = counts[country] ? counts[country] + 1 : 1;
    });
    return Object.entries(counts).map(([country, count]) => ({ _id: country, count }));
  };

  const [countryCounts, setCountryCounts] = useState(getCountsByCountry());

  useEffect(() => {
    setCountryCounts(getCountsByCountry());
  }, [data]);

  return (
    <div className='m-2' style={{ border: '1px solid white', width: "300px" ,padding:"16px", boxShadow: "1px 4px 6px #0A6E7C",
    borderRadius: "10px",border: "none", width:"fit-content", }}>
      <h1 style={{ fontSize: '22px', fontWeight: 'bolder', textAlign: 'center', color: '#0A6E7C' }}>{columnname}</h1>

      <div style={{ textAlign: 'center', borderCollapse: 'collapse', height: '300px', overflow: 'scroll' }}>
        <table>
          <thead>
            <tr>
              <th style={{color:"#0A6E7C"}}>{columnname}</th>
              <th style={{color:"#0A6E7C"}}>Count</th>
            </tr>
          </thead>
          <tbody>
            {countryCounts.map((country, index) => (
              <tr key={index} style={{ border: '2px solid #0A6E7C',color:"#0A6E7C" }}>
                <td style={{ width: '200px' }}>{country._id}</td>
                <td>{country.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRepresentation;
