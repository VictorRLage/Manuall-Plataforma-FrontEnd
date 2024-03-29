import { Fragment, createElement } from "react";

export default function Dynamic({ tag, children, ...props }) {
    return createElement(tag, tag === Fragment ? {} : props, children);
}
