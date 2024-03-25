import React, { useEffect } from 'react'
import WebViewer from '@pdftron/webviewer';
import { useRef } from 'react';
const Trying = () => {
  console.log('>>>>>>>>>>>', "trying")
  const viwer = useRef(null)
  useEffect(()=>{
    WebViewer(
      {
        path: '/webviewer/lib',
        licenseKey: 'demo:1711270288942:7f0cb92d0300000000a681e36653d368544fe6601cfaae8b8ff02c53a6',
        initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
      },
      viwer.current,
    ).then((instance) => {
      const { documentViewer } = instance.Core;
      // you can now call WebViewer APIs here...
    });
  },[])
  return (
    <div className="MyComponent">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viwer} style={{height: "100vh"}}></div>
    </div>
  )
}

export default Trying