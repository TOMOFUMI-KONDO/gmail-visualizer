import React from "react";
import MakeTree from "./MakeTree";
import { makeStyles } from "@material-ui/core/styles";

const mail = {
    from: "A",
    To: "C",
    date: "Thu, 25 Dec 2014",
    year: "2014",
    month: "Dec",
    day: "25",
    dayoftheweek: "Thu",
    cc: "B",
    Subject: ["Test1", "Test2", "Test3", "Test4"],
    Body: ["Hello1", "Hello2", "Hello3", "Hello4"],
};

const mailList = [mail, mail, mail, mail];

const useStyles = makeStyles({
    root: {
        backgroundColor: "red",
    },
});

function Top() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MakeTree mails={mailList} />
        </div>
    );
}

export default Top;
