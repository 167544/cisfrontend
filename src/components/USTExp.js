import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import StatBox from '../components/StatBox';
import axios from 'axios';
import { useSelector } from 'react-redux';

function USTExp({ isDataUploaded }) {
    let Empdata = useSelector((state)=> state.Empdata)
    const [data, setData] = useState(null);
    const [lessThan1Year, setLessThan1Year] = useState(0);
    const [lessThan2Years, setLessThan2Years] = useState(0);
    const [between2And6Years, setBetween2And6Years] = useState(0);
    const [between6And10Years, setBetween6And10Years] = useState(0);
    const [moreThan10Years, setMoreThan10Years] = useState(0);
    const [unknown, setUnknown] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                

               
                let lessThan1YearCount = 0;
                let lessThan2YearsCount = 0;
                let between2And6YearsCount = 0;
                let between6And10YearsCount = 0;
                let moreThan10YearsCount = 0;
                let unknownCount = 0;
              
                Empdata.forEach(employee => {
                    const ustExperience = employee['UST Experience'];
                    if (ustExperience < 1) {
                        lessThan1YearCount++;
                    } else if (ustExperience < 2) {
                        lessThan2YearsCount++;
                    } else if (ustExperience >= 2 && ustExperience <= 6) {
                        between2And6YearsCount++;
                    } else if (ustExperience > 6 && ustExperience <= 10) {
                        between6And10YearsCount++;
                    } else if (ustExperience > 10) {
                        moreThan10YearsCount++;
                    } else {
                        unknownCount++;
                    }
                });

                // Update state variables with the counts
                setLessThan1Year(lessThan1YearCount);
                setLessThan2Years(lessThan2YearsCount);
                setBetween2And6Years(between2And6YearsCount);
                setBetween6And10Years(between6And10YearsCount);
                setMoreThan10Years(moreThan10YearsCount);
                setUnknown(unknownCount);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [Empdata]); 

    return (
        <div style={{ width: "300px" ,padding:"16px", boxShadow: "1px 4px 6px #0A6E7C",
        borderRadius: "10px",border: "none", width:"fit-content",}}>
                    <h1 style={{fontSize:"22px",textAlign:"center",fontWeight:"bolder",color:"#0A6E7C"}}>UST Experience</h1>

            <div className='d-flex'>
                
                <div>
                    <Box
                        gridColumn="span 2"
                        width={180}
                        style={{ margin: "10px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={lessThan1Year}
                            subtitle="< 1 Year"
                        />
                    </Box>

                    <Box
                        gridColumn="span 2"
                        width={180}
                        style={{ margin: "10px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={lessThan2Years}
                            subtitle="< 2 Years"
                        />
                    </Box>

                    <Box
                        gridColumn="span 2"
                        width={180}
                        style={{ margin: "10px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={between2And6Years}
                            subtitle="2 - 6 Years"
                        />
                    </Box>
                </div>

                <div>
                    <Box
                        gridColumn="span 2"
                        width={180}
                        style={{ margin: "10px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={between6And10Years}
                            subtitle="6 - 10 Years"
                        />
                    </Box>

                    <Box
                        gridColumn="span 2"
                        width={180}
                        style={{ margin: "10px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={moreThan10Years}
                            subtitle="10+ Years"
                        />
                    </Box>

                    <Box
                        gridColumn="span 2"
                        width={180}
                        style={{ margin: "10px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={unknown}
                            subtitle="Unknown"
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default USTExp;
