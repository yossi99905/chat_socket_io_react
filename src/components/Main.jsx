import { useEffect, useState } from 'react'
import { MessageBox } from "react-chat-elements"
import io from 'socket.io-client'
const url = process.env.REACT_APP_API_URL

const socket = io.connect(url)



function Main() {
 
    const [msgList, setMsgList] = useState([])
    const onsub = (e) => {
        e.preventDefault()
      
        socket.emit('send_massge', { text: e.target[0].value , date: new Date(),dir:'left'})

        setMsgList(prevMsgList => [...prevMsgList, { text: e.target[0].value,dir:'right', date: new Date() }])
        
    }

    useEffect(() => {
        socket.on('recive_massge', (data) => {
           
            setMsgList(prevMsgList => [...prevMsgList, { text: data.text, dir: data.dir, date: data.date }])
        })
        
        return () => {
            socket.off('recive_massge'); // ניתן להסיר את האירוע בעת יציאת הרכיב
        }
    }, []);
    

    return (
        <div className='mt-16'>
        
            {
                msgList.map((msg, index) => {
                    return (
                        <MessageBox
                            key={index}
                            position={msg.dir}
                            type={'text'}
                            text={msg.text}
                            date={msg.date}
            
                        />
                    )
                })
            }
            <form onSubmit={onsub} className='flex fixed bottom-96' >
                <input type="text" className='w-full border border-green-500 rounded-full'/>
                <button type='submit' className='bg-green-500'>send</button>
            </form>
          
        </div>
    )
}

export default Main