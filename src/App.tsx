import React, {useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import axios from "axios";
import BrightnessSlider from './Components/BrightnessSlider';
import ColorSelect from './Components/ColorSelect';
import RainbowSpeedSlider from './Components/RainbowSpeedSlider';
import LampDemo from "./Components/LampDemo";
import hsl2Rgb from "./tools/hsl2Rgb";

type LampDemoType = React.ElementRef<typeof LampDemo>;

const App = () => {
    const offMode = 0;
    const [autoApply, setAutoApply] = useState(false);
    const [isON, setIsON] = useState(true);
    const [mode, setMode] = useState(1);
    const [overallBrightness, setOverallBrightness] = useState(100);
    const [rainbowSpeed, setRainbowSpeed] = useState(10);
    const [hslArray, setHslArray] = useState([90, 100, 50]);

    const lampDemoRef = useRef<LampDemoType>(null);

    const upload_settings = (current_mode: number = mode) => {
        const [red, green, blue] = hsl2Rgb(hslArray);
        const zero_one_overall_brightness = overallBrightness / 100;
        axios.get('/upload_settings', {
            params: {
                mode: (isON) ? current_mode : offMode,
                red: red,
                green: green,
                blue: blue,
                overall_brightness: zero_one_overall_brightness,
                rainbow_speed: rainbowSpeed
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        if (lampDemoRef && lampDemoRef.current) {
            lampDemoRef.current.applySettings(
                (isON) ? current_mode : offMode, red, green, blue,
                zero_one_overall_brightness, rainbowSpeed
            )
        }
    }

    const updateMode = (new_mode: number) => {
        setMode(new_mode);
        if (autoApply) {
            upload_settings(new_mode);
        }
    }


    useEffect(() => {
        const [red, green, blue] = hsl2Rgb(hslArray);
        const zero_one_overall_brightness = overallBrightness / 100;
        if (lampDemoRef && lampDemoRef.current) {
            lampDemoRef.current.applySettings(
                (isON) ? mode : offMode, red, green, blue,
                zero_one_overall_brightness, rainbowSpeed
            )
        }
    }, [])

    const brightnessSliderCompleteHandler = () => {
        if (autoApply) {
            upload_settings();
        }
    }

    const rainbowSpeedSliderCompleteHandler = () => {
        if (autoApply) {
            upload_settings();
        }
    }

    const colorSliderCompleteHandler = () => {
        if (autoApply) {
            upload_settings();
        }
    }

    return (
        <Container className={"main-container"}>
            <Row>
                <Col className={"p-0"}>
                    <Navbar bg="dark" variant={"dark"} expand="md">
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <Nav.Item className={"mx-md-1 my-1"}>
                                    <Button className={"nav-btn" + (isON ? "" : " disabled")} variant={"light"}
                                            onClick={() => updateMode(1)}>White</Button>
                                </Nav.Item>
                                <Nav.Item className={"mx-md-1 my-1"}>
                                    <Button className={"nav-btn" + (isON ? "" : " disabled")} variant={"danger"}
                                            onClick={() => updateMode(2)}>Rainbow</Button>
                                </Nav.Item>
                                <Nav.Item className={"mx-md-1 my-1"}>
                                    <Button className={"nav-btn" + (isON ? "" : " disabled")} variant={"warning"}
                                            onClick={() => updateMode(3)}>Color</Button>
                                </Nav.Item>
                                <Nav.Item className={"mx-md-1 my-1 on-off-switch"}>
                                    {/*<Button className={"nav-btn"} variant={"primary"}*/}
                                    {/*        onClick={() => updateMode(0)}>Off</Button>*/}
                                    <BootstrapSwitchButton
                                        checked={isON}
                                        onlabel='ON'
                                        onstyle='primary'
                                        offlabel='OFF'
                                        offstyle='secondary'
                                        onChange={(checked: boolean) => {
                                            setIsON(checked);
                                            upload_settings();
                                        }}
                                    />
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Brand className={"m-0"}>
                            <BootstrapSwitchButton
                                checked={autoApply}
                                onlabel='Auto Apply'
                                onstyle='primary'
                                offlabel='Manual Apply'
                                offstyle='secondary'
                                width={130}
                                onChange={(checked: boolean) => {
                                    setAutoApply(checked)
                                }}
                            />
                        </Navbar.Brand>
                        <Navbar.Brand className={"m-0 ml-sm-2"}>
                            <Button variant={"success"} className={[(autoApply ? "disabled" : "")].join(" ")}
                                    onClick={() => upload_settings()}>Apply</Button>
                        </Navbar.Brand>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col className={"p-0"}>
                    <Container fluid className="py-2 px-4">
                        <Row className={"justify-content-center"}>
                            <Col xs={12}>
                                <Dropdown.Divider/>
                                <BrightnessSlider
                                    overallBrightness={overallBrightness}
                                    setOverallBrightness={setOverallBrightness}
                                    onChangeCompleteHandler={brightnessSliderCompleteHandler}
                                    label={"Brightness"}
                                    isON={isON}
                                />
                            </Col>
                        </Row>
                        {(mode === 2) && <Row>
                            <Col xs={12}>
                                <Dropdown.Divider/>
                                <RainbowSpeedSlider
                                    rainbowSpeed={rainbowSpeed}
                                    onChangeCompleteHandler={rainbowSpeedSliderCompleteHandler}
                                    setRainbowSpeed={setRainbowSpeed}
                                    label={"Rainbow Speed"}
                                    isON={isON}
                                />
                            </Col>
                        </Row>}
                        {(mode === 3) && <Row>
                            <Col xs={12}>
                                <Dropdown.Divider/>
                                <ColorSelect
                                    setHslArray={setHslArray}
                                    onChangeCompleteHandler={colorSliderCompleteHandler}
                                    hslArray={hslArray}
                                    label={"Color"}
                                    isON={isON}
                                />
                            </Col>
                        </Row>}
                        <Row>
                            <Col xs={"12"}>
                                <Dropdown.Divider/>
                                <LampDemo ref={lampDemoRef} />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
