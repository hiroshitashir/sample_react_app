import Form from 'react-bootstrap/Form';

import UndoLabel from "./UndoLabel";

const InputForm = (props) => {
  const inputProps = {
    ...props
  };
  delete inputProps.onUndo;
  delete inputProps.valueOrig;

	return (
    <Form.Group className="mb-5">
      
      <Form.Label>{props.title}</Form.Label>
      <Form.Control name={props.name} className='w-50 mx-auto' type={props.type} value={props.value} onChange={props.handleChange} placeholder={props.placeholder} {...inputProps}/>

      <UndoLabel {...props} />
    </Form.Group>
  )
}

export default InputForm;