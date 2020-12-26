
# react-phone-input-material-ui
**[react-phone-input-2](https://github.com/bl00mber/react-phone-input-2) for [Material UI v1+](https://material-ui.com)**

**react-phone-input-2: v2.13.7**

Highly customizable phone input component with the auto formatting.

### Original look:

![alt tag](https://media.giphy.com/media/l378A8qFNzgiuPUre/giphy.gif)

### With The Material UI's TextField:

![alt tag](https://i.imgur.com/go91R0F.png)

## Installation
```shell-script
npm install react-phone-input-material-ui --save

or

yarn install react-phone-input-material-ui
```

## Usage with Material UI

Mandatory props: `value` and `onChange` for controlling field; `component`, ideally `TextField`

```jsx
import React from 'react';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { TextField, withStyles } from '@material-ui/core';

const styles = theme => ({
  field: {
    margin: '10px 0',
  },
  countryList: {
    ...theme.typography.body1,
  },
});


function PhoneField(props) {
  const { value, defaultCountry, onChange, classes } = props;

  return (
    <React.Fragment>
      {/* Simple usage */}
      <ReactPhoneInput
        value={value}
        onChange={onChange} // passed function receives the phone value
        component={TextField}
      />

      {/* Configure more */}
      <ReactPhoneInput
        value={value}
        defaultCountry={defaultCountry || 'gb'}
        onChange={onChange}
        inputClass={classes.field}
        dropdownClass={classes.countryList}
        component={TextField}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(PhoneField);
```


**Forked from react-phone-input-2. All the features of react-phone-input-2() are available. I will be update this library frequently to upto date with origin library**

## Contributing
Code style changes not allowed

## License
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bl00mber/react-phone-input-2/blob/master/LICENSE)

Based on [react-phone-input](https://github.com/razagill/react-phone-input)

Make sure you donated for lib maintenance [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/bloomber/20)
