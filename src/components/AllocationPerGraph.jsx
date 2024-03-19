import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import './TableRepresentation.css';

const AllocationPerGraph = (props) => {
  const [allocationData, setAllocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const columnName = props.columnname;
  const svgRef = useRef();
  const width = 300;
  const height = 300;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedColumnName = encodeURIComponent(columnName);
        const response = await axios.get(`http://localhost:3004/getLocationCounts/${encodedColumnName}`);
        setAllocationData(response.data);
      } catch (error) {
        console.error('Error fetching allocation data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [columnName]);

  useEffect(() => {
    if (allocationData.length > 0) {
      drawHorizontalBarChart();
    }
  }, [allocationData]);

  const prepareData = () => {
    const segmentData = Array.from({ length: 10 }, (_, i) => {
      const lowerBound = i * 10 + 1;
      const upperBound = lowerBound + 9;
      const count = allocationData.reduce((acc, item) => {
        if (item._id >= lowerBound && item._id <= upperBound) {
          return acc + item.count;
        }
        return acc;
      }, 0);
      return { name: `${lowerBound}-${upperBound}`, value: count };
    });
    return segmentData;
  };


  const drawHorizontalBarChart = () => {
    const data = prepareData();
  
    const width = 300; // Example width
    const height = 300; // Example height
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([margin.left, width - margin.right]);
  
    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);
  
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.schemeCategory10);
  
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("style", "max-width: 100%; height: auto;");
  
    svg.selectAll('*').remove();
  
    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("fill", d => color(d.name))
      .attr("x", margin.left)
      .attr("y", d => y(d.name))
      .attr("width", d => x(d.value) - margin.left)
      .attr("height", y.bandwidth())
      .append("title")
      .text(d => `${d.name}: ${d.value}`);
  
    svg.selectAll("text")
      .data(data)
      .enter().append("text")
      .attr("x", d => x(d.value) + 5)
      .attr("y", d => y(d.name) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .style("font-size", "12px")
      .text(d => d.value);
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  };
  
  
  
  
  return (
    <div className='m-2' style={{ border: '1px solid white', width: "300px" ,padding:"16px", boxShadow: "1px 4px 6px #0A6E7C",
    borderRadius: "10px",border: "none", width:"fit-content",}}>
      <h1 style={{ fontSize: '22px', fontWeight: 'bolder', textAlign: 'center', color: '#0A6E7C' }}>{columnName}</h1>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <svg ref={svgRef}></svg>
        </div>
      )}
    </div>
  );
};

export default AllocationPerGraph;
