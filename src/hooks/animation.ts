import {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";

export const useAnimationData = (
    initData:number,
    speed:number,
):any=>{
    const [x,setX] = useState(initData);
    const [isStop,setIsStop] = useState(true);
    const end: MutableRefObject<(x?:number)=>void> = useRef<(x?:number)=>void>(()=>{});
    const _endCondition: MutableRefObject<(x:number)=>boolean> = useRef<(x:number)=>boolean>((v:number)=>true);
    const start = useCallback((
        onEnd:(x?:number)=>void,
        endCondition:(x:number)=>boolean
    ):void=>{
        setIsStop(false);
        end.current = onEnd;
        _endCondition.current = endCondition;
    },[]);

    useEffect(()=>{
        if(isStop) return;
        requestAnimationFrame(()=>{
            if(_endCondition.current(x)) {
                end.current(x);
                setX(initData)
                return;
            }
            setX(x + speed)
            setIsStop(false)
        })
        setIsStop(true)
    },[isStop])

    return {
        data:x,
        start
    };
}


// export const useLife = (cb)=>{
//     const [i,setI] = useState(0)
//     const [isStop,setIsStop] = useState(false)
//     useEffect(()=>{
//         if(isStop){
//             return;
//         }
//
//     },[i])
//     return {
//
//     }
// }

