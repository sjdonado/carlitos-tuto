import React from 'react';

function Test(props) {
  const [name, setName] = React.useState('Sin nombre');
  const { testFunc, children } = props;
  const arr = [1, 2, 3];

  console.log("PROPS =>", props)
  
  return (
    <div className="test">
      <h1>{name}</h1>
      {/* {children} */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span onClick={() => setName('Carlos')}>
        Button
      </span>
    </div>
  )
}

export default Test;