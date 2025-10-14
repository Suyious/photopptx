import { ChangeEvent, useEffect, useRef, useState } from "react";
import { imagesToPPTX } from "../../utils/image2ppt";
import CleanIcon from "../../assets/icons/clean";
import EnterIcon from "../../assets/icons/enter";
import formatFileSize from "../../utils/formatfilesize";
import getOptimumHeight from "../../utils/getoptimumheight";
import Close from "../../assets/icons/close";

export default function ImageToPPT() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>("untitled");
  const fileNameRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const filesContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files!)]);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    if(filesRef.current) filesRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    if (!files.length) return alert("No images selected!");

    try {
      await imagesToPPTX(files, fileName + ".pptx");
    } catch (error) {
      console.error(error);
      alert("Failed to generate PPT");
    } 

  };

  useEffect(() => {
    if (mirrorRef.current && fileNameRef.current) {
      const width = mirrorRef.current.offsetWidth + 2; // +2px for caret padding
      fileNameRef.current.style.width = width + "px";
    }
  }, [fileName]);

  return (
    <div className="p-4 max-w-[90dvw] w-[650px] rounded-[1em] border-2 shadow-primary border-primary-fill text-secondary-foreground bg-secondary-background">

      <div className="flex justify-between flex-wrap gap-2">
        <div className="w-fit">
          <span ref={mirrorRef} className="invisible absolute whitespace-pre font-inherit"> {fileName} </span>
          <input
           className="max-w-[200px] md:max-w-[420px] outline-none text-black" type="text" ref={fileNameRef} value={fileName}
           onChange={e => setFileName(e.target.value)}
           onFocus={() => fileNameRef.current?.select()}
           onBlur={() => { if(fileName.trim() === "") setFileName("untitled") }}
           />
          <span className="w-full text-black font-primary-display">.pptx</span>
        </div>
        <button onClick={handleGenerate} className="px-6 py-1 flex items-center border-1 border-secondary-foreground bg-primary-fill text-white rounded-xl font-primary-display">
          Create ppt <EnterIcon />
        </button>
      </div>
      <input className="hidden" type="file" ref={filesRef} multiple accept="image/*" onChange={handleChange} />
      <button onClick={() => filesRef.current?.click()} className="mt-2 cursor-pointer px-6 py-1 flex items-center bg-secondary-background border-2 border-secondary-foreground rounded-xl font-primary-display">Add Images</button>

      <div className="relative pt-4">
        <div ref={filesContainerRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-y-scroll"
          style={{ maxHeight: getOptimumHeight(filesContainerRef) + "px"}}
        >
          {files.map((f,i) => <div key={f.lastModified}>
            <div className="relative border-2 border-secondary-foreground rounded-lg overflow-hidden" >
              <img className="object-cover w-full" width={150} src={URL.createObjectURL(f)} alt={f.name} />
              <div className="cursor-pointer absolute top-0 left-0 w-full h-full bg-black/20"></div>
              <div className="absolute w-full flex justify-between bottom-1 left-0 px-2 text-sm text-primary-foreground">
                <span className="inline-block w-14 overflow-hidden overflow-ellipsis">{f.name}</span>
                <span className="">{formatFileSize(f.size)}</span>
              </div> 
              <button onClick={() => removeFile(i)} className="cursor-pointer absolute w-6 h-6 flex justify-center items-center top-1 right-1 bg-primary-foreground rounded-[20px]"><Close/></button>
            </div>
          </div>)}
        </div>
        {files.length > 0 && <div className="absolute bottom-2 right-2">
          <button className="cursor-pointer w-14 h-14 rounded-[50px] flex justify-center items-center border-3 border-secondary-foreground bg-primary-foreground" onClick={clearFiles}><CleanIcon/></button>
        </div>}
      </div>
    </div>
  );
}
