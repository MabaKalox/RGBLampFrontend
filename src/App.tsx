import React, {useState} from 'react';
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
import ColorHueSlider from './Components/ColorHueSlider';



const App = () => {
    const [autoApply, setAutoApply] = useState(false);
    const [isON, setIsON] = useState(true);
    const [mode, setMode] = useState(1);
    const [overallBrightness, setOverallBrightness] = useState(100);
    const [rgbArray, setRgbArray] = useState([0, 255, 251]);

    const updateMode = (new_mode: number) => {
        setMode(new_mode);
    }

    const brightnessSliderCompleteHandler = () => {
        console.log(overallBrightness)
    }

    const applySettings = () => {

    }

    const colorSliderCompleteHandler = () => {
        console.log(rgbArray)
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
                                            setIsON(checked)
                                        }}
                                    />
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Brand className={"m-0"}>
                            <BootstrapSwitchButton
                                checked={autoApply}
                                onlabel='Instant Apply'
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
                                    onClick={applySettings}>Apply</Button>
                        </Navbar.Brand>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col className={"p-0"}>
                    <Container fluid className="py-2 px-4">
                        <Row className={"justify-content-center"}>
                            <Col xs={12}>
                                <Dropdown.Divider />
                                <BrightnessSlider
                                    overallBrightness={overallBrightness}
                                    setOverallBrightness={setOverallBrightness}
                                    onChangeCompleteHandler={brightnessSliderCompleteHandler}
                                    label={"Brightness:"}
                                    isON={isON}
                                />
                            </Col>
                        </Row>
                        {(mode === 3) && <Row>
                            <Col xs={12}>
                                <Dropdown.Divider />
                                <ColorHueSlider
                                    setRgbArray={setRgbArray}
                                    onChangeCompleteHandler={colorSliderCompleteHandler}
                                    rgbArray={rgbArray}
                                    label={"Color:"}
                                    isON={isON}
                                />
                            </Col>
                        </Row>}
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
