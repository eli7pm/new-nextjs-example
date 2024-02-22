"use client";
import React, {useCallback, useEffect, useRef, useState} from "react";
export default function App() {
  const containerRef = useRef(null);
  const pspdfkit = useCallback(()=>{
    console.log("callback render")
    return import("pspdfkit")
  },[]);


  const [file, setFile] = useState("")

  const handleFileUpload = async (e) => {
    const pdf = URL.createObjectURL(e.target.files[0]);
    setFile(pdf);
  }

  useEffect(() => {
    const container = containerRef.current;
    let instance
    (async function () {

      instance = (await pspdfkit());
      await instance.load({
        container,
        document: file? file: "/example.pdf",
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => {
      URL.revokeObjectURL(file)
      return instance && instance.unload(container)
    };
  }, [file])

  return (
    <>
      <input
        type="file"
        name="file"
        onChange={handleFileUpload}
      />
      <div ref={containerRef} style={{ height: "100vh" }} />
      <style global jsx>
        {`
          * {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  );
}
