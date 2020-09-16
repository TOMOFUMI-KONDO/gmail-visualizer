import React from "react";
import DisplaySubject from "./DisplaySubject";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    person: {
        padding: "5px",
        fontSize: "50px",
        backgroundColor: "red",
    },
    year: {
        padding: "5px",
        fontSize: "25px",
        backgroundColor: "green",
    },

    month: {
        padding: "5px",
        fontSize: "15px",
        backgroundColor: "yellow",
    },
    day: {
        padding: "5px",
        fontSize: "8px",
        backgroundColor: "blue",
    },
});

function EachMail(props) {
    const classes = useStyles();

    const each = props.mail;
    const eachBody = each.Body;
    const eachSub_temp = each.Subject;
    const setNowBody = props.setNowBody;
    const eachSub = each.Subject.map((sub) => (
        <DisplaySubject key={sub} sbj={sub} setNowBody={setNowBody} eachBody={eachBody} eachSub_temp={eachSub_temp} />
    ));
    const mailIndex = (
        <TreeItem className={classes.person} nodeId={each.from + "1"} label={each.from}>
            <TreeItem className={classes.year} nodeId="2" label={each.year}>
                <TreeItem className={classes.month} nodeId="3" label={each.month}>
                    <TreeItem className={classes.day} nodeId="4" label={each.day}>
                        {eachSub}
                    </TreeItem>
                </TreeItem>
            </TreeItem>
        </TreeItem>
    );

    const result = (
        <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
            {mailIndex}
        </TreeView>
    );

    return result;
}

export default EachMail;
