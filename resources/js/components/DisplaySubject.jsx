import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";

var count = 1;

function Clicked() {
    console.log("clicked" + count.toString());
    //const sample = props.labe;
    //console.log("clicked" + sample);
    count++;
}

function DisplaySubject(props) {
    const eachSub = props.sbj;

    const result = (
        //keyはSubject名にした
        //<TreeItem nodeId={eachSub} label={eachSub} onLabelClick={<Clicked labe="A"/>} />
        <TreeItem nodeId={eachSub} label={eachSub} onLabelClick={Clicked} />
    );
    return result;
}

export default DisplaySubject;
