import React from 'react';

const TableRow = ({feature, index, productA, productB}) => {
  return (
    <tr className="table-row">
      {productA.includes(feature) ? <td className="product-col1">✔</td> : null}
      <td className="feature">{feature.value} {feature.feature}</td>
      {productB.includes(feature) ? <td className="product-col2">✔</td> : null}
    </tr>
  );
};

export default TableRow;