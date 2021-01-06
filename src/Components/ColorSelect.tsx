import React, {useRef, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup';
// @ts-ignore
import Slider from 'react-rangeslider';
import "../style/ColorSelect.css";
import rgb2Hsl from '.././tools/rgb2Hsl';
import hsl2Rgb from '.././tools/hsl2Rgb';

type Props = {
    label: string,
    hslArray: number[],
    setHslArray: (new_value: number[]) => void,
    onChangeCompleteHandler: () => void,
    isON: boolean
};

const ColorSelect = (props: Props) => {

    const saturationSliderEl = useRef<typeof Slider>(null);
    const lightnessSliderEl = useRef<typeof Slider>(null);

    const hslToRgbCSS = (hsl: number[]) => {
        return "rgb(" + hsl2Rgb(hsl).join(", ") + ")"
    }

    const updateSlidersColors = (hue: number) => {
        const lightness_slider_filler = lightnessSliderEl.current.slider.children[0];
        lightness_slider_filler.style.background = `linear-gradient(to right, #000 0%, ${hslToRgbCSS([hue, 100, 50])} 50%, #fff 100%)`
        const saturation_slider_filler = saturationSliderEl.current.slider.children[0];
        saturation_slider_filler.style.background = `linear-gradient(to right, #808080 0%, ${hslToRgbCSS([hue, 100, 50])} 100%)`
    }
    
    useEffect(() => {
        updateSlidersColors(props.hslArray[0])
        console.log("effect");
    }, [])

    const hueSliderHandler = (new_value: number) => {
        if (props.isON) {
            if (saturationSliderEl && saturationSliderEl.current) {
                updateSlidersColors(new_value);
            }
            const hslArrayCopy = props.hslArray.slice();
            hslArrayCopy[0] = new_value;
            props.setHslArray(hslArrayCopy);
        }
    }


    const saturationSliderHandler = (new_value: number) => {
        if (props.isON) {
            const hslArrayCopy = props.hslArray.slice();
            hslArrayCopy[1] = new_value;
            props.setHslArray(hslArrayCopy);
        }
    }

    const lightnessSliderHandler = (new_value: number) => {
        if (props.isON) {
            if (lightnessSliderEl && lightnessSliderEl.current) {
                const slider_filler = lightnessSliderEl.current.slider.children[0];
                slider_filler.style.background = `linear-gradient(to right, #000 0%, ${hslToRgbCSS([props.hslArray[0], 100, 50])} 50%, #fff 100%)`
            }
            const hslArrayCopy = props.hslArray.slice();
            hslArrayCopy[2] = new_value;
            props.setHslArray(hslArrayCopy);
        }
    }

    // @ts-ignore
    const colorInput = (e: React.ChangeEvent<FormControl>, i: number) => {
        if (props.isON) {
            const new_value = Number(e.target.value);
            if (!isNaN(new_value)) {
                const rgbArray = hsl2Rgb(props.hslArray);
                if (new_value >= 0 && new_value <= 255) {
                    rgbArray[i] = Number(e.target.value);
                } else if (new_value > 255) {
                    rgbArray[i] = 255;
                }else if (new_value < 0) {
                    rgbArray[i] = 0;
                }
                props.setHslArray(rgb2Hsl(rgbArray));
            }
        }
    }

    return (
        <Form>
            <Form.Row className="justify-content-center">
                <Col sm={7} md={5} lg={4}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                {props.label}:
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            value={hsl2Rgb(props.hslArray)[0]} id="inlineFormInputGroupUsername" placeholder="R"
                            onChange={e => colorInput(e, 0)}
                        />
                        <FormControl
                            value={hsl2Rgb(props.hslArray)[1]} id="inlineFormInputGroupUsername" placeholder="G"
                            onChange={e => colorInput(e, 1)}
                        />
                        <FormControl
                            value={hsl2Rgb(props.hslArray)[2]} id="inlineFormInputGroupUsername" placeholder="B"
                            onChange={e => colorInput(e, 2)}
                        />
                        <InputGroup.Prepend>
                            <InputGroup.Text className={["rounded-right", "color-demo", ((!props.isON) ? "disabled" : "")].join(" ")}
                                             style={{backgroundColor: "rgb(" + hsl2Rgb(props.hslArray).join(", ") + ")"}}>
                                &#8711;
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col className={["color-hue-slider-container", ((!props.isON) ? "disabled" : "")].join(" ")}>
                    <Slider
                        value={props.hslArray[0]}
                        min={0}
                        max={359}
                        onChange={hueSliderHandler}
                        onChangeComplete={props.onChangeCompleteHandler}
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col className={["color-saturation-slider-container", ((!props.isON) ? "disabled" : "")].join(" ")}>
                    <Slider
                        ref={saturationSliderEl}
                        value={props.hslArray[1]}
                        min={0}
                        max={100}
                        onChange={saturationSliderHandler}
                        onChangeComplete={props.onChangeCompleteHandler}
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col className={["color-lightness-slider-container", ((!props.isON) ? "disabled" : "")].join(" ")}>
                    <Slider
                        ref={lightnessSliderEl}
                        value={props.hslArray[2]}
                        min={0}
                        max={100}
                        onChange={lightnessSliderHandler}
                        onChangeComplete={props.onChangeCompleteHandler}
                    />
                </Col>
            </Form.Row>
        </Form>
    )
}

export default ColorSelect