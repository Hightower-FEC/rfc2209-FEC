import React from 'react';

const ComparisonModal = ({show, onClose}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="compare-modal" onClick={onClose}>
      <div className="modal-content">
        <h5 className="modal-header">COMPARING</h5>
        <div id="product-names">
          <h3>Product1</h3>
          <h3 id="blank"></h3>
          <h3>Product2</h3>
        </div>
        <table>
          <tbody>
            <tr className="table-row">
              <td className="product-col1">✔</td>
              <td className="characteristic">...lorem ipsum...</td>
              <td className="product-col2">✔</td>
            </tr>
            <tr className="table-row">
              <td className="product-col1">✔</td>
              <td className="characteristic">...dolor sit amet...</td>
              <td className="product-col2">✔</td>
            </tr>
            <tr className="table-row">
              <td className="product-col1"></td>
              <td className="characteristic">...consectetur...</td>
              <td className="product-col2">✔</td>
            </tr>
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ComparisonModal;