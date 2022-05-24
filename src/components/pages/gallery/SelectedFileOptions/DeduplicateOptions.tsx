import { IconButton } from 'components/Container';
import { SelectionBar, SelectionContainer } from '.';
import constants from 'utils/strings/constants';
import DeleteIcon from 'components/icons/DeleteIcon';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { DeduplicateContext } from 'pages/deduplicate';
import LeftArrow from 'components/icons/LeftArrow';
import { IconWithMessage } from 'components/IconWithMessage';
import { AppContext } from 'pages/_app';

const VerticalLine = styled.div`
    position: absolute;
    width: 1px;
    top: 0;
    bottom: 0;
    background: #303030;
`;

interface IProps {
    deleteFileHelper: () => void;
    close: () => void;
    count: number;
}

export default function DeduplicateOptions({
    deleteFileHelper,
    close,
    count,
}: IProps) {
    const deduplicateContext = useContext(DeduplicateContext);
    const { setDialogMessage } = useContext(AppContext);

    const trashHandler = () =>
        setDialogMessage({
            title: constants.CONFIRM_DELETE,
            content: constants.TRASH_MESSAGE,
            staticBackdrop: true,
            proceed: {
                action: deleteFileHelper,
                text: constants.MOVE_TO_TRASH,
                variant: 'danger',
            },
            close: { text: constants.CANCEL },
        });

    return (
        <SelectionBar>
            <SelectionContainer>
                <IconButton onClick={close}>
                    <LeftArrow />
                </IconButton>
                <div>
                    {count} {constants.SELECTED}
                </div>
            </SelectionContainer>

            <input
                type="checkbox"
                style={{
                    width: '1em',
                    height: '1em',
                }}
                value={
                    deduplicateContext.clubSameTimeFilesOnly ? 'true' : 'false'
                }
                onChange={() => {
                    deduplicateContext.setClubSameTimeFilesOnly(
                        !deduplicateContext.clubSameTimeFilesOnly
                    );
                }}></input>
            <div
                style={{
                    marginLeft: '0.5em',
                    fontSize: '16px',
                    marginRight: '0.8em',
                }}>
                {constants.CLUB_BY_CAPTURE_TIME}
            </div>
            <div>
                <VerticalLine />
            </div>
            <IconWithMessage message={constants.DELETE}>
                <IconButton onClick={trashHandler}>
                    <DeleteIcon />
                </IconButton>
            </IconWithMessage>
        </SelectionBar>
    );
}
