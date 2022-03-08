import DiaryItem from "./DiariyItem";

const DiaryList = ({ diatyList }) => {
  console.log(diatyList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diatyList.length}개의 일기가 존재합니다.</h4>
      <div>
        {/* map(it,idx)로 배열의 인덱스도 사용 가능 */}
        {diatyList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};
DiaryList.defaultProps = { diatyList: [] };

export default DiaryList;
