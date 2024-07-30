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
      <div className="bg-black h-screen text-white grid grid-row-2 gap-5">
        
        <div id="display" className='flex justify-center items-center'><h1 className=' text-9xl border-emerald-400 border-8 p-8 font-extrabold text-emerald-300'>{format(currentTime)}</h1></div>
        <div id="buttons" className='grid grid-cols-2 gap-5' >
          <div className='col-span-3'></div>
          <div className='grid grid-row-3 grid-col-3'>
          <div className='col-span-3 col-span-1'></div>
            <button className="bg-teal-800 border-8 border-emerald-400 font-extrabold text-7xl hover:bg-teal-600" onClick={handleStartStop}>{isRunning?"STOP [SPACE]":"START [SPACE]"}</button>
            <div className='col-span-3'></div>
            </div>
            <div className='grid grid-row-3 grid-col-3'>
          <div className='col-span-3 col-span-1'></div>
          <button className="bg-red-900 border-8 border-emerald-400 font-extrabold text-7xl hover:bg-red-600" onClick={handleReset}>RESET [R]</button>
            <div className='col-span-3'></div>
            </div>
          
          
         
        </div>
        </div>
        
    </>
  )
}