"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const PSPDFKit= dynamic(()=>{
 return import("pspdfkit");
},{ssr: false})
export default function Psdpfkitviewer(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let instance
    (async function () {

      instance = await PSPDFKit.load({
        container,
        document: "/example.pdf",
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  return (
    <>
      <div ref={containerRef} style={{ height: "100vh" }} />
    </>
  );
}
