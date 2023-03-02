import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import {useEffect, useState} from "react";
import '../../../Styles/Forms/Input/TextArea.scss';
import {FormatBold, FormatItalic} from "@mui/icons-material";
import Button from "@mui/material/Button";

export default function TextArea(props) {
    const [italic, setItalic] = useState(false);
    const [bold, setBold] = useState(false);
    const [fontWeight, setFontWeight] = useState('normal');
    const [textareaValue, setTextareaValue] = useState(props.value);

    useEffect(() => {
        if (props.reset) {
            setTextareaValue(props.value);
            props.turnOffReset();
        }
    }, [props.reset, props.value]);

    return (
        <FormControl className="FormControl">
            <FormLabel
                className='FormLabel'>{props.textareaLabel} </FormLabel>
            <Textarea
                className='TextArea'
                placeholder={props.textareaPlaceholder}
                minRows={3}
                value={textareaValue}
                color="#094561"
                onChange={(e) => {
                    props.getText(e);
                    setTextareaValue(e.target.value);
                }}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: '#094561',
                            flex: 'auto',
                        }}
                    >
                        <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={() => {
                                setBold(!bold);
                                setFontWeight(bold ? 'bold' : 'initial');
                            }}
                        >
                            <FormatBold style={{opacity: '75%'}}/>
                        </IconButton>
                        <IconButton
                            variant={italic ? 'soft' : 'plain'}
                            color={italic ? 'primary' : 'neutral'}
                            aria-pressed={italic}
                            onClick={() => setItalic((bool) => !bool)}
                        >
                            <FormatItalic style={{opacity: '75%'}}/>
                        </IconButton>
                        <Button className="TextareaButton" sx={{ml: 'auto'}}
                                onClick={props.action}
                        >{props.textareaButtonText}</Button>
                    </Box>
                }
                sx={{
                    minWidth: 300,
                    fontWeight,
                    fontStyle: italic ? 'italic' : 'initial',
                }}/>
        </FormControl>
    );
}
