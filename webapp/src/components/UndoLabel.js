import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


// TODO: Move to a common library
const checkboxFormToAPIData = (values, options) => {
  const labels = values.map((eachVal, idx) => {
    if (eachVal) {
      const option = options[idx];
      return option.label || option;
    }
    return null;
  });
  return labels.filter((l) => l != null);
};

const selectedRadioLabel = (value, options) => {
  const option = options.find((eachOption) => eachOption.value === value);
  return option ? option.label : '';
}

const UndoLabel = (props) => {

  let value = props.value;
  let valueOrig = props.valueOrig;
  switch (props.type) {
    case 'checkbox':
      if (props.selectedOptions) {
        value = props.selectedOptions;
      }

      let labels = checkboxFormToAPIData(value, props.options);
      value = labels.join(', ');

      let labelsOrig = checkboxFormToAPIData(valueOrig, props.options);
      valueOrig = labelsOrig.join(', ');
      break;
    case 'radio':
      value = selectedRadioLabel(value, props.options);

      valueOrig = selectedRadioLabel(valueOrig, props.options);
      break;
    default:
      break;
  }

  return (
    <div>
      {value !== valueOrig &&
        <Form.Text className="text-muted">
          '{valueOrig}' changed to '{value}'&ensp;
        
          <Button variant="primary" onClick={(e) => props.onUndo(props.name)} >Undo</Button>
        </Form.Text>
      }
    </div>
  );
}

export default UndoLabel;