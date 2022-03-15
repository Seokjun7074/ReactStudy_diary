import React, { useState, useEffect } from "react";

// const TextView = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(`update::Text:${text}`);
//   });
//   return <div>{text}</div>;
// });
// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`update::Count:${count}`);
//   });
//   return <div>{count}</div>;
// });
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count:${count}`);
  });
  return <div>{count}</div>;
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count:${obj.count}`);
  });
  return <div>{obj.count}</div>;
};
const areEqual = (preProps, nextProps) => {
  //return true  =>> 이전 props와 현재 props가 같다 =>> 리랜더링을 일으키지 않는다.
  //return false  =>> 이전 props와 현재 props가 다르다 =>>리랜더링을 일으킨다.
  if (preProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button
          onClick={() => {
            setCount(count);
          }}
        >
          A button
        </button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() => {
            setObj({ count: obj.count });
          }}
        >
          B Button
        </button>
      </div>
      {/* <div>
        <h2>count</h2>
        <CountView count={count} />
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div> */}
    </div>
  );
};

export default OptimizeTest;
