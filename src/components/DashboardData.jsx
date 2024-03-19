import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import StatBox from '../components/StatBox';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BandGraph from './BandGraph';
import USTExp from './USTExp';
import TableRepresentation from './TableRepresentation';
import ResourceType from './ResourceType';
import EmployeeStatusGraph from './EmployeeStatusGraph';
import AllocationPerGraph from './AllocationPerGraph';
import DashboardRepresentation from './DashboardRepresentation';
import ManagerSelect from '../scenes/global/ManagerSelect';
import PrimarySkills from '../scenes/global/PrimarySkills';
import  setdata from '../actions';
import UploadExcel from './UploadExcel';

function DashboardData(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [employeeData, setEmployeeData] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [activeEmployeeCount, setActiveEmployeeCount] = useState(0);
  const [resourceWithValidVisaCount, setResourceWithValidVisaCount] = useState(0);
  const [showRepresentation, setShowRepresentation] = useState(false);
  const [selectedBoxName, setSelectedBoxName] = useState(null);
  // State for tracking data upload
  const [isDataUploaded, setIsDataUploaded] = useState(0);

  // Handle the uploaded data
  const handleUploadSuccess = () => {
    setIsDataUploaded(isDataUploaded + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/fetchdata');
      dispatch(setdata(response.data));
      const data = response.data;

      setEmployeeData(data);

      const customerIDs = [...new Set(data.map(item => item['Customer ID']))];
      setCustomerCount(customerIDs.length);

      const activeEmployees = data.filter(item => item['Employee Status'] === 'Active');
      setActiveEmployeeCount(activeEmployees.length);

      const resourcesWithValidVisa = data.filter(item => item['Resource with Valid VISA']);
      setResourceWithValidVisaCount(resourcesWithValidVisa.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBoxClick = (boxName) => {
    setSelectedBoxName(boxName);
    setShowRepresentation(true);
  };

  const handlePrimarySelect = (boxName) => {
    setSelectedBoxName(boxName + 'skills');
    setShowRepresentation(true);
  };

  const handleManagerSelect = (boxName) => {
    setSelectedBoxName(boxName + 'manager');
    setShowRepresentation(true);
  };

  const boxes = [
    { title: 'Total Employees', value: employeeData.length, icon: <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} /> },
    { title: 'Total Customers', value: customerCount, icon: <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} /> },
    { title: 'Active Employee Count', value: activeEmployeeCount, icon: <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} /> },
    { title: 'Resources with Valid Visa', value: resourceWithValidVisaCount, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} /> },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
       
        <div style={{display: 'flex', justifyContent: 'space-between',alignItems:"center",marginTop: '1rem'}}>
        <UploadExcel onUploadSuccess={handleUploadSuccess}   />
          <ManagerSelect handleBoxClick={handleManagerSelect} />
          <PrimarySkills handleBoxClick={handlePrimarySelect} />
        </div>
      </div>
      <div style={{ margin: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem', flexWrap: 'wrap', padding:"16px", boxShadow: "1px 4px 6px #0A6E7C",
    borderRadius: "5px",border: "none", width:"fit-content",background:"#0A6E7C"  }}>
          {boxes.map((box, index) => (
            <div key={index} style={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: 'white', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleBoxClick(box.title)}>
              <h4 style={{ fontSize: '18px', fontWeight: 'bolder', fontFamily: 'serif', color: '#0A6E7C' }}>{box.title}</h4>
              <p style={{ color: 'black', fontSize: '1.5rem' }}>{box.value}</p>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-start gap-4" style={{ marginTop: '2rem' }}>
          <BandGraph isDataUploaded={props.isDataUploaded} />
          <USTExp isDataUploaded={props.isDataUploaded} />
         
        </div>
        <div className="d-flex justify-content-start gap-4" style={{ marginTop: '2rem' }}>
          <ResourceType columnname="Resource Type" isDataUploaded={props.isDataUploaded} />
          <EmployeeStatusGraph columnname="Employee Status" isDataUploaded={props.isDataUploaded} />
          <TableRepresentation columnname="Country" isDataUploaded={props.isDataUploaded} />
          {/* <AllocationPerGraph columnname="Allocation Percentage" isDataUploaded={props.isDataUploaded} /> */}
        </div>
        <div style={{display: "flex",justifyContent:"flex-start",alignItems:"center",columnGap:"16px",marginTop:"1rem"}}>
          <Button className="m-2" variant="contained" color="primary" onClick={() => handleBoxClick('selectedlist')}>Shortlist List</Button>
          <Button className="m-2" variant="contained" color="primary" onClick={() => handleBoxClick('removedlist')}>Removed List</Button>
        </div>
        <DashboardRepresentation data={selectedBoxName} />
      </div>
    </div>
  );
}

export default DashboardData;
