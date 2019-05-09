import React, { Component } from 'react';
import { toast } from 'react-toastify';
import validate from '../../helpers/validator';
import Input from './Input';
import Button from './Button';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  handelClick = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const error = validate(data, this.schema);
    if (error) return toast.error(error);
    return this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { data } = this.state;
    const account = { ...data };
    account[input.id] = input.value;
    this.setState({ data: account });
  };

  renderButton = (label, className) => (
    <Button onClick={this.handelClick} className={className} value={label} />
  )

  renderInput = (id, label, placeholder, type = 'text') => {
    const { data } = this.state;
    return (
      <Input
        value={data[id]}
        onChange={this.handleChange}
        type={type}
        id={id}
        label={label}
        placeholder={placeholder}
      />
    );
  }

  render() {
    return null;
  }
}

export default Form;
