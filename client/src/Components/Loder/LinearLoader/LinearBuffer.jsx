import  React,{useRef,useState,useEffect, Fragment} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

  function LinearBuffer({Loader,setLoader}) {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [Color,setColor] = useState("primary")

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress >= 100) {
          if(Loader === "success"){
            setColor("success")
            setTimeout(() => {
               setLoader(false)
            }, 2000);
          }
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Fragment>
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" color={Color} value={progress} valueBuffer={buffer} />
    </Box> 
    </Fragment>
  );
}

export default LinearBuffer;
