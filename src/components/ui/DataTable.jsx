const DataTable = ({ columns, data, maxHeight = "500px" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div className="table-container" style={{ maxHeight }}>
      <table className="table-custom">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx}>{row[col] ?? '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;