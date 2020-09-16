import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import SplitPane from "react-split-pane";
import gmailApi from "react-gmail";
import axios from "axios";

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
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [mails, setMails] = useState([]);

    useEffect(() => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: "423210707146-0241ghoh3jao8v3t69ovp4c8dvnhgpmb.apps.googleusercontent.com",
                    scope: "https://www.googleapis.com/auth/gmail.readonly",
                })
                .then(() => {
                    const auth = window.gapi.auth2.getAuthInstance();
                    setIsSignedIn(auth.isSignedIn.get());
                });
        });
    }, []);

    const renderAuth = () => {
        if (isSignedIn) {
            return <div>login with google!!</div>;
        } else {
            return <div>I can not see your google account!!</div>;
        }
    };

    const loginWithGoogle = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    };

    const logoutFromGoogle = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    };

    const getMails = () => {
        gmailApi.getMessages(false, 10, "me").then((response) => {
            const mails = gmailApi.normalizeData(response).map((mail) => {
                const date = new Date(mail.date);

                const mailObject = {
                    emailId: mail.id,
                    from: mail.from,
                    to: "",
                    date: mail.date,
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate(),
                    dayoftheweek: date.getDay(),
                    cc: "",
                    Subject: [mail.subject],
                    Body: [mail.body.text],
                };

                saveMails(mailObject);

                return mailObject;
            });
            setMails(mails);
        });
    };

    const saveMails = (payload) => {
        axios
            .post("/api/add", {
                emailId: payload.emailId,
                from: payload.from,
                to: payload.to,
                date: payload.date,
                year: payload.year,
                month: payload.month,
                day: payload.day,
                dayoftheweek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][payload.dayoftheweek],
                body: payload.Body,
            })
            .then(() => {
                console.log("success!");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div>
            <button onClick={getMails}>get mails</button>
            {renderAuth()}
            <button onClick={loginWithGoogle}>login with google</button>
            <button onClick={logoutFromGoogle}>logout from google</button>
            <MakeTree mails={mails} />
        </div>
    );
}

export default Top;
