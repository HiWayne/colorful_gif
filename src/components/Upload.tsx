import { CSSProperties, FunctionComponent, useCallback, useMemo } from "react";

interface UploadProps {
  tip?: string;
  onChange?: (dataURL: string, files: FileList) => void;
  style?: CSSProperties;
  [key: string]: any;
}

const Upload: FunctionComponent<UploadProps> = ({
  tip,
  onChange,
  style,
  ...props
}) => {
  const handleUpload = useCallback(
    (e) => {
      const files = e.target.files;
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const dataURL = e.target ? e.target.result : "";
          if (dataURL) {
            if (typeof onChange === "function") {
              onChange(dataURL as string, files);
            }
          }
        };
      }
    },
    [onChange]
  );

  const inputStyle = useMemo(() => {
    const commonStyle = { display: "inline-block", width: "20vw" };
    return style ? { ...commonStyle, ...style } : commonStyle;
  }, [style]);

  return (
    <>
      {tip ? <p style={{ marginTop: "10px" }}>{tip}</p> : null}
      <input
        type="file"
        onChange={handleUpload}
        style={inputStyle}
        {...props}
      />
    </>
  );
};

export default Upload;
