import {useState,useRef, useEffect} from 'react'

export default function App() {
  const [isRunning, setisRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const starting_time = useRef();
  const interval = useRef();

//to calculate the time using performance and setinterval module
  useEffect(() => {
    if (isRunning) {
      starting_time.current = performance.now() - currentTime;
      interval.current = setInterval(() => {
        setCurrentTime(performance.now() - starting_time.current);
      }, 1);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [isRunning,currentTime]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        handleStartStop();
      } else if (event.code === 'KeyR') {
        handleReset();
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  });


//this triggers when START/STOP button is pressed
function handleStartStop(){
  setisRunning(!isRunning);
  console.log("START/STOP button pressed.")
}
//this triggers when RESET button is pressed
function handleReset(){
  console.log("RESET button pressed.")
  setCurrentTime(0);
  setisRunning(false);
  clearInterval(interval.current);

}    


function format(millisec) {
  const milliseconds = Math.floor(millisec % 1000);
  const seconds = Math.floor(millisec / 1000) % 60; 
  const minutes = Math.floor(millisec / 60000) % 60; 
  const hours = Math.floor(millisec / 3600000); 

  return (String(hours).padStart(2, '0') + ':' +
  String(minutes).padStart(2, '0') + ':' +
  String(seconds).padStart(2, '0') + ':' +
  String(milliseconds).padStart(3, '0'))
}


  return (
    <>
      <div className="bg-zinc-800 h-screen text-white">
        <div className='bg-slate-600 border-8'><h1 className='text-center'>STOP WATCH</h1></div>
        <div id="display"><h1 className='text-9xl text-center'>{format(currentTime)}</h1></div>
        <div id="buttons" className='flex flex-row gap-96'>
          <div></div>
          <button onClick={handleStartStop} className='bg-slate-500'>{isRunning?"STOP":"START"}</button>
          <button onClick={handleReset} className='bg-red-600'>RESET</button>
          <div></div>
        </div>
        </div>
    </>
  )
}