import { useState } from "react";
import { flushSync } from 'react-dom';

function TestComponent () {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    function handleClick () {
        setTimeout(() => {
            flushSync(() => {
                setCount(c => c +1);
            })
            console.log('dfgfdg');
            flushSync(() => {
                setFlag(f => !f);
            })
        }, 1000)
    }

    console.log('render');
     
    return (
        <div>
            <button onClick={handleClick}>
                next
            </button>
                <h1 style={{color : flag ? 'blue' : 'black'}}>{count}</h1>
        </div>
    )
}

export default TestComponent;

