import React, {useCallback, useState} from 'react';
import {useAnimationData} from '../hooks/animation'
import {useSelectSort} from '../hooks/useSelectSort'

function SelectSort() {
    const [arr,setArr] = useState([3,2,6,8,7,9,1,4,5]);
    const toRight = useAnimationData(0,10)
    const toLeft = useAnimationData(0,-10)
    const {
        data,
        setStop,
        next
    } = useSelectSort(arr);
    const { index:activeIndex, lock, } = data;
    const startS = useCallback(()=>{
        next((n:any, d:any)=>{
            if(d.exchange){
                console.log(d)
                const xd = d.index - d.lock;
                const initPositionL = toLeft.start((x: number)=>{
                    setArr([...d.data])
                    initPositionL();
                    initPositionR();
                    n(startS)
                },(x:number)=> {
                    console.log('-----',x);
                    return x === -70*xd
                })
                const initPositionR = toRight.start((x: number)=>{

                },(x:number)=> x === 70*xd)
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
            <h2>选择排序</h2>
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
                        background: i < lock ? 'green': i === lock ? 'red': i === activeIndex ? 'yellow' : "#333",
                        transform: i === activeIndex ? `translateX(${toLeft.data}px)`:i === lock ? `translateX(${toRight.data}px)`:`translateX(0px)`,
                        margin: '0 10px',
                        float: "left"
                    }}>
                        {/*<div>h: {h}</div>*/}
                        <div>{lock}-{activeIndex}-{i}</div>
                    </div>
                })}
            </div>
            <div onClick={()=>{setStop(true)}}>stop</div>
            <div onClick={s}>start</div>
        </div>
    );
}

export default SelectSort;
