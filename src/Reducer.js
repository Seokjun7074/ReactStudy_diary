// import React, { useState, useReducer } from "react";

// const reducer = (state, action) => {};

// const Bank = () => {
//   const [number, setNumber] = useState(0);
//   const [money, setMoney] = useState(0);
//   //   const [money, dispatch] = useReducer(reducer, 0);
//   return (
//     <div>
//       <h2>은행</h2>
//       <p>잔고: {money}원</p>
//       <input
//         type="number"
//         step={1000}
//         value={number}
//         onChange={(e) => {
//           setNumber(e.target.value);
//         }}
//       />
//       <button
//         onClick={() => {
//           setMoney(parseInt(money) + parseInt(number));
//           setNumber(0);
//         }}
//       >
//         예금
//       </button>
//       <button
//         onClick={() => {
//           setMoney(parseInt(money) - parseInt(number));
//           setNumber(0);
//         }}
//       >
//         출금
//       </button>
//     </div>
//   );
// };

// export default Bank;

import React, { useState, useReducer } from "react";

const reducer = (state, action) => {
  console.log("reduce is working", state, action);

  switch (action.type) {
    case "deposit":
      return parseInt(state) + parseInt(action.payload);
    case "withdraw":
      return parseInt(state) - parseInt(action.payload);
    default:
      return parseInt(state);
  }
};
// reducer : state를 업데이트하는 역할
// dispatch : state 업데이트를 위한 요구, dispatch를 통해 reducer함수 실행
// action : 요구의 내용

const Bank = () => {
  const [number, setNumber] = useState(0);
  const [money, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <h2>은행</h2>
      <p>잔고: {money}원</p>
      <input
        type="number"
        step={1000}
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch({ type: "deposit", payload: number });
          setNumber(0);
        }}
      >
        예금
      </button>
      <button
        onClick={() => {
          dispatch({ type: "withdraw", payload: number });
          setNumber(0);
        }}
      >
        출금
      </button>
    </div>
  );
};

export default Bank;
