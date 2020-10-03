import React, { useEffect, useState, useCallback, useRef } from 'react';
import NoteLine from './components/noteLine'
import LineList from './components/lineList';

const App = () =>{
  const [notes,setNotes] = useState([]); // 노트를 배열로 저장
  const focus =useRef({
    event:"none",
    target:null
  })
  const searchList = useRef(""); 
  useEffect(()=>{
    if(notes.length===0){ // note의 length가 0이면 새로운 라인생성
      setNotes([...notes,{
        type : "none",
        content:""
      }])
    }
    if(focus.current.event==="keypress Enter"){ // 엔터시에 포커스 이동하기
      focus.current.target.nextSibling.firstChild.focus();
      focus.current={...focus.current,
        target:focus.current.target.nextSibling,
        event:"none"
      }
    }
   
  },[notes])
  
  const createLine = useCallback((e, index) =>{//엔터 누를때 다음줄에 contents생성
    if(e.type === "keypress" && e.key=== "Enter"){
      e.preventDefault();
      const newContent = [...notes.slice(0,index+1),{
        type : "none",
        content:""
      },...notes.slice(index+1)];
      newContent[index].content = e.target.innerText;
      focus.current={
        event: "keypress Enter",
        target:e.target.closest("section")
      }
      setNotes(newContent);
      
    }else if(e.key && ((e.type === "keypress" && e.key ==="/")||searchList.current!=="")){
      // console.log(window.getSelection())
      searchList.current = searchList.current+e.key;
      console.log(searchList.current)
      const newContent =[...notes];
      newContent[index].content += e.key;
      console.log(newContent)
      // setNotes(newContent)
    }else if(e.type ==="blur"){ // blur 되도 컨텐츠 저장하게
      const newContent =[...notes];
      newContent[index].content =e.target.innerText;
      setNotes(newContent)
    }
  },[notes])
  const noteLines = notes.map((content,idx)=>(
    <NoteLine key={idx} noteContent={content} idx={idx}  createLine={createLine} />
  ))



  return (
    <section id="notePad">
      {noteLines}
      {searchList.current!=="" && <LineList/>}
    </section>
  );
}

export default App;
