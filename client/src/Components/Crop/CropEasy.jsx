import React, { useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import CloseIcon  from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, DialogActions, DialogContent, Slider, Typography } from "@mui/material"
import Cropper from "react-easy-crop"
import getCroppedImg from "./Utils/CropImage"


function CropEasy({ photoURL ,openCrop,setOpenCrop,setImage}) {

    const theme = useMantineTheme()

    const [setAlert,setLoading] = useState()
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const cropImage = async () => {
       try{
        setLoading(true)
          const {file,url} = await getCroppedImg(photoURL , croppedAreaPixels , rotation)
          setImage({
            image:url,
            file:file
          })
          console.log(file)
          setOpenCrop(false)
       }catch(err){
          setAlert({isAlert:true,severity:"error",message:err.message,timeout:5000,location:"modal"})
          console.log(err)
       }
    }
    return (
        <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size="50%"
            opened={openCrop}
            >
            <DialogContent dividers
                sx={{
                    background: "#333",
                    position: "relative",
                    height:400,
                    width: "auto",
                    minWidth: { sm: 500 }
                }}
                >
                <Cropper
                    image={photoURL}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                    />
            </DialogContent>
            <DialogActions sx={{flexDirection: "column",mx: 3,my: 2}}>
                <Box sx={{width: "100%",mb: 1}}>
                  <Box>
                     <Typography>Zoom : {zoomPercent(zoom)}</Typography>
                     <Slider
                     valueLabelDisplay='auto' 
                     valueLabelFormat={zoomPercent}
                     min={1}
                     max={3}
                     step={2}
                     value={zoom}
                     onChange={(e,zoom) => setZoom(zoom)}
                      />
                  </Box>

                  <Box>
                     <Typography>Roatation : {rotation}</Typography>
                     <Slider
                     valueLabelDisplay='auto' 
                     min={-180}
                     max={180}
                     value={rotation}
                     onChange={(e,rotation) => setRotation(rotation)}
                      />
                  </Box>
                </Box>
                <Box 
                sx={{
                    display:"flex",
                    gap:2,
                    flexWrap:"wrap"
                }} >
                    <Button
                    variant="outlined" 
                    startIcon={<CloseIcon />}
                    onClick={()=>{
                        setOpenCrop(false)
                        setRotation(0)
                    }}
                    >
                        Cancel
                    </Button>

                    <Button
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    onClick={()=>cropImage()}
                    >
                        Save
                    </Button>
                </Box>
            </DialogActions>
            </Modal>
    )
}

export default CropEasy

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`
}