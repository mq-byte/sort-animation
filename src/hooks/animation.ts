import {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";

export const useAnimationData = (
    initData:number,
    speed:number,
    endCondition:(x:number)=>boolean
):any=>{
    const [x,setX] = useState(initData);
    const [isStop,setIsStop] = useState(true);
    const end: MutableRefObject<(x?:number)=>void> = useRef<(x?:number)=>void>(()=>{});
    const start = useCallback((
        onEnd:(x?:number)=>void
    ):void=>{
        setIsStop(false);
        end.current = onEnd;
    },[]);

    useEffect(()=>{
        if(isStop) return;
        requestAnimationFrame(()=>{
            if(endCondition(x)) {
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

