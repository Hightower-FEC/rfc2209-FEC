import React from 'react';

const TableRow = ({feature, index, currentProduct, productB}) => {
  return (
    <tr className="table-row">
      {currentProduct.filter(item => item.value === feature.value).length > 0 ? <td className="product-col1">✔</td> : null}
      {feature.value ? <td className="feature">{feature.value} {feature.feature}</td> : null}
      {productB.filter(item => item.value === feature.value).length > 0 ? <td className="product-col2">✔</td> : null}
    </tr>
  );
};

export default TableRow;