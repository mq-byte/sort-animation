import React, {useCallback, useEffect, useState} from 'react';
import {useAnimationData} from './hooks/animation'
import {useBubbleSort} from './hooks/useBubbleSort'

function App() {
    const [arr,setArr] = useState([3,2,6,8,7,9,1,4,5]);
    const toRight = useAnimationData(0,1,(x)=> {
        return x === 70
    })
    const toLeft = useAnimationData(0,-1,(x)=> x === -70)
    const {
        data,
        stop,
        start
    } = useBubbleSort(arr);
    const { index:activeIndex,exchange } = data;
    const startS = useCallback(()=>{
        start((d:any)=>{
            if(d.exchange){
                console.log('start',arr);
                toLeft.start((x: number)=>{
                    console.log('------end',d.data);
                    setArr([...d.data])
                    startS()
                })
                toRight.start((x: number)=>{

                })
            }
        })
    },[data.index,data.exchange,...data.data])

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
        <div onClick={stop}>stop</div>
        <div onClick={startS}>start</div>
    </div>
  );
}

export default App;
