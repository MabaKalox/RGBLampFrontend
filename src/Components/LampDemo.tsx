import React, {useState, forwardRef, useRef, useEffect, useImperativeHandle} from 'react';
// @ts-ignore
import styled, {keyframes} from 'styled-components'
import '../style/LampDemo.css'

type LampDemoProps = {}

type LampDemoHandle = {
    applySettings: (
        new_mode: number, new_red: number, new_green: number,
        new_blue: number, overall_brightness: number,
        rainbow_speed: number
    ) => void
}

type CeilingPropsType = {
    color: string,
    rainbowAnimationFrames: string,
    bow_shadow?: string,
    rainbowAnimationSec: number
}


const CeilingTop = styled.div`
  position: absolute;
  top: -6px;
  left: 15px;
  background-color: #fcfce2;
  content: "";
  width: 90px;
  height: 10px;
  border-radius: 100%;
  border: 1px solid black;
`

const CeilingLeft = styled.div`
  width: 0;
  height: 0;
  border-bottom: 100px solid ${(props: { color: string; }) => props.color};
  border-left: 15px solid transparent;
  animation-name: ${(props: CeilingPropsType) => props.rainbowAnimationFrames};
  animation-duration: ${(props: CeilingPropsType) => props.rainbowAnimationSec}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`

const CeilingMiddle = styled.div`
  box-shadow: ${(props: CeilingPropsType) => props.bow_shadow};
  height: 100px;
  width: 90px;
  background-color: ${(props: CeilingPropsType) => props.color};
  animation-name: ${(props: CeilingPropsType) => props.rainbowAnimationFrames};
  animation-duration: ${(props: CeilingPropsType) => props.rainbowAnimationSec}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`

const CeilingRight = styled.div`
  width: 0;
  height: 0;
  border-bottom: 100px solid ${(props: { color: string; }) => props.color};
  border-right: 15px solid transparent;
  animation-name: ${(props: CeilingPropsType) => props.rainbowAnimationFrames};
  animation-duration: ${(props: CeilingPropsType) => props.rainbowAnimationSec}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`

const CeilingBottom = styled.div`
  position: absolute;
  bottom: -5px;
  /*content: "";*/
  background-color: ${(props: { color: string; }) => props.color};
  width: 120px;
  height: 12px;
  border-radius: 100%;
  border: 1px solid black;
  border-top: 0;
  animation-name: ${(props: CeilingPropsType) => props.rainbowAnimationFrames};
  animation-duration: ${(props: CeilingPropsType) => props.rainbowAnimationSec}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`

const LampDemo: React.RefForwardingComponent<LampDemoHandle, LampDemoProps> = (props, ref) => {
    const fullBrightness = 32;
    const [mode, setMode] = useState(3);
    const [RGBColor, setRGBColor] = useState("")
    const [shadowSpread, setShadowSpread] = useState(fullBrightness);
    const [rainbowSpeed, setRainbowSpeed] = useState(100);

    const formatRGBColor = (new_mode: number, red: number, green: number, blue: number) => {
        if (new_mode === 0) {
            return `rgb(224, 224, 224)`
        } else if (new_mode === 1) {
            return `rgb(255, 255, 255)`
        } else if (new_mode === 3) {
            return `rgb(${red},${green},${blue})`;
        } else {
            return ""
        }
    }

    const CeilingMiddleRef = useRef<typeof CeilingMiddle>(null);
    const CeilingLeftRef = useRef<typeof CeilingLeft>(null);
    const CeilingRightRef = useRef<typeof CeilingRight>(null);
    const CeilingBottomRef = useRef<typeof CeilingBottom>(null);

    useImperativeHandle(ref, () => ({
        applySettings(
            new_mode: number, new_red: number, new_green: number,
            new_blue: number, overall_brightness: number,
            rainbow_speed: number
        ) {
            setMode(new_mode);
            setRGBColor(formatRGBColor(new_mode, new_red, new_green, new_blue));
            setShadowSpread(Math.round(fullBrightness * overall_brightness));
            setRainbowSpeed(rainbow_speed);
        }
    }))

    useEffect(() => {
        if (mode === 2) {
            if (CeilingLeftRef && CeilingLeftRef.current) {
                CeilingLeftRef.current.style.animation = 'none';
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                CeilingLeftRef.current.offsetHeight;
                CeilingLeftRef.current.style.animation = null
            }
            if (CeilingMiddleRef && CeilingMiddleRef.current) {
                CeilingMiddleRef.current.style.animation = 'none';
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                CeilingMiddleRef.current.offsetHeight;
                CeilingMiddleRef.current.style.animation = null
            }
            if (CeilingRightRef && CeilingRightRef.current) {
                CeilingRightRef.current.style.animation = 'none';
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                CeilingRightRef.current.offsetHeight;
                CeilingRightRef.current.style.animation = null
            }
            if (CeilingBottomRef && CeilingBottomRef.current) {
                CeilingBottomRef.current.style.animation = 'none';
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                CeilingBottomRef.current.offsetHeight;
                CeilingBottomRef.current.style.animation = null
            }
        }
    }, [shadowSpread, mode])

    const get_glow_effect = (rgbColor: string) => `0 0 120px ${shadowSpread}px ${rgbColor}`;

    const getKeyFrames = (property_name: string, isGlow?: boolean) => {
        if (mode === 2) {
            return keyframes`
              100%, 0% {
                ${property_name}: rgb(255, 0, 0);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(255, 0, 0)") : ""};
              }
              8% {
                ${property_name}: rgb(255, 127, 0);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(255, 127, 0)") : ""};
              }
              16% {
                ${property_name}: rgb(255, 255, 0);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(255, 255, 0)") : ""};
              }
              25% {
                ${property_name}: rgb(127, 255, 0);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(127, 255, 0)") : ""};
              }
              33% {
                ${property_name}: rgb(0, 255, 0);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(0, 255, 0)") : ""};
              }
              41% {
                ${property_name}: rgb(0, 255, 127);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(0, 255, 127)") : ""};
              }
              50% {
                ${property_name}: rgb(0, 255, 255);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(0, 255, 255)") : ""};
              }
              58% {
                ${property_name}: rgb(0, 127, 255);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(0, 127, 255)") : ""};
              }
              66% {
                ${property_name}: rgb(0, 0, 255);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(0, 0, 255)") : ""};
              }
              75% {
                ${property_name}: rgb(127, 0, 255);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(127, 0, 255)") : ""};
              }
              83% {
                ${property_name}: rgb(255, 0, 255);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(255, 0, 255)") : ""};
              }
              91% {
                ${property_name}: rgb(255, 0, 127);
                box-shadow: ${(isGlow) ? get_glow_effect("rgb(255, 0, 127)") : ""};
              }
            `
        } else {
            return "none"
        }
    }

    return (
        <div className={"lamp-demo-container"}>
            <div className={"ceiling"}>
                <CeilingTop/>
                <CeilingLeft rainbowAnimationSec={Math.round(300 / rainbowSpeed)}
                             rainbowAnimationFrames={getKeyFrames('border-bottom-color')}
                             color={RGBColor} ref={CeilingLeftRef}/>
                <CeilingMiddle rainbowAnimationSec={Math.round(300 / rainbowSpeed)}
                               rainbowAnimationFrames={getKeyFrames('background-color', true)} color={RGBColor}
                               bow_shadow={get_glow_effect(RGBColor)} ref={CeilingMiddleRef}/>
                <CeilingRight rainbowAnimationSec={Math.round(300 / rainbowSpeed)}
                              rainbowAnimationFrames={getKeyFrames('border-bottom-color')}
                              color={RGBColor} ref={CeilingRightRef}/>
                <CeilingBottom rainbowAnimationSec={Math.round(300 / rainbowSpeed)}
                               rainbowAnimationFrames={getKeyFrames('background-color')}
                               color={RGBColor} ref={CeilingBottomRef}/>
            </div>
            <div className={"stem"}/>
            <div className={"stand"}/>
            {/*<div className={"lamp-table"} />*/}
        </div>
    )
}
export default forwardRef(LampDemo);