import React, { useEffect, useState } from 'react'
import {Candidate, ACTIONS} from "../types/candidate"
import api from "../api"

const useCandidates = (init:Candidate[]): [ Candidate[], (candidate:Candidate, action:ACTIONS)=> void] => {
    const [candidates, setCandidates] = useState<Candidate[]>(init)

    const addCandidate = (candidate:Candidate , list:Candidate[]) :Candidate[] => [...list, candidate]
    const removeCandidate = (candidate:Candidate):Candidate[] => candidates.filter(c=> c.id !== candidate.id)
    const moveCandidate = (candidate:Candidate) => {
      const filteredList = removeCandidate(candidate) as Candidate[]
      return addCandidate(candidate, filteredList);
    }

    const handleCandidates = (candidate:Candidate, action:ACTIONS) =>{
        switch(action){
            case ACTIONS.ADD: {
              setCandidates ( addCandidate(candidate, candidates) );
              return;
            }
            case ACTIONS.DELETE: {
              setCandidates( removeCandidate(candidate))
              return;
            }
            case ACTIONS.MOVE: {
              setCandidates ( moveCandidate(candidate) )
              return;
            }
        } 
      }

    useEffect(() => {
        api.candidates.list()
                      .then(res=>setCandidates(res))
    }, [])

    return [candidates, handleCandidates] 
}

export default useCandidates
