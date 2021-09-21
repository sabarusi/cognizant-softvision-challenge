import React, { useEffect, useState } from 'react'
import Column from './Column';
import {Candidate} from "../../types/candidate"
import api from '../../api';

const STEPS : Candidate['step'][] =[
    "Entrevista inicial",
    "Entrevista técnica",
    "Oferta",
    "Asignación",
    "Rechazo"
]

const groupBy = (xs:Array<any>, key:string) =>{
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

const Table = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([])
    const groupedCandidates = React.useMemo(()=> groupBy(candidates, 'step'),[candidates]) //it's probably better to keep the grouped ones directly on the state, still better option than .filter().map() approach.
    const addCandidate = (candidate:Candidate) => setCandidates([...candidates, candidate])
    useEffect(() => {
        api.candidates.list()
                      .then(res=>setCandidates(res))
    }, [])

    return (
        <div className="grid grid-cols-5 gap-4 text-3xl py-5 px-3">
          {STEPS.map(e=> <Column list={groupedCandidates[e] || []} title={e} add={addCandidate} key={e}/>)}
        </div>
    )
}

export default Table;