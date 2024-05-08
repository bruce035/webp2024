import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Datagrid = () => {
  const [dataset, setDataset] = useState([]);
  const [filteredDataset, setFilteredDataset] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
    const fetchData = async () => {
      try {
        const response = await fetch(openUrl);
        const data = await response.json();
        setDataset(data);
        setFilteredDataset(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value.toUpperCase();
    const filteredData = dataset.filter((data) =>
      data.title.toUpperCase().includes(keyword)
    );
    setFilteredDataset(filteredData);
  };

  const columns = [
    { field: 'title', headerName: '名稱', width: 200 },
    { field: 'location', headerName: '地點', width: 200 },
    { field: 'price', headerName: '票價', width: 150 }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="輸入名稱進行搜尋..."
        style={{ marginBottom: '20px' }}
      />
      <DataGrid
        rows={filteredDataset.map((data, index) => ({
          id: index,
          title: data.title,
          location: data.showInfo[0].location,
          price: data.showInfo[0].price
        }))}
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
};

export default Datagrid;
