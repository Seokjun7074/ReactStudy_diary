import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyData = [
  {
    id: 1,
    author: "jun",
    content: "Hi~!",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "lala",
    content: "Hi~!!!!!",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "potter",
    content: "Hello~!",
    emotion: 4,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "july",
    content: "Bon Jour~!",
    emotion: 3,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div>
      <DiaryEditor />
      <DiaryList diatyList={dummyData} />
    </div>
  );
}

export default App;
