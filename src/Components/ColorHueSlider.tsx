import React, {useState, useRef} from 'react';
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form';
import FormControl, {FormControlProps} from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup';
// @ts-ignore
import Slider from 'react-rangeslider';
import "../style/ColorHueSlider.css";
import rgb2Hsl from '.././tools/rgb2Hsl';
import hsl2Rgb from '.././tools/hsl2Rgb';

type Props = {
    label: string,
    rgbArray: number[],
    setRgbArray: (new_value: number[]) => void,
    onChangeCompleteHandler: () => void,
    isON: boolean
};

const ColorHueSlider = (props: Props) => {

    const [red, setRed] = useState(props.rgbArray[0]);
    const [green, setGreen] = useState(props.rgbArray[1]);
    const [blue, setBlue] = useState(props.rgbArray[2]);

    const hueSliderEl = useRef<HTMLInputElement>(null);
    const saturationSliderEl = useRef<HTMLInputElement>(null);

    const hueSliderHandler = (new_value: number) => {
        if (props.isON && saturationSliderEl && saturationSliderEl.current) {
            // @ts-ignore
            const current_saturation = Number(saturationSliderEl.current.props.value);
            console.log("sdd" + current_saturation);
            props.setRgbArray(hsl2Rgb(new_value, current_saturation, 50));
        }
    }

    const saturationSliderHandler = (new_value: number) => {
        if (props.isON && hueSliderEl && hueSliderEl.current) {
            // @ts-ignore
            const current_hue = Number(hueSliderEl.current.props.value);
            console.log(current_hue);
            props.setRgbArray(hsl2Rgb(current_hue, Number(new_value), 50));
        }
    }

    // @ts-ignore
    const colorInput = (e: React.ChangeEvent<FormControl>, i: number) => {
        const new_value = Number(e.target.value);
        if (!isNaN(new_value) && new_value >= 0 && new_value <= 255) {
            const rgbArrayCopy = props.rgbArray.slice();
            rgbArrayCopy[i] = Number(e.target.value);
            props.setRgbArray(rgbArrayCopy);
        }
    }

    return (
        <Form>
            <Form.Row className="justify-content-center">
                <Col sm={6} md={5} lg={3}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Color:
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            value={props.rgbArray[0]} id="inlineFormInputGroupUsername" placeholder="R"
                            onChange={e => colorInput(e, 0)}
                        />
                        <FormControl
                            value={props.rgbArray[1]} id="inlineFormInputGroupUsername" placeholder="G"
                            onChange={e => colorInput(e, 1)}
                        />
                        <FormControl
                            value={props.rgbArray[2]} id="inlineFormInputGroupUsername" placeholder="B"
                            onChange={e => colorInput(e, 2)}
                        />
                        <InputGroup.Prepend>
                            <InputGroup.Text className="rounded-right"
                                             style={{backgroundColor: "rgb(" + props.rgbArray.join(", ") + ")"}}>
                                &#8711;
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col className={["color-hue-slider-container", ((!props.isON) ? "disabled" : "")].join(" ")}>
                    <Slider
                        ref={hueSliderEl}
                        value={rgb2Hsl(props.rgbArray)[0]}
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
                        value={rgb2Hsl(props.rgbArray)[1]}
                        min={0}
                        max={100}
                        onChange={saturationSliderHandler}
                        onChangeComplete={props.onChangeCompleteHandler}
                    />
                </Col>
            </Form.Row>
        </Form>
    )
}

export default ColorHueSlider