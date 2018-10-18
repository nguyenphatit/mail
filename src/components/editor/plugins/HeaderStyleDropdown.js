import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

class HeaderStyleDropdown extends React.Component {
    onToggle = event => {
        let value = event.target.value;
        this.props.onToggle(value);
    };

    render() {
        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor="heading">Heading</InputLabel>
                    <Select
                        value={this.props.active}
                        onChange={this.onToggle}
                        inputProps={{
                            name: 'Heading',
                            id: 'heading',
                        }}
                    >
                        {this.props.headerOptions.map(heading => {
                            return <MenuItem key={heading.id} value={heading.style}>{heading.label}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default HeaderStyleDropdown;
