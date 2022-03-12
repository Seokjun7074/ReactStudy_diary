import { useRef, useState } from "react";

const DiaryItem = ({
  author,
  content,
  created_date,
  emotion,
  id,
  onRemove,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const handleRemove = () => {
    console.log(id);
    if (window.confirm(`${id}를 진짜 삭제하나요...??`)) {
      onRemove(id);
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자:{author} | 감정점수:{emotion}
        </span>
        <br />
        <span className="date">
          {new Date(created_date).toLocaleDateString()}
        </span>
        <div className="content">
          {isEdit ? (
            <>
              <textarea
                ref={localContentInput}
                value={localContent}
                onChange={(e) => {
                  setLocalContent(e.target.value);
                }}
              ></textarea>
            </>
          ) : (
            <>{content}</>
          )}
        </div>
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
