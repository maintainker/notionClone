import React, { useEffect, useRef } from 'react';

const NoteLine = ({noteContent,idx,createLine,insertContent}) =>{
    const {type,content}=noteContent;
    const editableDiv = useRef();
    useEffect(()=>{
        editableDiv.current.innerText = content;
        return(()=>{
            if(content!== editableDiv.current.innerText){  
                insertContent(idx,editableDiv.current.innerText);
            }
        })
    })
    return(
    <section onKeyPress={(e)=>createLine(e,idx)}>
        <div contentEditable="true" className={"note " + type} ref={editableDiv}>
        </div>
    </section>);
}

export default NoteLine;