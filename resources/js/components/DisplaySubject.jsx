import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles } from "@material-ui/core/styles";

var count = 1;

function Clicked() {
    console.log("clicked" + count.toString());
    count++;
}

const useStyles = makeStyles({
    content: {
        fontSize: "10px",
        backgroundColor: "white",
        color: "black",
    },
});

function DisplaySubject(props) {
    const classes = useStyles();

    const eachSub = props.sbj;

    const result = (
        //keyはSubject名にした
        <TreeItem className={classes.content} nodeId={eachSub} label={eachSub} onLabelClick={Clicked} />
    );
    return result;
}

export default DisplaySubject;
