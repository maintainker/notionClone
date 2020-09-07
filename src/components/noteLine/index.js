import React, { useEffect, useRef } from 'react';

const NoteLine = ({noteContent,idx,createLine}) =>{
    const {type,content}=noteContent;
    const editableDiv = useRef();
    useEffect(()=>{
        editableDiv.current.innerText = content;
    })
    return(
    <section onKeyPress={(e)=>createLine(e,idx)}>
        <div contentEditable="true" className={"note " + type} ref={editableDiv}>
        </div>
    </section>);
}

export default NoteLine;