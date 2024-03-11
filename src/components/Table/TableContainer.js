import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { tableData } from "../../helpers/mockData";
import Popover from "../Popover/popover";
import "./TableContainer.css";

const TableContainer = () => {
  const [visibleData, setVisibleData] = useState([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    Title: true,
    Language: true,
    Content_Type: true,
    Version: true,
    Publish_Stage: true,
    Workflow_Stage: true,
    Modified_At: true,
    Tags: true,
    Added: true,
  });
  const tableRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingInitial(false);
      loadMoreData();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const loadMoreData = () => {
    if (!allDataLoaded) {
      setIsLoadingMore(true);
      setTimeout(() => {
        const newData = tableData.slice(
          visibleData.length,
          visibleData.length + 10
        );
        if (newData.length === 0) {
          setAllDataLoaded(true);
        }
        setVisibleData((prevData) => [...prevData, ...newData]);
        setIsLoadingMore(false);
      }, 1000);
    }
  };

  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting && !isLoadingMore && !allDataLoaded) {
      loadMoreData();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }
    return () => observer.disconnect();
  }, [isLoadingMore, allDataLoaded]);

  const handlePopover = (item, event) => {
    const clickedElement = event.target;
    const rect = clickedElement.getBoundingClientRect();
    const position = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
    setSelectedItemIndex(item.id);
    setPopoverPosition(position);
    setPopoverVisible(true);
  };

  const closePopover = () => {
    setPopoverVisible(false);
    setSelectedItemIndex(null);
  };

  const deleteItem = (id) => {
    const updatedData = visibleData.filter((item) => item.id !== id);
    setVisibleData(updatedData);
    closePopover();
  };

  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column],
    }));
  };

  return (
    <div className="table-container" data-test="table-container-id">
      {isLoadingInitial ? (
        <div className="skeleton-loading">
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      ) : (
        <table ref={tableRef}>
          <thead>
            <tr>
              {Object.keys(columnVisibility).map(
                (column, index) =>
                  columnVisibility[column] && (
                    <th key={index}>
                      <div className="header-cell">
                        <span>{column}</span>
                        <div
                          className={`filter-icon ${
                            columnVisibility[column] ? "active" : ""
                          }`}
                          onClick={() => toggleColumnVisibility(column)}
                        >
                          <FontAwesomeIcon icon={faFilter} />
                        </div>
                      </div>
                    </th>
                  )
              )}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, index) => (
              <tr key={index}>
                {Object.keys(columnVisibility).map(
                  (column, columnIndex) =>
                    columnVisibility[column] && (
                      <td key={columnIndex}>{item[column]}</td>
                    )
                )}
                <td
                  className="action_icon"
                  onClick={(event) => handlePopover(item, event)}
                ></td>
              </tr>
            ))}
            {isLoadingMore && (
              <tr>
                <td
                  colSpan={
                    Object.keys(columnVisibility).filter(
                      (column) => columnVisibility[column]
                    ).length + 1
                  }
                  style={{ textAlign: "center" }}
                >
                  <div className="loader">Loading more...</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isLoadingInitial && (
        <div className="skeleton-loading">
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      )}

      {popoverVisible && (
        <Popover
          closePopover={closePopover}
          selectedItemIndex={selectedItemIndex}
          popoverPosition={popoverPosition}
          deleteItem={deleteItem}
        />
      )}
    </div>
  );
};

export default TableContainer;
