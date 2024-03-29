import './App.css';
import React, {useEffect, useState} from 'react';
import {AvailableSlots} from "./features/CowinAvailableSlots/AvailableSlots";
import {BrowserRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import {FocusStyleManager, Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {Home} from "./features/home/Home";
import {Visualizations} from "./features/visualizations/Visualizations";
import {resetSettings} from "./features/settings/settingsSlice";
import {useDispatch} from "react-redux";
// import Chart from './features/chartjs/Pie'
// import Ward from './features/chartjs/Ward'
// import Rate from './features/chartjs/Rate'
import {Charts} from './features/chartjs/ChartJS'



FocusStyleManager.onlyShowFocusOnTabs();

function App() {
    const dispatch = useDispatch();
    const [themeButton, setThemeButton] = useState({name: "Dark Theme", icon: "moon"});
    const initializeSettings = !localStorage.getItem('SETTINGS')
    const [themeButtonEnabled, setThemeButtonEnabled] = useState(true);

    const switchTheme = () => {
        const div = document.getElementById("app");
        if (div.classList.contains("bp4-dark")) {
            div.classList.remove("bp4-dark");
            setThemeButton({name: "Dark Theme", icon: "moon"});
        }
        else if (!div.classList.contains("bp4-dark")) {
            div.classList.add("bp4-dark");
            setThemeButton({name: "Light Theme", icon: "flash"});
        }
    }

    useEffect(() => {
        if (initializeSettings) {
            console.log("Resetting settings")
            dispatch(resetSettings());
        }
    })

    const toggleThemeButton = (value) => {
        setThemeButtonEnabled(value);
        if (value === false) {
            const div = document.getElementById("app");
            if (div.classList.contains("bp4-dark")) {
                div.classList.remove("bp4-dark");
                setThemeButton({name: "Dark Theme", icon: "moon"});
            }
        }
    }

    return (
    <BrowserRouter>
        <div id="app">
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading className="navigation-header">VisualizeCoWIN</NavbarHeading>
                    <NavbarDivider />
                    <NavLink to="/">
                        <Button className={Classes.MINIMAL} icon="home" text="Home"
                                onClick={_event => toggleThemeButton(true)}/>
                    </NavLink>
                    <Link to="/dashboard">
                        <Button className={Classes.MINIMAL} icon="chart" text="Dashboard"
                                onClick={_event => toggleThemeButton(false)}/>
                    </Link>

                    <NavLink to="/ChartJS">
                        <Button className={Classes.MINIMAL} icon="grouped-bar-chart" text="Charts"
                                onClick={_event => toggleThemeButton(true)}/>
                    </NavLink>
                    {/* <NavLink to="/charts">
                        <Button className={Classes.MINIMAL} icon="chart" text="Charts"
                                onClick={_event => toggleThemeButton(true)}/>
                    </NavLink>
                    <NavLink to="/ward">
                        <Button className={Classes.MINIMAL} icon="chart" text="Ward"
                                onClick={_event => toggleThemeButton(true)}/>
                    </NavLink>
                    <NavLink to="/rate">
                        <Button className={Classes.MINIMAL} icon="chart" text="Rate"
                                onClick={_event => toggleThemeButton(true)}/>
                    </NavLink> */}

                    <Link to="/availability">
                        <Button className={Classes.MINIMAL} icon="confirm" text="CoWIN Slot Checker"
                                onClick={_event => toggleThemeButton(true)} />
                    </Link>
                </NavbarGroup>
                {
                    themeButtonEnabled &&
                    <NavbarGroup align={Alignment.RIGHT}>
                        <Button
                            className={Classes.MINIMAL}
                            icon={themeButton.icon}
                            text={themeButton.name}
                            onClick={switchTheme}
                        />
                    </NavbarGroup>
                }
            </Navbar>
            <div className="app-route">
                <Switch>
                    <Route path="/availability">
                        <AvailableSlots />
                    </Route>
                    <Route path="/dashboard">
                        <Visualizations />
                    </Route>
                    <Route path="/ChartJS">
                        <Charts />
                    </Route>
                    {/* <Route path="/charts">
                        <Chart />
                    </Route>
                    <Route path="/ward">
                        <Ward />
                    </Route>
                    <Route path="/rate">
                        <Rate legendPosition='bottom' />
                    </Route> */}

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </div>
    </BrowserRouter>
    );
}

export default App;
