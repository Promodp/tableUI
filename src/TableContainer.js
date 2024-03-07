
import React, { useState, useEffect, useRef } from 'react';
import { tableData } from './helpers/mockData';
import './TableContainer.css';

const TableContainer = () => {
  const [visibleData, setVisibleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const tableRef = useRef(null);

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newData = tableData.slice(visibleData.length, visibleData.length + 10);
      setVisibleData((prevData) => [...prevData, ...newData]);
      setIsLoading(false);
    }, 1000); 
  };

  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      loadMoreData();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading]); 

  const handlePopover = (event) => {
    // Calculate popover position based on the clicked element
    const clickedElement = event.target;
    const rect = clickedElement.getBoundingClientRect();
    const position = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };

    setPopoverPosition(position);
    setPopoverVisible(true);
  };

  const closePopover = () => {
    setPopoverVisible(false);
  };

  return (
    <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Title </th>
            <th>Language</th>
            <th>Content Type</th>
            <th>Version</th>
            <th>Publish Stage</th>
            <th>Workflow Stage</th>
            <th>Modified At</th>
            <th>Tags</th>
            <th>Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.language}</td>
              <td>{item.content_type}</td>
              <td className='td-version'>{item.version}</td>
              <td>{item.publish_stage}</td>
              <td>{item.workflow_stage}</td>
              <td>{item.modified_at}</td>
              <td>{item.tags}</td>
              <td>{item.added}</td>
              <td className='action_icon' onClick={handlePopover}></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div className="loader">Loading...</div>}
      {popoverVisible && (
        <div className="popover" style={{ top: popoverPosition.top, left: popoverPosition.left }}>
          Delete
          <button onClick={closePopover}>Close Popover</button>
        </div>
      )}
    </div>
  );
};

export default TableContainer;
