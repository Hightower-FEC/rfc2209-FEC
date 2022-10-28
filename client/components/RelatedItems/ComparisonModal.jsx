import React from 'react';
import TableRow from './TableRow.jsx';

const ComparisonModal = ({show, onClose, currentProduct, relatedProduct, features}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <h5 className="modal-header">COMPARING</h5>
        <div id="product-names">
          <h3>{currentProduct.name}</h3>
          <h3 className="blank"></h3>
          <h3>{currentProduct.name}</h3>
        </div>
        <div className="blank"></div>
        <table>
          <tbody>
            {features.filter(Boolean).map((feature, key) => {
              return <TableRow feature={feature} currentProduct={currentProduct.features} relatedProduct={relatedProduct.features} key={key} index={key}/>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonModal;