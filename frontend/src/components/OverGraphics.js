import React from "react";
import { Table } from 'react-bootstrap';

function DecideColor(ball) {
    switch(ball) {
        case ".":
            return "dot";
        case "1":
        case "2":
        case "3":
            return "one";
        case "4":
        case "5":
            return "four";
        case "6":
            return "six";
        case "Wd":
        case "B":
        case "NB":
            return "extras";
        case "W":
            return "wicket";
        default:
            return "one";
    }
}

function RenderButton(props) {
    const color = DecideColor(props.ball);
    return (
        <div className={`${color} ball-button text`}>{props.ball}</div>
    )
}

export function RenderOver(props) {
    const over = props.balls;
    let balls = [];
    if(over.length !== 1){
        balls = over.map((ball, index) => {
            if (index > 0) {
                return <th><RenderButton ball={ball}/></th>
            }
        }
    ); 
    } else {
        const randOver = ["", "", "", "", "", ""]
        balls = randOver.map((ball) => 
        <th><RenderButton ball={ball}/></th>
    ); 
    }
    return (
        <React.Fragment>
            <Table className="tbody over mt-3">
                <tbody className="tbody tr-no-border">
                    <tr>
                        <th>{props.over}: </th>
                        {balls}
                    </tr>
                </tbody>
                <tbody className="tbody tr-no-border">
                    <tr>
                        <th></th>
                        <th>{props.overnumber}.0</th>
                        <th>{props.overnumber}.1</th>
                        <th>{props.overnumber}.2</th>
                        <th>{props.overnumber}.3</th>
                        <th>{props.overnumber}.4</th>
                        <th>{props.overnumber}.5</th>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    )
}


