```jsx
import React from 'react';
import {ListItemControls, ListItemControlsButton, ListItemControlsButtonDropdown} from '@sber-business/triplex/components/List';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {KebabSrvxIcon20} from '@sberbusiness/icons/KebabSrvxIcon20';

const options = [
    {
        id: 'list-controls-dropdown-option-1',
        label: 'Текст пункта меню 1',
        onSelect: () => alert('Выбран пункт меню 1.'),
    },
    {
        id: 'list-controls-dropdown-option-2',
        label: 'Текст пункта меню 2',
        onSelect: () => alert('Выбран пункт меню 2.'),
    },
    {
        id: 'list-controls-dropdown-option-3',
        label: 'Текст пункта меню 3',
        onSelect: () => alert('Выбран пункт меню 3.'),
    },
];

<>
    <ListItemControls>
        <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
        <ListItemControlsButtonDropdown icon={<KebabSrvxIcon20 />} options={options}>Еще</ListItemControlsButtonDropdown>
    </ListItemControls>

    <br />

    <ListItemControls style={{height: '100px'}}>
        <ListItemControlsButton icon={<DownloadSrvIcon20 />}>Скачать</ListItemControlsButton>
        <ListItemControlsButtonDropdown icon={<KebabSrvxIcon20 />} options={options}>Длинная подпись</ListItemControlsButtonDropdown>
    </ListItemControls>

    <br />

    <ListItemControls>
        <ListItemControlsButton icon={<DownloadSrvIcon20 />} />
        <ListItemControlsButtonDropdown icon={<KebabSrvxIcon20 />} options={options} />
    </ListItemControls>

    <br />

    <ListItemControls>
        <ListItemControlsButton>Кнопка</ListItemControlsButton>
        <ListItemControlsButtonDropdown options={options}>Дропдаун</ListItemControlsButtonDropdown>
    </ListItemControls>
</>
```
