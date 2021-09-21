import React from 'react'
import { Candidate } from '../../types/candidate'
import {FaArrowLeft, FaArrowRight, FaTrash} from 'react-icons/fa'

const CandidateItem : React.FC<Candidate> = ({name, id, comments, step}) => {
    return (
        <div className="flex flex-col space-x-4 bg-white text-center min-h-[5rem] p-2 m-2 items-center rounded-md font-sans">
            <div className="flex w-full text-xs h-4 justify-end text-red-300 cursor-pointer">
                <FaTrash/>
            </div>
            <div className="flex flex-row flex-1 justify-around w-full">
              {step !== 'Entrevista inicial' ?
                <div className="flex items-center">
                    <FaArrowLeft className="text-lg justify-start cursor-pointer" role="button" aria-label="move left"/>
                </div> : null}
                <div className="px-3">
                    <p className="text-lg">{name}</p>
                    {comments? <p className="text-sm text-blue-400">
                                            {comments}
                                </p> 
                            :   null}
                </div>
                {step !== 'Rechazo' ?
                <div className="flex items-center">
                    <FaArrowRight  className="text-lg justify-end cursor-pointer" role="button" aria-label="move right"/>     
                </div> : null}
            </div>
        </div>
    )
}

export default CandidateItem
