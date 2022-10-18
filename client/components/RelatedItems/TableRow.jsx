import React from 'react';

const TableRow = ({feature}) => {
  return (
    <tr className="table-row">
      {feature.value !== undefined ? <td className="product-col1">✔</td> : null}
      <td className="feature">{feature.value} {feature.feature}</td>
      <td className="product-col2"></td>
    </tr>
  );
};

export default TableRow;