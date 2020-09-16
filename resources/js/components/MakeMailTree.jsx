import React from "react";
import EachMail from "./EachMail";

function MakeMailTree(props) {
    const mailtp = props.mailtp;
    const tp = mailtp.map((mail) => <EachMail key={mail} mail={mail} />);

    const result = tp;
    return result;
}

export default MakeMailTree;
