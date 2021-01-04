import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup';
// @ts-ignore
import Slider from 'react-rangeslider';
import "../style/RainbowSpeedSlider.css"

type Props = {
    label: string,
    rainbowSpeed: number,
    setRainbowSpeed: (new_value: number) => void,
    onChangeCompleteHandler: () => void,
    isON: boolean
};

const RainbowSpeedSlider = (props: Props) => {

    const rainbowSpeedSliderHandler = (new_value: number) => {
        if (props.isON) {
            props.setRainbowSpeed(new_value);
        }
    }

    // @ts-ignore
    const rainbowSpeedInput = (e: React.ChangeEvent<FormControl>) => {
        if (props.isON) {
            const new_value = Number(e.target.value);
            if (!isNaN(new_value)) {
                if (new_value >= 0 && new_value <= 100) {
                    props.setRainbowSpeed(new_value)
                } else if (new_value > 100) {
                    props.setRainbowSpeed(100)
                } else if (new_value < 0) {
                    props.setRainbowSpeed(0)
                }
            }
        }
    }

    return (
        <Form>
            <Form.Row className="justify-content-center">
                <Col sm={7} md={5} lg={3}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                {props.label}:
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            value={props.rainbowSpeed} id="inlineFormInputGroupUsername" placeholder="[ 0-100 ]"
                            onChange={rainbowSpeedInput}
                        />
                    </InputGroup>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col className={["rainbow-speed-slider-container", ((!props.isON) ? "disabled" : "")].join(" ")}>
                    <Slider
                        value={props.rainbowSpeed}
                        min={0}
                        max={100}
                        onChange={rainbowSpeedSliderHandler}
                        onChangeComplete={props.onChangeCompleteHandler}
                    />
                </Col>
            </Form.Row>
        </Form>
    )
}
export default RainbowSpeedSlider;