import React from "react";
import DisplaySubject from "./DisplaySubject";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

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

export default EachMail;
