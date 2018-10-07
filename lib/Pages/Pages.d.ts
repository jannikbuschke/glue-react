/// <reference types="react" />
import { IEntityItem } from "./types";
interface IProps {
    items: IEntityItem[];
}
declare const Pages: (props: IProps) => JSX.Element;
export { Pages };
