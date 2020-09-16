import React from "react";
//import ReactDOM from "react-dom";
//import { makeStyles } from "@material-ui/core/styles";
// import TreeView from "@material-ui/lab/TreeView";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import TreeItem from "@material-ui/lab/TreeItem";
//import Typography from "@material-ui/core/Typography";
//import SplitPane from "react-split-pane";
//import { Divider } from "@material-ui/core";
//import "./top.css";
import MakeTree from "./MakeTree";

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

function Top() {
    return (
        // <div className="mailTree" style="fontsize:20px">
        <MakeTree mails={mailList} />
        //</div>
    );
}

//const mailList = [mail, mail, mail, mail];

//ReactDOM.render(<MakeTree mails={mailList} />, document.querySelector("#root"));

export default Top;
