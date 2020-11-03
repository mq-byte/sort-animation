import {useCallback, useEffect, useRef, useState} from "react";

export const useBubbleSort = (arr: number[])=>{
    const [isStop,setIsStop] = useState(true);
    const [data,setData] = useState({
        index: 0,
        data: [...arr],
        exchange: false
    });
    const end = useRef<(x:any)=>void>(()=> {})
    const start = useCallback((onEnd)=>{
        setIsStop(false);
        end.current = onEnd;
    },[])
    const stop = useCallback(()=>{
        setIsStop(true)
    },[]);
    useEffect(()=>{
        if(isStop) return;
        setTimeout(()=>{
            if(data.data[data.index] > data.data[data.index + 1]){
                let t = data.data[data.index];
                data.data[data.index] = data.data[data.index + 1]
                data.data[data.index + 1] = t;
                data.exchange = true;
                setData({...data});
                end.current(data);
            }else {
                data.exchange = false;
                data.index++;
                if(data.index === arr.length - 1){
                    data.index = 0;
                }
                setData({...data});
                setIsStop(false);
            }
        },1000)
        setIsStop(true);
    },[isStop])
    return {
        data,
        start,
        stop
    };
}

