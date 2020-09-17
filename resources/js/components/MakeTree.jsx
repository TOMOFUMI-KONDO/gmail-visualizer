import React, { useState } from "react";
import SplitPane from "react-split-pane";
import Typography from "@material-ui/core/Typography";
import MakeMailTree from "./MakeMailTree";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    content: {
        borderLeft: "1px solid black",
        padding: "10px 0px 100vh 10px",
        backgroundColor: "white",
    },
});

function MakeTree(props) {
    const classes = useStyles();
    const mails = props.mails;
    const [nowBody, setNowBody] = useState("");
    const mailTrees = <MakeMailTree mailtp={mails} setNowBody={setNowBody} />;

    const layout = (
        <SplitPane
            style={{ overflow: "visible" }}
            className="split"
            split="vertical"
            minSize={200}
            defaultSize={500}
            maxSize={1000}
        >
            {mailTrees}
            <Typography className={classes.content} variant="h5" component="h3">
                {nowBody}
            </Typography>
        </SplitPane>
    );
    return layout;
}

export default MakeTree;
