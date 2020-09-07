import React, { useEffect, useState, useCallback } from 'react';
import NoteLine from './components/noteLine'

const App = () =>{
  const [notes,setNotes] = useState([]); // 노트를 배열로 저장
  

  useEffect(()=>{
    if(notes.length===0){ // note의 length가 0이면 새로운 라인생성
      setNotes([...notes,{
        type : "none",
        content:""
      }])
    }
    return(()=>{
    })
  },[notes])

  
  const createLine = useCallback((e, index) =>{//엔터 누를때 다음줄에 contents생성
    if(e.key=== "Enter"){
      e.preventDefault();

      const newContent = [...notes.slice(0,index+1),{
          type : "none",
          content:""
        },...notes.slice(index+1)];
        console.log(newContent)
        setNotes(newContent);
    }else{   // contents 변경contents를 어떻게 저장해야되지.. 
      let changingNote = [...notes];
      changingNote[index].content = e.target.innerText+e.key;
      setNotes(changingNote);
    }
  },[notes])
  const noteLines = notes.map((content,idx)=>(
    <NoteLine key={idx} noteContent={content} idx={idx} createLine={createLine} />
  ))



  return (
    <section id="notePad">

      {noteLines}
    </section>
  );
}

export default App;
