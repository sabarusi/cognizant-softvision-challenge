import React from 'react'
import {STEPS} from "../../types/candidate"
import Column from './Column';
import useCandidates from '../../hooks/useCandidates';

const groupBy = (xs:Array<any>, key:string) =>{
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

const Table = () => {
    const [candidates, handleCandidates] = useCandidates([]);

    const groupedCandidates = React.useMemo(()=> groupBy(candidates, 'step'),[candidates]) 
    //it's probably best to keep the grouped ones directly on the state, 
    //still better option than .filter().map() approach.
    
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