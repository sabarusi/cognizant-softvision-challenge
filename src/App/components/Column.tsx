import React, { useState } from 'react'
import {Candidate} from "../../types/candidate"
import CandidateItem from './CandidateItem'
import {FaPlus} from 'react-icons/fa'

interface Props{
    list:Candidate[],
    title:Candidate['step'],
    add: (candidate:Candidate)=> void
}

const Column : React.FC<Props> = ({list, title, add}) => {
    const [addToggle, setAddToggle] = useState<boolean>(false)
    const handleAddToggle = () => setAddToggle(!addToggle)
    return (
        <div className="flex flex-col bg-gray-200 text-xl rounded-lg">
            <div className="flex flex-row justify-center items-center space-x-5">
                <h1 className="my-2 py-1">{title}</h1>
                {title === 'Entrevista inicial'? <div className="flex bg-blue-400 hover:bg-blue-500 p-1 my-2 rounded-full text-white font-bold">
                                                    <FaPlus className="cursor-pointer text-sm" role="button" aria-label="add candidate" onClick={handleAddToggle} />
                                                 </div> 
                                                : null}
            </div>
            {addToggle ? <AddForm add={add} close={handleAddToggle}/> :null}
            {!list.length 
                         ? <div className="flex text-base text-blue-500 bg-white m-2 h-20 font-light items-center justify-center rounded-md">
                                <p>No hay candidatos...</p>
                            </div>
                         : list.map(e=> <CandidateItem key={e.id} {...e}/>) 
            }
        </div>
    )
}

interface formProps{
    add:(candidate:Candidate)=> void ,
    close:()=>void
}
const AddForm : React.FC<formProps> = ({add,close}) =>{
    const [name, setName] = useState<string>()
    const [comments,setComments] = useState<string>()

    const submit = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const candidate = {name, comments , step:'Entrevista inicial', id:String(+new Date())} as Candidate
        add(candidate)
        close();
    }
    
  return <form className="flex flex-col font-sans items-center justify-center space-y-2 text-sm" onSubmit={submit}>
           <input className="rounded-lg p-1 text-center" placeholder="Nombre" value={name} onChange={(e)=> setName(e.target.value)}></input>
           <input className="rounded-lg p-1 text-center" placeholder="Comentario" value={comments} onChange={(e)=> setComments(e.target.value)}></input>
           <button type="submit" className="text-sm bg-blue-400 hover:bg-blue-500 p-1 px-3 my-2 rounded-full text-white">Agregar candidato</button>
         </form>
}

export default Column
