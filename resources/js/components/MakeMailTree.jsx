import React from "react";
import EachMail from "./EachMail";

function MakeMailTree(props) {
    const mailtp = props.mailtp;

    const setNowBody = props.setNowBody;
    const tp = mailtp.map((mail) => <EachMail key={mail} mail={mail} setNowBody={setNowBody} />);

    const result = tp;
    return result;
}

export default MakeMailTree;
