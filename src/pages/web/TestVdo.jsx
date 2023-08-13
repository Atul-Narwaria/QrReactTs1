import React from "react";
import ReactPlayer from "react-player";

export default function TestVdo() {
  return (
    <>
      <div className=" min-h-screen w-full bg-blue-300 flex justify-center p-3 pt-[20vh] align-middle">
        <ReactPlayer
          controls={true}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
          url="https://studiorinternational.in/Mon_Passeport_Books_QR_Code_Video/MP1_QR_Video/mp1_v_ch1.mp4"
        />
      </div>
    </>
  );
}
