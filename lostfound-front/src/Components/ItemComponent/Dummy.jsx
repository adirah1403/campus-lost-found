import React, { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';

const Dummy=()=>{
    let navigate = useNavigate();
    const param= useParams();
    useEffect(()=>{

        if(param.pid==='1')
          navigate('/lost-entry');
        else if(param.pid==='2')
          navigate('/found-entry');

    },[]);
};

export default Dummy;