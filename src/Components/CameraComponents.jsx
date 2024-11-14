import Webcam from "react-webcam";

const CameraComponents = ({webcamRef})=>{
    return(
        <Webcam
            audio={false}
            height={1080}
            screenshotFormat="image/jpeg"
            width={1920}
            videoConstraints={{facingMode:"user"}}
            ref={webcamRef}
        />
    )
}
export default CameraComponents