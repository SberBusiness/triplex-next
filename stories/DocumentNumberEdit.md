```jsx {"props": {"className": "light-background"}}
import React, {useState} from 'react';
import {DocumentNumberEdit} from '@sber-business/triplex/components/DocumentNumberEdit/DocumentNumberEdit';

const [value, setValue] = useState('');

const handleChange = (event) => setValue(event.target.value);

<DocumentNumberEdit
    value={value}
    buttonLabel="Изменить"
    emptyNumberButtonLabel="Задать номер"
    emptyNumberLabel="Номер документа будет присвоен автоматически"
    numberLabel="Документ №"
    onChange={handleChange} 
/>
```
