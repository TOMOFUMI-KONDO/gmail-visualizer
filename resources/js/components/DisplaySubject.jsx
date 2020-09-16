import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles } from "@material-ui/core/styles";

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
    const eachBody = props.eachBody;
    const eachSub_temp = props.eachSub_temp;
    const setNowBody = props.setNowBody;
    const index = eachSub_temp.findIndex((item) => item === eachSub);

    function Clicked(e) {
        e.preventDefault();
        console.log(eachBody[index]);
        setNowBody(eachBody[index]);
    }

    const result = (
        //keyはSubject名にした
        <TreeItem className={classes.content} nodeId={eachSub} label={eachSub} onLabelClick={Clicked} />
    );
    return result;
}

export default DisplaySubject;
