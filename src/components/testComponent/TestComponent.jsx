import { useState } from 'react'
import { Transition } from 'react-transition-group'
import './TestComponent.scss'

const TestComponent = () => {

    const [anim, setAnim] = useState(false)

    return (
        <div className="test">
            <button onClick={() => setAnim(!anim)} >{anim ? 'show' : 'hide'}</button>
            <div className="wrap">
                <Transition
                    in={anim}
                    timeout={500}
                    unmountOnExit
                >
                    {state => <div className={`obj ${state}`} /> }
                </Transition>
            </div>
        </div>
    )
}

export default TestComponent
