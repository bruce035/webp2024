import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'; // 新增的導入
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

function MyDatepickers() {
  const formatDate = (date) => {
    // Convert Gregorian date to Republic of China (Taiwan) date format
    const taiwanYear = date.getFullYear() - 1911;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${taiwanYear}年${month}月${day}號`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
          <DatePicker
            TextFieldProps={{
              style: { width: '200px' } // Adjust the width as needed
            }}
            renderInput={(params) => <TextField {...params} variant="standard" />} // 新增的部分
            renderDay={(day, _value, _DayComponentProps) => formatDate(day)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default MyDatepickers;
