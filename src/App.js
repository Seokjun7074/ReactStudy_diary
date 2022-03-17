import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Bank from "./Reducer";
// import OptimizeTest from "./OptimizeTest";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => {
        return it.id !== action.targetId;
      });
    }
    case "EDIT": {
      return state.map((it) => {
        return it.id === action.targetId
          ? { ...it, content: action.newContent }
          : it;
      });
    }
    default:
      return state; //default인 경우는 state를 그대로 유지한다.
  }
};

export const DiaryStateContext = React.createContext();
//export default는 하나만 가능하다.
//DiaryStateContext도 결국 컴포넌트이므로 너무 많은 값과 연관되어있으면 리렌더링 최적화 문제가 생긴다.
export const DiaryDispatchContext = React.createContext();

function App() {
  // const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => {
      return res.json();
    });
    const initData = res.slice(0, 5).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData });
    // setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    // setData((data) => [newItem, ...data]);
  }, []);
  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
    // setData((data) =>
    //   data.filter((it) => {
    //     return it.id !== targetId;
    //   })
    // );
  }, []);
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData((data) =>
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // );
  }, []);
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []); //useMemo를 사용하는 이유: App컴포넌트가 재생성될 떄 memoizedDispatches도 같이 재생성 됨

  //useMemo를 사용하게되면 getDiaryAnalysis는 내부의 콜백함수가 리턴한 값을 가지게 된다.
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => {
      return it.emotion >= 3;
    }).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio }; //객체 형식으로 리턴
  }, [data.length]); //data.length가 변화할때 안에 있는 함수 실행

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div>
          {/* <Bank /> */}
          {/* <OptimizeTest /> */}
          <DiaryEditor />
          <div>전체일기: {data.length}</div>
          <div>기분좋은일기: {goodCount}</div>
          <div>기분나쁜일기: {badCount}</div>
          <div>기분좋은일기의 비율: {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
