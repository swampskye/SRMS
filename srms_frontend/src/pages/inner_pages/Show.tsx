import '../../App.css'
import MachineRoom from "../../three/MachineRoom";
import { getCabinetByName } from "../../three/Cabinet";
import { useEffect, useRef, useState } from 'react';
import { Space, Button, Card } from 'antd'

let room: any;

function App() {
    const [state, setState] = useState({
        //信息面板的位置
        planePos: {
            left: 0,
            top: 0
        },
        //机柜信息
        curCabinet: {
            //名称
            name: 'Loading……',
            //温度
            temperature: 0,
            //容量
            capacity: 0,
            //服务器数量
            count: 0
        }
    });
    const [visible, setVisible] = useState('none')
    const canvasEle: any = useRef()
    useEffect(() => {
        if (!canvasEle.current) { return }
        canvasEle.current.width = window.innerWidth
        canvasEle.current.height = window.innerHeight
        room = new MachineRoom(canvasEle.current)
        room.loadGLTF('machineRoom.gltf')
        room.animate()
        //当鼠标划入机柜，显示信息面板
        room.onMouseOverCabinet = ({ name }: { name: string }) => {
            setVisible('block')
            getCabinetByName(name).then((res) => {
                let re = JSON.parse(res)
                let temperature: number = re.temperaturn
                let capacity: number = re.capacity
                let count: number = re.count
                setState((prevState) => {
                    return Object.assign({}, prevState, { curCabinet: { name, temperature, capacity, count } })
                })
            });
        }
        //当鼠标在机柜上移动，让信息面板随鼠标移动
        // room.onMouseMoveCabinet = (left: number, top: number) => {
        room.onMouseMoveCabinet = (left: any, top: any) => {

            setState((prevState) => {
                return Object.assign({}, prevState, { planePos: { left, top } })
            })
        }
        //当鼠标划出机柜，隐藏信息面板
        room.onMouseOutCabinet = () => {
            setVisible('none')
        }
    }, [])
    // 鼠标移动事件
    // function mouseMove(e: any) {
    //     let clientX: number = e.clientX
    //     let clientY: number = e.clientY
    //     room.selectCabinet(clientX, clientY);
    // }
    function mouseMove({ clientX, clientY }: { clientX: number, clientY: number }) {
        room.selectCabinet(clientX, clientY)
    }
    return (
        // style={{ height: "300" }}
        <div className="App">
            <canvas id="canvas" ref={canvasEle} onMouseMove={mouseMove}></canvas>
            <div
                id='plane'
                style={{ left: state.planePos.left, top: state.planePos.top, display: visible }}
            >
                <p>机柜名称：{state.curCabinet.name}</p>
                <p>机柜温度：{state.curCabinet.temperature}°</p>
                <p>使用情况：{state.curCabinet.count}/{state.curCabinet.capacity}</p>
            </div>
        </div >
    );
}

export default App;
