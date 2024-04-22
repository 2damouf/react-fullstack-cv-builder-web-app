import React from 'react'
import Typewriter from 'typewriter-effect';

function Typewriterr() {
  return (
        <div className = "container">
            <h1>
                <Typewriter 
                options={{
                    autoStart: true,
                    loop: true,
                    delay: 90,
                    strings: ["Hızlı Cv Oluşturucu!"]
                }}
                />

            </h1>
        </div>
  )
}

export default Typewriterr;