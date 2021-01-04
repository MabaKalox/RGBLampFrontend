import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup';
// @ts-ignore
import Slider from 'react-rangeslider';
import '../style/BrightnessSlider.css'

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

    return (
        <Form>
            <Form.Row className="justify-content-center">
                <Col sm={6} md={5} lg={3}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Brightness:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="inlineFormInputGroupUsername" placeholder="[ 0-100 ]" />
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