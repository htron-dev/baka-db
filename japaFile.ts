import moment from "moment";
import { configure } from "japa";

moment.suppressDeprecationWarnings = true;

configure({
    files: ["tests/*.test.ts"],
});
