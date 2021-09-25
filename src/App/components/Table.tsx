import React, { useEffect, useState } from 'react'
import Column from './Column';
import {Candidate, STEPS} from "../../types/candidate"
import api from '../../api';



const groupBy = (xs:Array<any>, key:string) =>{
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

const Table = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([])
    const groupedCandidates = React.useMemo(()=> groupBy(candidates, 'step'),[candidates]) //it's probably better to keep the grouped ones directly on the state, still better option than .filter().map() approach.
    
    
    const addCandidate = (candidate:Candidate , list:Candidate[]) :Candidate[] => [...list, candidate]
    const removeCandidate = (candidate:Candidate):Candidate[] => candidates.filter(c=> c.id !== candidate.id)
    const moveCandidate = (candidate:Candidate) => {
      const filteredList = removeCandidate(candidate) as Candidate[]
      return addCandidate(candidate, filteredList);
    }

    const handleCandidates = (candidate:Candidate, action:string) =>{
        switch(action){
            case "ADD": {
              setCandidates ( addCandidate(candidate, candidates) );
              return;
            }
            case "DELETE": {
              setCandidates( removeCandidate(candidate))
              return;
            }
            case "MOVE": {
              setCandidates ( moveCandidate(candidate) )
              return;
            }
        } 
      }
    useEffect(() => {
        api.candidates.list()
                      .then(res=>setCandidates(res))
    }, [])

    return (
        <div className="grid grid-cols-5 gap-4 text-3xl py-5 px-3">
          {STEPS.map(e=> <Column list={groupedCandidates[e] || []} 
                                 title={e} 
                                 handleCandidates={handleCandidates}
                                 key={e}/>)}
        </div>
    )
}

export default Table;