import {createConnection} from "typeorm";

export const connect = (
    onConnected: () => void,
    onFailed?: (error: Error) => void
) => {
    createConnection().
    then((conn) => {
        onConnected();
    })
    .catch((error) => onFailed?.caller(error));
};
