import React from 'react';
import TableRow from './TableRow.jsx';

const ComparisonModal = ({show, onClose, productA, productB, features}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="compare-modal" onClick={onClose}>
      <div className="modal-content">
        <h5 className="modal-header">COMPARING</h5>
        <div id="product-names">
          <h3>{productA.name}</h3>
          <h3 className="blank"></h3>
          <h3>{productB.name}</h3>
        </div>
        <div className="blank"></div>
        <table>
          <tbody>
            {features.map((feature, key) => {
              return <TableRow feature={feature} productA={productA.features} productB={productB.features} key={key} index={key}/>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonModal;