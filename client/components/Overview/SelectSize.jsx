import React from 'react';

const SelectSize = () => {
  return (
    <>
      <div className="dropdown">
        <form>
          <select>
            <option>SELECT SIZE</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </form>
        <form>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </form>
        <form>
          <select>
            <option>ADD TO BAG</option>
          </select>
        </form>
        <form>
          <select>
            <option>✩</option>
          </select>
        </form>
      </div>
    </>
  );
};

export default SelectSize;