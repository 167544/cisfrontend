import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import * as d3 from 'd3';
import './TableRepresentation.css';

const ResourceType = (props) => {
  const data = useSelector((state) => state.Empdata); // Assuming you're using Redux to get data
  const [resourceCounts, setResourceCounts] = useState([]);
  const columnName = props.columnname; // Your column name
  const svgRef = useRef();

  useEffect(() => {
    setResourceCounts(getCountsByResource());
  }, [data]);

  useEffect(() => {
    if (resourceCounts.length > 0) {
      createPieChart();
      createLegend();
    }
  }, [resourceCounts]);

  const getCountsByResource = () => {
    const counts = {};
    data.forEach((item) => {
      const resource = item['Resource Type'];
      counts[resource] = counts[resource] ? counts[resource] + 1 : 1;
    });
    return Object.entries(counts).map(([resource, count]) => ({ _id: resource, count }));
  };

  const createPieChart = () => {
    const width = 400; // Set pie chart width
    const height = 300; // Set pie chart height
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .range(["#4daf4a", "#377eb8", "#ff7f00", "#984ea3", "#e41a1c", "#ff6f61", "#a3de83", "#79abd8", "#ffa500"]);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 10);

    const pie = d3.pie()
      .sort(null)
      .value((d) => d.count);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
     
      
    const g = svg.selectAll(".arc")
      .data(pie(resourceCounts))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.data._id));

    // Hide legends on pie chart
    svg.selectAll(".legend").remove();
  };

  const createLegend = () => {
    const color = d3.scaleOrdinal()
      .range(["#4daf4a", "#377eb8", "#ff7f00", "#984ea3", "#e41a1c", "#ff6f61", "#a3de83", "#79abd8", "#ffa500"]);

    const legend = d3.select(svgRef.current.parentNode).append("div")
      .attr("class", "legend")
      .style("position", "absolute")
      .style("top", "230px")
      .style("right", "0px")
      .style("background-color", "rgba(255, 255, 255, 0.8)")
      .style("padding", "10px")
      .style("border-radius", "5px");

    resourceCounts.forEach((resource, index) => {
      const legendItem = legend.append("div")
        .style("display", "flex")
        .style("align-items", "center")
        .style("margin-bottom", "5px");

      legendItem.append("div")
        .style("width", "10px") // Decrease the width of legend color box
        .style("height", "10px") // Decrease the height of legend color box
        .style("background-color", color(resource._id))
        .style("margin-right", "5px");

      legendItem.append("div")
        .text(`${resource._id}: ${resource.count}`);
    });
  };

  return (
    <div className='m-2' style={{ border: '1px solid white', position: 'relative', width: "300px" ,padding:"16px", boxShadow: "1px 4px 6px #0A6E7C",
    borderRadius: "10px",border: "none", width:"fit-content", }}>
      <h1 style={{ fontSize: '22px', fontWeight: 'bolder', textAlign: 'center', color: '#0A6E7C' }}>{columnName}</h1>
      <div style={{ textAlign: 'center' }}>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default ResourceType;
