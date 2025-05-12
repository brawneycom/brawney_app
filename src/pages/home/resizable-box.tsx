import { FC, ReactNode, useState } from "react";
import { Section } from '@bennie-ui/section'
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

type ResizableBoxProps = {
  children: ReactNode;
};
export const ResizableBox: FC<ResizableBoxProps> = ({
  children,
}) => {
  const [dimension, setDimensions] = useState({ width: 300, height: 500 })
  return (
    <Section className="resizable-box" colors={{ background: { color: 'white' } }} padding={{ y: '4', x: '5' }} height={{ value: "fit" }}>
      <ReactResizableBox width={dimension.width} height={dimension.height}>
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      </ReactResizableBox>
    </Section>
  );
};
