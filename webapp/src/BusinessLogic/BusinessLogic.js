import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import InputForm from '../components/InputForm';
import CheckboxRadioForm from '../components/CheckboxRadioForm';

import BusinessLogicService from '../services/BusinessLogicService';

const toppingOptions = [{
  label: 'Pepperoni',
  value: 'pepperoni'
},{
  label: 'Ham',
  value: 'ham'
},{
  label: 'Pineapple',
  value: 'pineapple'
},{
  label: 'Olives',
  value: 'olives'
},{
  label: 'Peppers',
  value: 'peppers'
}];

const pizzaSizeOptions = [{
  label: 'S',
  value: 'S'
},{
  label: 'M',
  value: 'M'
},{
  label: 'L',
  value: 'L'
},{
  label: 'XL',
  value: 'XL'
}];

const deliveryOptions = [{
  label: 'Do delivery',
  value: 'true'
}, {
  label: 'Just takeout',
  value: 'false'
}];

const yesOrNoOptions = [{
  label: 'Yes',
  value: 'true'
}, {
  label: 'No',
  value: 'false'
}];

const id = 1; // Replace id with user or account ID when login is implemented

const defaultData = {
  id: 0,
  storeName: '',
  toppings: new Array(toppingOptions.length).fill(false),
  pizzaSizes: new Array(pizzaSizeOptions.length).fill(false),
  flagDelivery: '',
  flagDeliveryMinimumFee: '',
  deliveryMinimumFee: '',
  waitTimeMinutesDelivery: '',
  waitTimeMinutesTakeout: '',
};

// TODO 
// Move to a common library
const checkboxFormToAPIData = (flagList, options) => {
  if (!Array.isArray(flagList) || !Array.isArray(options)) {
    return [];
  }

  const values = flagList.map((flag, idx) => {
    if (flag) {
      const option = options[idx];
      return option.value || option;
    }
    return null;
  });
  return values.filter((l) => l != null);
};

const checkboxAPIToFormData = (valueList, options) => {
  if (!Array.isArray(valueList) || !Array.isArray(options)) {
    return [];
  }

  const formData = options.map((option, idx) => {
    if (valueList.indexOf(option.value) !== -1) {
      return true;
    }
    return false;
  });
  return formData;
};

const toBoolean = (data) => {
  if (data === '') {
    return '';
  }
  return data === 'true';
}

const toString = (data) => {
  if (data === '') {
    return '';
  }
  return `${data}`;
}

const formToAPIData = (formData) => {
  let apiData = {...formData};

  apiData['toppings'] = checkboxFormToAPIData(formData['toppings'], toppingOptions);
  apiData['pizzaSizes'] = checkboxFormToAPIData(formData['pizzaSizes'], pizzaSizeOptions);
  apiData['flagDelivery'] = toBoolean(formData['flagDelivery']);
  apiData['flagDeliveryMinimumFee'] = toBoolean(formData['flagDeliveryMinimumFee']);
  return apiData;
};

const apiToFormData = (apiData) => {
  let formData = {...apiData};

  formData['toppings'] = checkboxAPIToFormData(apiData['toppings'], toppingOptions);
  formData['pizzaSizes'] = checkboxAPIToFormData(apiData['pizzaSizes'], pizzaSizeOptions);
  formData['flagDelivery'] = toString(apiData['flagDelivery']);
  formData['flagDeliveryMinimumFee'] = toString(apiData['flagDeliveryMinimumFee']);
  return formData;
};

function BusinessLogic(props) {
  const [data, setData] = useState(defaultData);
  const dataOrig = useRef(defaultData);

  useEffect(() => {
    const initializeData = async () => {
      const apiData = await BusinessLogicService.get(data.id || id);
      const formData = apiData ? apiToFormData(apiData) : defaultData;
      setData(formData);
      dataOrig.current = {...formData};
    };
    initializeData();
  }, [data.id]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiData = formToAPIData(data);    
  
      if (data.id) {
        await BusinessLogicService.update(apiData);
      } else {
        await BusinessLogicService.create(apiData);
      }
  
      // TODO
      // Update status or redirect to read form
    } catch(err) {
      console.error('Error in handleFormSubmit', err);
      // TODO
      // Show error status in UI
    }
  };

  const getUpdatedValue = (type, name, id, checked, value, prevData) => {
    switch (type) {
      case 'checkbox':
        // get the last element after split
        const idx = Number(id.split('-').pop()); 
        value = prevData[name].map((item, pos) => {
          if (pos === idx) {
            return checked;
          }
          return item;
        });
        break;        
      case 'radio':
        // get the last element after split
        value = id.split('-').pop(); 
        break;
      default:
        break;
    }
    return value;
  };

  const handleChange = (e) => {
    // Store value in synthetic event to variables since synthetic events do not persist (setData method is asynchronous).
    // https://duncanleung.com/fixing-react-warning-synthetic-events-in-setstate/
    const target = e.target;
    const type = target.type;
    const name = target.name;
    const id = target.id;
    const checked = target.checked;
    const value = target.value;
    
    setData((prevData) => {
      const updatedValue = getUpdatedValue(type, name, id, checked, value, prevData);
      return {
        ...prevData,
        [name]: updatedValue
      };
    });
  };

  const handleUndo = (fieldName) => {
    setData((prevData) => {
      return {
        ...prevData,
        [fieldName]: dataOrig.current[fieldName]
      }
    });
  };

  return (
    <Form className="my-5" onSubmit={handleFormSubmit}>
      <InputForm type={'text'} name='storeName'  title="What's the name of your pizza place?" placeholder="type name" value={data['storeName']} valueOrig={dataOrig.current['storeName']} onChange={handleChange} onUndo={handleUndo} />

      <CheckboxRadioForm type="checkbox" name='toppings'  title="What kind of toppings do you have available today?" options={toppingOptions} selectedOptions={data['toppings']} valueOrig={dataOrig.current['toppings']} onChange={handleChange} onUndo={handleUndo}/> 

      <CheckboxRadioForm type="checkbox" name='pizzaSizes'  title="What size pizzas do you carry?" options={pizzaSizeOptions} selectedOptions={data['pizzaSizes']} valueOrig={dataOrig.current['pizzaSizes']} onChange={handleChange} onUndo={handleUndo}/> 

      <CheckboxRadioForm type="radio" name='flagDelivery'  title="Do you do delivery, or just takeout?" options={deliveryOptions} value={data['flagDelivery']} valueOrig={dataOrig.current['flagDelivery']} onChange={handleChange} onUndo={handleUndo}/> 

      <CheckboxRadioForm type="radio" name='flagDeliveryMinimumFee'  title="Do you have a minimum fee for delivery?" options={yesOrNoOptions} value={data['flagDeliveryMinimumFee']} valueOrig={dataOrig.current['flagDeliveryMinimumFee']} onChange={handleChange} onUndo={handleUndo}/> 

      {data['flagDeliveryMinimumFee'] === 'true' &&
        <InputForm type={'text'} name='deliveryMinimumFee'  title="What's the a minimum fee for delivery?" placeholder="type minimum fee" value={data['deliveryMinimumFee']} valueOrig={dataOrig.current['deliveryMinimumFee']} onChange={handleChange} onUndo={handleUndo} />
      }

      <InputForm type={'text'} name='waitTimeMinutesDelivery'  title="How long is the average waiting minutes for delivery now?" placeholder="type in minutes" value={data['waitTimeMinutesDelivery']} valueOrig={dataOrig.current['waitTimeMinutesDelivery']} onChange={handleChange} onUndo={handleUndo} />

      <InputForm type={'text'} name='waitTimeMinutesTakeout'  title="How long is the average waiting minutes for takeout now?" placeholder="type in minutes" value={data['waitTimeMinutesTakeout']} valueOrig={dataOrig.current['waitTimeMinutesTakeout']} onChange={handleChange} onUndo={handleUndo} />

      {data['id'] ?
        <Button type="submit">Update</Button>
      : 
        <Button type="submit">Create</Button>
      }
    </Form>
  );
}

export default BusinessLogic;