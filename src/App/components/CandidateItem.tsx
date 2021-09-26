import React from 'react'
import { Candidate, STEPS } from '../../types/candidate'
import {FaArrowLeft, FaArrowRight, FaTrash} from 'react-icons/fa'

interface Props{
    name: Candidate["name"],
    id: Candidate["id"],
    comments: Candidate["comments"],
    step: Candidate["step"],
    removeCandidate: (candidate:Candidate) => void
    moveCandidate: (candidate:Candidate) => void
}

const CandidateItem : React.FC<Props> = ({name, id, comments, step, removeCandidate, moveCandidate}) => {
    return (
        <div className="flex flex-col space-x-4 bg-white text-center min-h-[5rem] p-2 m-2 items-center rounded-md font-sans">
            <div className="flex w-full text-xs h-4 justify-end text-red-300 cursor-pointer">
                <FaTrash className="cursor-pointer" role="button" aria-label="delete candidate" onClick={()=>removeCandidate({name,id,comments,step} as Candidate)}/>
            </div>
            <div className="flex flex-row flex-1 justify-center w-full">
              {step !== 'Entrevista inicial' ?
                <div className="flex items-center">
                    <FaArrowLeft className="text-lg justify-start cursor-pointer" role="button" aria-label="move left"
                                 onClick={()=>moveCandidate({name, id, comments, step: STEPS[ STEPS.indexOf(step) -1 ] } as Candidate)}/>
                </div> : null}
                <div className="px-3 w-4/6">
                    <p className="text-lg">{name}</p>
                    {comments? <p className="text-sm text-blue-400">
                                            {comments}
                                </p> 
                            :   null}
                </div>
                {step !== 'Rechazo' ?
                <div className="flex items-center">
                    <FaArrowRight  className="text-lg justify-end cursor-pointer" role="button" aria-label="move right"
                    onClick={()=>moveCandidate({name, id, comments, step: STEPS[ STEPS.indexOf(step) +1 ] } as Candidate)}/>     
                </div> : null}
            </div>
        </div>
    )
}

export default CandidateItem
