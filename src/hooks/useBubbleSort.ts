import {useCallback, useEffect, useMemo, useRef, useState} from "react";

export const useBubbleSort = (arr: number[])=>{
    const isStop = useRef(true);
    const [isEnd,setIsEnd] = useState(false);
    const [data,setData] = useState({
        index: 0,
        data: [...arr],
        exchange: false
    });
    const start = useCallback((onEnd:(x:any,y:any)=>void)=>{
        console.log('Bubble start',isStop.current)
        // isStop.current = false
        next(onEnd)
    },[])

    const stop = useCallback(()=>{
        console.log('Bubble stop',isStop.current)
        isStop.current = true;
    },[]);

    const next = useMemo(()=>{
        let isStart = false;
        const setIsStart = (v:boolean)=>{isStart = v};
        const n = (call:any)=>{
            setIsStart(false);
            call();
        }
        return (onEnd:(x:any,y:any)=>void)=>{
            console.log(isStop.current,'-----------------');
            if(isStart || isStop.current) return;
            setIsStart(true);
            setTimeout(()=>{
                if(data.data[data.index] > data.data[data.index + 1]){
                    console.log('交换');
                    //开始数据交换
                    let t = data.data[data.index];
                    data.data[data.index] = data.data[data.index + 1];
                    data.data[data.index + 1] = t;
                    data.exchange = true;
                    setData({...data});
                    //交换结束，停止排序，等待回调结束
                }else {
                    console.log('前进');
                    //不交换，向前移动
                    data.exchange = false;
                    data.index++;
                    if(data.index === arr.length - 1){
                        data.index = 0;
                    }
                    setData({...data});
                }

                onEnd(n, {...data});
            },1000)
        }
    },[])


    return {
        data,
        start,
        stop
    };
}

