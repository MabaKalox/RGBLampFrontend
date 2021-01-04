import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup';
// @ts-ignore
import Slider from 'react-rangeslider';
import '../style/BrightnessSlider.css'
import hsl2Rgb from "../tools/hsl2Rgb";
import rgb2Hsl from "../tools/rgb2Hsl";

type AppProps = {
    label: string,
    overallBrightness: number,
    setOverallBrightness: (new_value: number) => void,
    onChangeCompleteHandler: () => void,
    isON: boolean
};

const BrightnessSlider = (props: AppProps) => {
    const brightnessSliderHandler = (new_value: number) => {
        if (props.isON) {
            props.setOverallBrightness(new_value);
        }
        // console.log(new_value)
    }

    // @ts-ignore
    const brightnessInput = (e: React.ChangeEvent<FormControl>) => {
        if (props.isON) {
            const new_value = Number(e.target.value);
            if (!isNaN(new_value)) {
                if (new_value >= 0 && new_value <= 100) {
                    props.setOverallBrightness(new_value);
                } else if (new_value > 100) {
                    props.setOverallBrightness(100);
                }else if (new_value < 0) {
                    props.setOverallBrightness(0);
                }
            }
        }
    }

    return (
        <Form>
            <Form.Row className="justify-content-center">
                <Col sm={6} md={5} lg={3}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>{props.label}:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl value={props.overallBrightness} onChange={brightnessInput} id="inlineFormInputGroupBrightness" placeholder="[ 0-100 ]" />
                    </InputGroup>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col className={["range-slider-container", ((!props.isON) ? "disabled" : "")].join(" ")}>
                    <Slider
                        value={props.overallBrightness}
                        min={0}
                        max={100}
                        onChange={brightnessSliderHandler}
                        onChangeComplete={props.onChangeCompleteHandler}
                    />
                </Col>
            </Form.Row>
        </Form>
    )
}

export default BrightnessSlider;