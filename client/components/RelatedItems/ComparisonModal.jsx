import React from 'react';

const ComparisonModal = ({show, toggle}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="compare-modal">
      <div className="modal-content">
        <h4 className="modal-header">COMPARING</h4>
        <table className="compare-table">
          <tr>
            <th>Product1</th>
            <th>Characteristics</th>
            <th>Product2</th>
          </tr>
          <tr>
            <td>Checkmark1</td>
            <td>...lorem ipsum...</td>
            <td>Checkmark2</td>
          </tr>
          <tr>
            <td>Checkmark1</td>
            <td>...dolor sit amet...</td>
            <td>Checkmark2</td>
          </tr>
          <tr>
            <td>Blank</td>
            <td>...consectetur...</td>
            <td>Checkmark2</td>
          </tr>
        </table>
        <button onClick={() => {
          toggle(false);
        }}>Close</button>
      </div>
    </div>
  );
};

export default ComparisonModal;