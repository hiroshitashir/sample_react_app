import Form from 'react-bootstrap/Form';

import UndoLabel from "./UndoLabel";

const CheckboxRadioForm = (props) => {
  const checkboxProps = {
    ...props
  };
  delete checkboxProps.onUndo;
  delete checkboxProps.valueOrig;
  delete checkboxProps.selectedOptions;

	return (
    <Form.Group className="mb-5">
      
      <Form.Label>{props.title}</Form.Label>

      {props.type === "checkbox" ?
        <div key="inline-checkbox">
          {/* TODO:
          - Find a way to pass 'idx' correctly in Form.Check react/bootstrap. Bootstrap converts Form.Check to a plain <input> tag, which is missing 'value' field.
          */}
          {props.options.map(({label, value}, idx) => (
            <Form.Check inline label={label} id={`${props.name}-${idx}`} name={props.name} key={idx} type={props.type} onChange={props.onChange} value={value} checked={props.selectedOptions[idx]} {...checkboxProps}
            />
          ))}
        </div>
      :
        <div key="inline-radio">
          {/* TODO:
          - Find a way to pass 'value' correctly in Form.Check react/bootstrap. Bootstrap converts Form.Check to a plain <input> tag, which is missing 'value' field.
          */}
          {props.options.map(({label, value}, idx) => (
            <Form.Check inline label={label} id={`${props.name}-${value}`} name={props.name} key={idx} type={props.type} onChange={props.onChange} value={value} checked={props.value === value} {...checkboxProps}
            />
          ))}
        </div>
      }

      <UndoLabel {...props} />
    </Form.Group>
  )
}

export default CheckboxRadioForm;