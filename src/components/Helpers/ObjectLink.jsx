import React from "react";
var DenizenWebsite = "https://meta.denizenscript.com/Docs/ObjectTypes/"

export const ObjectLink = ({ returns }) => {
    if (returns === "ElementTag(Number)" || returns === "ElementTag(Boolean)" || returns === "ElementTag(Number)") {
        var url = DenizenWebsite + "ElementTag"; 
    } else {
        var url = DenizenWebsite + returns; 
    }
    return(
        <a href={url}>{returns}</a>
    )
}
export default ObjectLink;
