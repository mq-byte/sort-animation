import React, {useCallback, useState} from 'react';
import {useAnimationData} from '../hooks/animation'
import {useBubbleSort} from '../hooks/useBubbleSort'

function BubbleSort() {
    const [arr,setArr] = useState([3,2,6,8,7,9,1,4,5]);
    const toRight = useAnimationData(0,10,(x)=> {
        return x === 70
    })
    const toLeft = useAnimationData(0,-10,(x)=> x === -70)
    const {
        data,
        setStop,
        next
    } = useBubbleSort(arr);
    const { index:activeIndex,exchange } = data;
    const startS = useCallback(()=>{
        next((n:any, d:any)=>{
            if(d.exchange){
                toLeft.start((x: number)=>{
                    setArr([...d.data])
                    n(startS)
                })
                toRight.start((x: number)=>{

                })
            }else {
                n(startS)
            }
        })
    },[data.index,data.exchange,...data.data])
    const s = useCallback(()=>{
        setStop(false);
        startS();
    },[])
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end'
                }}
            >
                {arr.map((h,i)=>{
                    return <div style={{
                        width: '50px',
                        height: h * 20,
                        background: i === activeIndex || i === activeIndex + 1 ? 'red':'yellow',
                        transform: i === activeIndex ? `translateX(${toRight.data}px)`:i === activeIndex + 1 ? `translateX(${toLeft.data}px)`:`translateX(0px)`,
                        margin: '0 10px',
                        float: "left"
                    }}>{h}-{i}-{activeIndex}</div>
                })}
            </div>
            <div onClick={()=>{setStop(true)}}>stop</div>
            <div onClick={s}>start</div>
        </div>
    );
}

export default BubbleSort;
