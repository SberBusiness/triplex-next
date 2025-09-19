```jsx
import React from 'react';
import {List, ListItem} from '@sber-business/triplex/components/List';

<List>
    <ListItem>Элемент списка</ListItem>
    <ListItem>Элемент списка</ListItem>
    <ListItem>Элемент списка</ListItem>
</List>
```

### Loading state

Используется при обновлении текущего списка новыми данными, например, после применения фильтра.

```jsx
import React from 'react';
import {List, ListItem} from '@sber-business/triplex/components/List';

<List loading>
    <ListItem>Элемент списка</ListItem>
    <ListItem>Элемент списка</ListItem>
    <ListItem>Элемент списка</ListItem>
</List>
```


### Not found state

Используется при применении фильтров, когда не найден ни один элемент.

```jsx
import React from 'react';
import {NotfoundSrvIcon64} from '@sberbusiness/icons/NotfoundSrvIcon64';
import {Gap} from '@sber-business/triplex/components/Gap/Gap';
import {ListEmptyState} from '@sber-business/triplex/components/List';
import {Text} from '@sber-business/triplex/components/Typography/Text';
import {Button} from '@sber-business/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sber-business/triplex/components/Button/enums';
import {ETextSize, ELineType} from '@sber-business/triplex/components/Typography/enums';

<ListEmptyState>
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <NotfoundSrvIcon64 />
    </div>
    
    <Text size={ETextSize.B1} line={ELineType.EXTRA}>
        Ничего не найдено.<br />
        Попробуйте выбрать другие фильтры.
    </Text>
    
    <Gap size={24} />
    
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>Сбросить фильтры</Button>
</ListEmptyState>
```
### Empty state

Используется, когда еще нет данных для отображения хотя бы одного элемента списка.

```jsx
import React from 'react';
import {EmptytableSrvIcon64} from '@sberbusiness/icons/EmptytableSrvIcon64';
import {Gap} from '@sber-business/triplex/components/Gap/Gap';
import {ListEmptyState} from '@sber-business/triplex/components/List';
import {Text} from '@sber-business/triplex/components/Typography/Text';
import {Button} from '@sber-business/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sber-business/triplex/components/Button/enums';
import {ETextSize, ELineType} from '@sber-business/triplex/components/Typography/enums';

<ListEmptyState>
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <EmptytableSrvIcon64 />
    </div>
    
    <Text size={ETextSize.B1} line={ELineType.EXTRA}>
        Нет данных, но можно предложить какие-то действия для заполнения таблицы.
    </Text>
    
    <Gap size={24} />
    
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>Button Name</Button>
    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>Button Name</Button>
</ListEmptyState>
```

### Virtualized

```jsx
import React, {useMemo} from 'react';
import {FixedSizeList} from 'react-window';
import {List, ListItem} from '@sber-business/triplex/components/List';

const itemData = useMemo(() => Array.from({length: 100}).map((_, index) => `List item ${index}`), []);

<FixedSizeList
    itemData={itemData}
    itemCount={100}
    itemSize={20}
    width="100%"
    height={200}
    innerElementType={List}
>
    {({data, index, style}) => <ListItem style={style}>{data[index]}</ListItem>}
</FixedSizeList>
```

### Sortable

```jsx
import React, {useState} from 'react';
import {ListSortable, ListSortableItem} from '@sber-business/triplex/components/List';

const [items, setItems] = useState(
    Array.from({length: 10}, (_, index) => ({id: `list-sortable-item-0-${index}`, index}))
);

<ListSortable items={items} onItemsChange={setItems}>
    {items.map(({id, index}) => (
        <ListSortableItem key={id} id={id}>
            {({listeners, dragging, setActivatorNodeRef}) => (
                <ListSortableItem.Target {...listeners} dragging={dragging} ref={setActivatorNodeRef}>
                    List item {index}
                </ListSortableItem.Target>
            )}
        </ListSortableItem>
    ))}
</ListSortable>
```

### Sortable + interactive elements

```jsx
import React, {useState} from 'react';
import {ListSortable, ListSortableItem, ListSortableItemControls} from '@sber-business/triplex/components/List';
import {Checkbox} from '@sber-business/triplex/components/Checkbox/Checkbox';

const [items, setItems] = useState(
    Array.from({length: 10}, (_, index) => ({id: `list-sortable-item-1-${index}`, index}))
);

<ListSortable items={items} onItemsChange={setItems}>
    {items.map(({id, index}) => (
        <ListSortableItem key={id} id={id}>
            {({listeners, dragging, setActivatorNodeRef}) => (
                <ListSortableItem.Target {...listeners} dragging={dragging} ref={setActivatorNodeRef}>
                    <ListSortableItemControls>
                        <Checkbox>List item {index}</Checkbox>
                    </ListSortableItemControls>
                </ListSortableItem.Target>
            )}
        </ListSortableItem>
    ))}
</ListSortable>
```