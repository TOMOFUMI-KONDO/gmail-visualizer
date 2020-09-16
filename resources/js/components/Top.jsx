import React from "react";
//import ReactDOM from "react-dom";
//import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import SplitPane from "react-split-pane";
//import { Divider } from "@material-ui/core";

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

function EachMail(props) {
    const each = props.mail;
    const eachSub = each.Subject.map((sub) => <DisplaySubject key={sub} sbj={sub} />);
    const mailIndex = (
        <TreeItem nodeId={each.from + "1"} label={each.from}>
            <TreeItem nodeId="2" label={each.year}>
                <TreeItem nodeId="3" label={each.month}>
                    <TreeItem nodeId="4" label={each.day}>
                        {eachSub}
                    </TreeItem>
                </TreeItem>
            </TreeItem>
        </TreeItem>
    );

    const result = (
        //<SplitPane split="vertical" minSize={200} defaultSize={200} maxSize={400}>
        <TreeView
            //className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {mailIndex}
        </TreeView>

        /*<TreeView
          //className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        >
        {mailIndex}
        </TreeView>*/
        //</SplitPane>
    );

    return result;
}

function MakeMailTree(props) {
    const mailtp = props.mailtp;
    const tp = mailtp.map((mail) => <EachMail key={mail} mail={mail} />);

    const result = tp;
    return result;
}

function MakeTree(props) {
    const mails = props.mails;
    //const mailItems = mails.map((mail) => <EachMail mail={mail} />);
    const mailTrees = <MakeMailTree mailtp={mails} />;

    //return <EachMail mail={props.mailList} />;
    const layout = (
        <SplitPane split="vertical" minSize={200} defaultSize={500} maxSize={1000}>
            {mailTrees}
            <Typography variant="h5" component="h3">
                This is a sheet of paper.
            </Typography>
        </SplitPane>
    );
    return layout;
}

function Top() {
    return (
        <div className="mailTree">
            <MakeTree mails={mailList} />
        </div>
    );
}

//const mailList = [mail, mail, mail, mail];

//ReactDOM.render(<MakeTree mails={mailList} />, document.querySelector("#root"));

export default Top;
